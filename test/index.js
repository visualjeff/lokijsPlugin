'use strict';

const LokijsPlugin = require('../');

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('lokijs-plugin', () => {

    it('loads as a plugin', (done) => {

        const server = new Hapi.Server();
        server.connection();
        server.register([LokijsPlugin], (err) => {

            expect(err).to.not.exist();
            done();
        });
    });

    it('errors with invalid options', (done) => {

        const server = new Hapi.Server();
        server.connection();
        server.register([{
            register: LokijsPlugin,
            options: {
                verbose: 'invalid value'
            }
        }], (err) => {

            expect(err).to.exist();
            done();
        });
    });

    it('db is injected into request', (done) => {

        const server = new Hapi.Server();
        server.connection();
        server.register([LokijsPlugin], (err) => {

            expect(err).to.not.exist();
        });
        server.route([{
            method: 'GET',
            path: '/',
            handler: (request, reply) => {

                expect(request.app.db).to.exist();
            }
        }]);
        done();
    });

    it('db is injected into server.app', (done) => {

        const server = new Hapi.Server();
        server.connection();
        server.register([LokijsPlugin], (err) => {

            expect(err).to.not.exist();
        });
        expect(server.app.db).to.exist();
        done();
    });
});


it('a route works with data and fetches sample data', (done) => {

    const server = new Hapi.Server();
    server.connection();
    server.register([LokijsPlugin], (err) => {

        expect(err).to.not.exist();
    });

    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: false
        },
        handler: (request, reply) => {

            const contacts = request.app.db.addCollection('contacts');
            contacts.insert({
                name: 'dave',
                firstLanguage: 'english'
            });
            const record = contacts.get(1);
            reply(record.firstLanguage);
        }
    });

    const options = {
        method: 'GET',
        url: '/'
    };
    server.inject(options, (response) => {

        expect(response.statusCode).to.equal(200);
        expect(response.result).to.equal('english');
        done();
    });

});
