'use strict';

const Hapi = require('hapi');

// create new server instance
const server = new Hapi.Server();

// add server’s connection information
server.connection({
    host: 'localhost',
    port: 3000
});

server.register([{
    register: require('../'),
}, {
    register: require('./routes/applicationRoutes')
}], (err) => {
    if (err) {
        throw err;
    }
});

// start your server
server.start(function(err) {
    if (err) {
        throw err;
    }

    console.dir('Server running at: ' + server.info.uri, {
        colors: true
    });
});
