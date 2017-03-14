# arduinoday.ufpa.br

This is the source code for
[arduinoday.ufpa.br](http://arduinoday.ufpa.br), a static site built with
[Hugo](https://gohugo.io/) and post-processed with [Gulp](http://gulpjs.com/).

## Acknowledgements
- Thanks to https://christianmendoza.me who did this template.

## Quick start

### With docker

I'm using this docker image to do a rapid development without install hugo on
my machine.

To serve and autoreload on each modification:

```
docker run --rm -it -v $PWD:/src -p 1313:1313 -u hugo jguyomard/hugo-builder \
hugo server -w --bind=0.0.0.0
```

To build:

```
npm run build
```

This will generate a directory called `public` with your static website ready
to deploy.
