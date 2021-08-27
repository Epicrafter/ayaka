const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({

    guildID: String,
    guildName: String,
    prefix: String,
    sanctionsChannel: String,
    reportChannel: String,
    greetings: String,
    welcomeChannel: String,
    welcomeMessage: String,
    goodbyeChannel: String,
    goodbyeMessage: String,

});

module.exports = mongoose.model('Guild', guildSchema);