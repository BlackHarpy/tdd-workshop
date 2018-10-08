# TDD Workshop

A simple Kanban board system for my Test Driven Development Workshop. Includes the webapp and tests to run.

## Requirements

Since this project uses some features from ES6/7 You need Node 8.12.0 LTS or above to be able to run the app.

## Run the project

To run check the interface or running the tests, first you must install required dependencies writing on the terminal:

`npm install`

The project uses [Concurrently](https://www.npmjs.com/package/concurrently) to avoid opening two terminals for the client and server. It's already configured on the start script:

`npm start`

But if you want to run the client and server separately run `npm run server` and `npm run client`.

To run the tests:

`npm test`

Use `npm run test:coverage` to check code coverage stats.
