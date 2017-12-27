'use strict';

exports.plugin = {
    name: 'myApplicationRoutes',
    version: '0.0.1',
    register: (server, options) => {

        server.route({
            method: 'GET',
            path: '/',
            config: {
                auth: false, //Public access allowed
                description: 'Route is website root',
                handler: (request, h) => {

                    const contacts = request.app.db.getCollection('contacts');
                    const results = contacts.where((obj) => {

                        return obj.firstLanguage === 'english';
                    });
                    let html = 'The following speak english as a first Language: <br><ul>';
                    results.forEach((record) => {

                        html += `<li>${record.name}<br>`;
                    });
                    html += '</ul>';
                    return h.response(html);
                }
            }
        });
    }
};
