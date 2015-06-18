# Flowsync.js [![npm version](https://img.shields.io/npm/v/flowsync.svg)](https://www.npmjs.com/package/flowsync) [![license type](https://img.shields.io/npm/l/flowsync.svg)](https://github.com/FreeAllMedia/flowsync.git/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dm/flowsync.svg)](https://www.npmjs.com/package/flowsync) ![ECMAScript 6](https://img.shields.io/badge/ECMAScript-6-red.svg)

An ES6 flow control component that works equally well on both server and client.

```javascript
import Flowsync from "flowsync";

const flowsync = new Flowsync;
flowsync.saySomething(); // will output "Something"
```

# Quality and Compatibility

[![Build Status](https://travis-ci.org/FreeAllMedia/flowsync.png?branch=master)](https://travis-ci.org/FreeAllMedia/flowsync) [![Test Coverage](https://codeclimate.com/repos/5582170a695680742a009284/badges/2774ba459c4f960769d9/coverage.svg)](https://codeclimate.com/repos/5582170a695680742a009284/coverage) [![Code Climate](https://codeclimate.com/repos/5582170a695680742a009284/badges/2774ba459c4f960769d9/gpa.svg)](https://codeclimate.com/repos/5582170a695680742a009284/feed) [![Dependency Status](https://david-dm.org/FreeAllMedia/flowsync.png?theme=shields.io)](https://david-dm.org/FreeAllMedia/flowsync?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/FreeAllMedia/flowsync/dev-status.svg)](https://david-dm.org/FreeAllMedia/flowsync?theme=shields.io#info=devDependencies)

*Every single build and release is automatically tested on the following platforms:*

![node 0.12.x](https://img.shields.io/badge/node-0.12.x-brightgreen.svg) ![node 0.11.x](https://img.shields.io/badge/node-0.11.x-brightgreen.svg) ![node 0.10.x](https://img.shields.io/badge/node-0.10.x-red.svg) 
![iojs 2.x.x](https://img.shields.io/badge/iojs-2.x.x-brightgreen.svg) ![iojs 1.x.x](https://img.shields.io/badge/iojs-1.x.x-brightgreen.svg)


[![Sauce Test Status](https://saucelabs.com/browser-matrix/flowsync.svg)](https://saucelabs.com/u/flowsync)


*If your platform is not listed above, you can test your local environment for compatibility by copying and pasting the following commands into your terminal:*

```
npm install flowsync
cd node_modules/flowsync
gulp test-local
```

# Installation

Copy and paste the following command into your terminal to install Flowsync:

```
npm install flowsync --save
```

## Import / Require

```
// ES6
import flowsync from "flowsync";
```

```
// ES5
var flowsync = require("flowsync");
```

```
// Require.js
define(["require"] , function (require) {
    var flowsync = require("flowsync");
});
```

# Getting Started



# How to Contribute

See something that could use improvement? Have a great feature idea? We listen!

You can submit your ideas through our [issues system](https://github.com/FreeAllMedia/flowsync/issues), or make the modifications yourself and submit them to us in the form of a [GitHub pull request](https://help.github.com/articles/using-pull-requests/).

We always aim to be friendly and helpful.

## Running Tests

It's easy to run the test suite locally, and *highly recommended* if you're using Flowsync.js on a platform we aren't automatically testing for.

```
npm test
```

### SauceLabs Credentials

We've setup our tests to automatically detect whether or not you have our saucelabs credentials installed in your environment (`process.env.SAUCE_USERNAME`).

If our saucelabs credentials are not installed, the tests are setup to automatically detect all browsers you have installed on your local system, then use them to run the tests.

#### Obtaining Our SauceLabs Credentials

If you'd like to develop Flowsync.js using SauceLabs, you need only create a new entry in our [issue tracker](https://github.com/FreeAllMedia/flowsync/issues) asking for our SauceLabs credentials.

We'll send over all credentials specific to this project so that you can perform comprehensive cross-platform tests.


## Public Shared Floobits Workspace

Whenever we're working on Flowsync.js, we connect to a public workspace on FlooBits that lets you see and interact with the developers. Feel free to stop by, say hello, and offer suggestions!

https://floobits.com/FreeAllMedia/flowsync
