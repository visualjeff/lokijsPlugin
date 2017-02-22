
## About lokijsPlugin

A hapi plugin to facilitate the initialization of lokijs within your application.

See the example for details on accessing the database within routes.

## Usage

```js
'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.register([{
    register: require('lokijsPlugin'),
    options: {
        env: 'NODEJS' 
    }
}, {
    register: require('./routes/applicationRoutes') //Load routes
}], (err) => {
    if (err) {
        throw err;
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.dir(`Server running at:  ${server.info.uri}`, {
        colors: true
    });
});
```
