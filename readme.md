# Backend

## Pre-requisites

- `yarn` https://yarnpkg.com/
- A `conf.env` file, that you should ask your team for.

## Installation

- clone this repository;
- run `yarn` to install dependancies;
- run `yarn build` to compile;
- run `export $(cat conf.env | xargs)` to load the configuration you've been given;
- run `yarn start` to run.

`TEST=1` tell the server not to look for a production database. It will create one in RAM instead.

## Scripts

### Auto-index

By running `yarn auto-index` you will update all folder indexes where a `.auto-index` file is located.

### Template-dir

By running `yarn template-dir $dir_location $original_str $replace_with_str` you will replace all occurences of `$original_str` by `$replace_with_str` in the designated folder.

It will replace the content AND names of files.

## Implemention guides

The `procedures` directory contains guides on how to implement new components, data models, routes and middleware.
