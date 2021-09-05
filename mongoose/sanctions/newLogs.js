const Logs = require('../../models/logs');

module.exports = function newLog(options = {}) {

    const log = new Logs({

        logID: options.id,
        guildID: options.guildId, 
        userID: options.userId, 
        logType: options.logType,
        reason: options.reason,
        date: options.date

    });

    log.save()
        .then(result => console.log(result))
        .catch(err => console.error(err));

};