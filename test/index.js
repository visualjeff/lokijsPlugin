'use strict';

const LokijsPlugin = require('../');

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('lokijsPlugin', () => {

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

    it('db is inject into request', (done) => {

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
});
