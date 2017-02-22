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
            handler: function(request, reply) {
                let contacts = request.app.db.getCollection('contacts');
                let results = contacts.where(function(obj) {
                    return obj.firstLanguage === 'english';
                });
                let response = `The following speak english as a first Language: <br><ul>`;
                results.forEach(record => {
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
