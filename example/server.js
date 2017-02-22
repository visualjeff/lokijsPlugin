'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});

server.register([{
    register: require('../')
}, {
    register: require('./routes/applicationRoutes')
}], (err) => {

    if (err) {
        throw err;
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    console.dir('Server running at: ' + server.info.uri, {
        colors: true
    });
});
