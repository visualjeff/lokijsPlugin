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

exports.plugin = {
    pkg: require('../package.json'),
    register: (server, options) => {

        // Validate options agains the JOI scheam above
        const validateOptions = internals.schema.validate(options);
        if (validateOptions.error) {
            throw new Error(validateOptions.error);
        }

        // Start Loki database into the server.app object.
        const db = new Loki('loki.db', validateOptions.value);

        // Inject a reference of db into all requests
        const onRequest = function (request, h) {
            // $lab:coverage:off$
            request.app.db = db;
            return h.continue;
            // $lab:coverage:on$
        };

        server.ext('onRequest', onRequest);

        // Inject a reference of db into server.app.
        server.app.db = db;
    }
};
