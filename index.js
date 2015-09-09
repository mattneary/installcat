#!/usr/bin/env node
var fs = require('fs'),
    path = require('path'),
    R = require('ramda'),
    Q = require('Q');

var readFile = Q.denodeify(fs.readFile);
var writeFile = Q.denodeify(fs.writeFile);
var catFile = readFile('installcat.json', 'utf-8');

function buildBundle(name, spec) {
  var paths = R.map(
    R.partial(path.join, 'node_modules'),
    R.zipWith(
      path.join,
      R.keys(spec),
      R.values(spec)));
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
    console.error('Could not read installcat.json');
    process.exit(1);
  })
  .then(function (bundles) {
    return Q.all(R.map(
      R.apply(buildBundle),
      R.zip(R.keys(bundles), R.values(bundles))))
  })
  .catch(function (err) {
    console.error('Could not process dependencies', err.stack);
    process.exit(1);
  });

