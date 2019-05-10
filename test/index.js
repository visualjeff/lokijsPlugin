'use strict';

const LokijsPlugin = require('../');

const Hapi = require('@hapi/hapi');
const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const lab = exports.lab = Lab.script();

const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('lokijs-plugin', () => {

    it('loads as a plugin', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: LokijsPlugin
            }]);
        };

        register().catch((err) => {

            expect(err).to.not.exist();
        });
    });

    it('errors with invalid options', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: LokijsPlugin,
                options: {
                    verbose: 'invalid value'
                }
            }]);
        };

        register().catch((err) => {

            expect(err).to.exist();
        });
    });

    it('db is injected into request', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: LokijsPlugin
            }]);
        };

        register().catch((err) => {

            expect(err).to.not.exist();
        });

        server.route([{
            method: 'GET',
            path: '/',
            handler: (request, h) => {

                expect(request.app.db).to.exist();
            }
        }]);
    });

    it('db is injected into server.app', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: LokijsPlugin
            }]);
        };

        register().catch((err) => {

            expect(err).to.not.exist();
        });
        expect(server.app.db).to.exist();
    });


    it('a route works with data and fetches sample data', () => {

        const server = new Hapi.Server();
        const register = async () => {

            await server.register([{
                plugin: LokijsPlugin
            }]);
        };

        register().catch((err) => {

            expect(err).to.not.exist();
        });

        server.route({
            method: 'GET',
            path: '/',
            config: {
                auth: false,
                handler: (request, h) => {

                    const contacts = request.app.db.addCollection('contacts');
                    contacts.insert({
                        name: 'dave',
                        firstLanguage: 'english'
                    });
                    const record = contacts.get(1);
                    return record.firstLanguage;
                }
            }
        });

        const options = {
            method: 'GET',
            url: '/'
        };
        server.inject(options, (response) => {

            expect(response.statusCode).to.equal(200);
            expect(response.result).to.equal('english');
        });
    });
});
