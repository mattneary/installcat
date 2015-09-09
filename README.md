# weave

## usage

```sh
$ cat weave.json
{
  "lodash": "index.js",
  "ramda": "dist/ramda.js"
}
$ cat package.json
{
  "dependencies": {
    "lodash": "*",
    "ramda": "*"
  },
  "scripts": {
    "prepublish": "weave lib/bundle.js"
  }
}
$ npm install
$ cat lib/bindle.js
/* lodash... */
/* ramda... */
```

