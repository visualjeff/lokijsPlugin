'use strict';

const routes = {
    register: (server, options, next) => {

        server.route({
            method: 'GET',
            path: '/',
            config: {
                auth: false, //Public access allowed
                description: 'Route is website root'
            },
            handler: function (request, reply) {

                const contacts = request.app.db.getCollection('contacts');
                const results = contacts.where((obj) => {

                    return obj.firstLanguage === 'english';
                });
                let response = 'The following speak english as a first Language: <br><ul>';
                results.forEach((record) => {

                    response = response + '<li>' + record.name + '<br>';
                });
                response = response + '</ul>';
                reply(response);
            }
        });
        next();
    }
};

routes.register.attributes = {
    name: 'applicationRoutes',
    version: '1.0.0'
};

module.exports = routes;
