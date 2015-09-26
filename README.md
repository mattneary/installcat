# installcat
Bundle npm dependencies on install, for easy HTML includes.

![Installed Cat](http://www.magic4walls.com/wp-content/uploads/2014/03/cat-box-ben-torode-cute-lovely-kitten-animal-floor-wallpaper-.jpg)

## usage
List each bundle to be build in a separate file `installcat.json` or inside `package.json`
under property `installcat`

```sh
$ ls js/
$ cat installcat.json
{
  "js/build.js": {
    "ramda": "dist/ramda.js",
    "foo": "node_modules/foo/index.js"
  }
}
$ cat package.json
{
  ...
  "devDependencies": {
    "installcat": "*"
  },
  "scripts": {
    "prepublish": "installcat"
  }
}
$ npm install
$ ls js/
build.js
```
File `build.js` has the concatenated `dist/ramda.js` and `node_modules/foo/index.js` contents.
Equivalent to

```json
{
  "devDependencies": {
    "installcat": "*"
  },
  "scripts": {
    "prepublish": "installcat"
  },
  "installcat": {
    "js/build.js": {
      "ramda": "dist/ramda.js",
      "foo": "node_modules/foo/index.js"
    }
  }
}
```
See `example/` for an example configuration.

### 3rd party modules used

- [debug](https://github.com/visionmedia/debug) - small debugging utility
- [q](https://github.com/kriskowal/q) - A library for promises (CommonJS/Promises/A,B,D)
- [ramda](https://www.github.com/ramda/ramda) - A practical functional library for JavaScript programmers.

