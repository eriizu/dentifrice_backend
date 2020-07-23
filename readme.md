# Backend

## Pre-requisites

- `yarn` https://yarnpkg.com/

## Installation

- clone this repository;
- run `yarn` to install dependancies;
- run `yarn build` to compile;
- run `yarn start` to run.

## Scripts

### Auto-index

By running `yarn auto-index` you will update all folder indexes where a `.auto-index` file is located.

### Template-dir

By running `yarn template-dir $dir_location $original_str $replace_with_str` you will replace all occurences of `$original_str` by `$replace_with_str` in the designated folder.

It will replace the content AND names of files.

## Implemention guides

The `procedures` directory contains guides on how to implement new components, data models, routes and middleware.
