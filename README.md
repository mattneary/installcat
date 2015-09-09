# weave
Bundle your dependencies on install for easy HTML includes.

## usage

```sh
$ ls js/
$ cat weave.json
{
  "js/build.js": {
    "ramda": "dist/ramda.js"
  }
}
$ cat package.json
{
  ...
  "devDependencies": {
    "weave": "*"
  },
  "scripts": {
    "prepublish": "weave"
  }
}
$ npm install
$ ls js/
build.js
```

See `examples/` for an example configuration.

