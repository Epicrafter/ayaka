const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    guildID: String,
    userID: String,
    username: String,
    userTag: String,
    kickCount: Number,
    banCount: Number,
    warnCount: Number

});

module.exports = mongoose.model('User', userSchema);