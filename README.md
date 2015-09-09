# installcat
Bundle npm dependencies on install, for easy HTML includes.

![Installed Cat](http://www.magic4walls.com/wp-content/uploads/2014/03/cat-box-ben-torode-cute-lovely-kitten-animal-floor-wallpaper-.jpg)

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

See `example/` for an example configuration.

