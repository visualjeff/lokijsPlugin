'use strict';

const Hapi = require('@hapi/hapi');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});

const startup = async () => {

    await server.register([{
        plugin: require('../')
    }, {
        plugin: require('./routes/applicationRoutes')
    }]);
    await server.start();
};

startup().catch((err) => {

    throw err;
});

console.log(`${new Date()}: server running at ${server.info.uri}`);
