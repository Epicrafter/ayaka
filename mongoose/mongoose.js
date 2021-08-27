const mongoose = require("mongoose");
let { link } = require('../tokens.json');

module.exports = {
    init: () => {

        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
            
        };

        mongoose.connect(link, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            
            console.log('[MONGOOSE] - connected');

        });

        mongoose.connection.on('err', err => {

            console.error(`[MONGOOSE] - connection error: \n${err.stack}`);

        })

        mongoose.connection.on('disconnected', () => {

            console.warn('[MONGOOSE] - connection lost')

        })

    }
}