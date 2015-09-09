# installcat
Bundle your dependencies on install for easy HTML includes.

## usage

```sh
$ ls js/
$ cat installcat.json
{
  "js/build.js": {
    "ramda": "dist/ramda.js"
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

See `examples/` for an example configuration.

