const db = require('mongoose');

const logs = new db.Schema({

    logID: String,
    guildID: String,
    userID: String,
    logType: String,
    reason: String,
    date: String,

});

module.exports = db.model('Logs', logs);