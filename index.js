#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    R = require('ramda'),
    Q = require('q'),
    log = require('debug')('icat');

var exists = fs.existsSync;
var readFile = Q.denodeify(fs.readFile);
var writeFile = Q.denodeify(fs.writeFile);
var settingsFile = 'installcat.json';
var catFile = exists(settingsFile) ? readFile(settingsFile, 'utf-8') : readFile('package.json', 'utf-8');

function isJavaScriptFilename(filename) {
  return /\.js$/.test(filename);
}

function isRelative(filename) {
  return filename[0] === '.';
}

function relativeOrAbsolute(filename) {
  if (isRelative(filename)) {
    return filename;
  }
  return path.join('node_modules', filename)
}

function joinIfAbsolute(start, finish) {
  if (isRelative(finish)) {
    return finish;
  }
  return path.join(start, finish)
}

function buildBundle(name, spec) {
  var paths = R.map(
    relativeOrAbsolute,
    R.zipWith(
      joinIfAbsolute,
      R.keys(spec),
      R.values(spec)));
  console.log(paths);
  return Q.all(R.map(readFile, paths))
   .then(R.compose(R.reduce(R.concat, []), R.map(R.compose(R.concat(R.__, [new Buffer('\n;')]), R.of))))
   .then(Buffer.concat)
   .then(R.partial(writeFile, name))
   .then(R.tap(function () {
     console.log('Built ' + name);
   }));
}

catFile
  .then(function (data) {
    return JSON.parse(data + '');
  })
  .catch(function (err) {
    console.error('Could not read settings file', settingsFile);
    process.exit(1);
  })
  .then(function (json) {
    if (json.installcat) {
      log('json has installcat key, probably from package.json');
      return json.installcat;
    } else {
      return json;
    }
  })
  .then(function leaveJavaScriptBundles(bundles) {
    Object.keys(bundles).forEach(function (target) {
      if (!isJavaScriptFilename(target)) {
        delete bundles[target];
      }
    });
    return bundles;
  })
  .then(function (bundles) {
    log('found following bundles', bundles);
    return Q.all(R.map(
      R.apply(buildBundle),
      R.zip(R.keys(bundles), R.values(bundles))))
  })
  .catch(function (err) {
    console.error('Could not process dependencies', err.stack);
    process.exit(1);
  });

