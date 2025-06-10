# Overview
 A lightweight React / Vite based NPM package starter.

## Prerequisites
- React
- Node
- NPM
- Yalc

## Quick Start
- npm install
- npm start

## Development
- npm link
- switch to project
- npm link <package_name>

## Scripts
- We've included a couple of helpful scripts for faster development.
- deploy: `npm run deploy -- 'commit message'`
- publish: `npm run publish -- 'commit message' [major|minor|patch]`

## Husky
- Husky configuration is setup to lint and format the repo on every commit
- Edit the `.husky/pre-commit` file to change your settings

## Yalc
- When adding this library to another React project via `npm link` the two versions of react will clobber each other.
- To avoid this, you'll need to use `yalc` which creates a local package store as opposed to linking binaries.

## Author
- Eric Hubbell
- eric@erichubbell.com