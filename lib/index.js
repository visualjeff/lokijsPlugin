'use strict';

const Loki = require('lokijs');
const Joi = require('joi');

// Declare internals
const internals = {};

// JOI Schema for validation
internals.schema = Joi.object().keys({
    env: Joi.string().default('NODEJS'),
    verbose: Joi.boolean().allow(true, false),
    autoload: Joi.boolean().allow(true, false).default(true),
    autoloadCallback: Joi.func(),
    autosave: Joi.boolean().allow(true, false).default(true),
    autosaveInterval: Joi.number().default(5000),
    adapter: Joi.object(),
    serializationMethod: Joi.string().allow('normal', 'pretty', 'destructured'),
    destructureDelimiter: Joi.string(),
    throttledSaves: Joi.boolean().allow(true, false)
});

const lokijsPlugin = {
    register: (server, options, next) => {

        // Validate options agains the JOI scheam above
        const validateOptions = internals.schema.validate(options);
        if (validateOptions.error) {
            return next(validateOptions.error);
        }

        // Start Loki database into the server.app object
        const db = new Loki('loki.db', validateOptions.value);

        // Inject a reference of db into all requests
        server.ext({
            type: 'onRequest',
            method: (request, reply) => {
                // $lab:coverage:off$
                request.app.db = db;
                return reply.continue();
                // $lab:coverage:on$
            }
        });

        // Inject a reference of db into server.app.
        server.app.db = db;

        next();
    }
};

lokijsPlugin.register.attributes = {
    pkg: require('../package.json')
};

module.exports = lokijsPlugin;
