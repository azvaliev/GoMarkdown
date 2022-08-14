# Description

This project is to showcase the power of `WASM` and how it allows you to create
great apps that perform better than their JS counterparts

## Getting started

I'll show you how to get the dev server booted up and running,
build, and run the tests

### Requirements

- Node (v16+) or use your own static file server command
  - Keep in mind Node is required for running tests / using builtin `make dev` command
- Go (1.19+)
- make (if you want to use the builtin dev & build commands)

### Compiling the project

```bash
make build
```

Because `godom`, the way we interact with the DOM in go, uses `syscall/js`,
we need to make sure the build target is correct.

You can run `make build` which will ensure this,
or ensure the following variables are set.

- `GOOS` is `js`
- `GOARCH` is `wasm`

The output file should be `static/out.wasm`

### Developing

```bash
make dev
```

To easily spin up a dev server, you can use `make dev`
or start your own file server in the static folder.

🔑 **Make sure you run `make build` after adding changes to reflect them in the WASM**

I've gone ahead and setup a `.vscode/settings.json` so that you will have the
correct env variables for WASM

If you use an alternate editor, you will want to set the `GOOS` and `GOARCH`
environment variables like above to avoid errors about build constraints with `syscall/js`

### Testing - Cypress

I've integrated Cypress testing,
as this is a browser based app (Node required to run Cypress).

Seeing as this project wasn't using `npm` before,
I decided not to integrate a `package.json`, but rather use `npx`.

Failed tests will have screenshots in `/cypress/screenshots`,
and all tests output a video in `/cypress/videos`.

## Running all tests

```bash
make test
```

You can use `make test` to run the entire Cypress test suite (`cypress/e2e/*.cy.js`).
This will ensure the dev server is running with the latest code,
and output test results in console.

## Running individual test

```bash
make single-test TEST=TEST_NAME
```

To run an individual test suite,

- first get the name of the test from `cypress/e2e/TEST_NAME.cy.js`.
- When passing this in as an argument, omit the `.cy.js`.

Example:
The test file is `bold.cy.js`, so the test name is bold.

```bash
make single-test TEST=bold
```
