#!/usr/bin/env node
var fs = require('fs'),
    path = require('path'),
    R = require('ramda'),
    Q = require('Q');

var readFile = Q.denodeify(fs.readFile);
var writeFile = Q.denodeify(fs.writeFile);
var weaveFile = readFile('weave.json', 'utf-8');

function buildBundle(name, spec) {
  var paths = R.map(
    R.partial(path.join, 'node_modules'),
    R.zipWith(
      path.join,
      R.keys(spec),
      R.values(spec)));
  return Q.all(R.map(readFile, paths))
   .then(Buffer.concat)
   .then(R.partial(writeFile, name))
   .then(R.tap(function () {
     console.log('Built ' + name);
   }));
}

weaveFile
  .then(function (data) {
    return JSON.parse(data + '');
  })
  .catch(function (err) {
    console.error('Could not read weave.json');
    process.exit(1);
  })
  .then(function (bundles) {
    return Q.all(R.map(
      R.apply(buildBundle),
      R.zip(R.keys(bundles), R.values(bundles))))
  });

