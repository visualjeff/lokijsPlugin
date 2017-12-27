
## About lokijs-plugin

A hapi plugin to facilitate the initialization of lokijs within your application.  Version 2.0.0 of this plugin has been updated and tested specifically for working with version 17 of Hapi. 

[![Build Status](https://travis-ci.org/visualjeff/lokijsPlugin.png)](https://travis-ci.org/visualjeff/lokijsPlugin)
[![bitHound Overall Score](https://www.bithound.io/github/visualjeff/lokijsPlugin/badges/score.svg)](https://www.bithound.io/github/visualjeff/lokijsPlugin)
[![bitHound Dependencies](https://www.bithound.io/github/visualjeff/lokijsPlugin/badges/dependencies.svg)](https://www.bithound.io/github/visualjeff/lokijsPlugin/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/visualjeff/lokijsPlugin/badges/code.svg)](https://www.bithound.io/github/visualjeff/lokijsPlugin)

See the example directory for details on accessing the database within routes.

## Usage

```js
'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});

const startup = async () => {
    await server.register([{
        plugin: require('lokijs-plugin'),
        options: {
            env: 'NODEJS' 
        }
    }]);
    await server.start();
};

startup().catch((err) => {
    throw err;
});

console.log(`${new Date()}: server running at ${server.info.uri}`);
```
