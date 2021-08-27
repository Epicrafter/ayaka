const { Message, MessageEmbed } = require('discord.js');
const markdown = require('@discordjs/builders');

const config = require('../config.json');
const emojis = require('../assets/json/emojis.json');

let embed = new MessageEmbed()

Message.prototype.success = function(key, options = {}) {

    options.emoji = emojis.success;
    const data = `${options.emoji} ${markdown.bold(key)}`;

    embed.setColor('#43b581')
    embed.setDescription(data)

    return options.type == 'message' ? this.channel.send(data) : this.channel.send({ embeds: [embed] });

}

Message.prototype.error = function(key, options = {}) {

    options.emoji = emojis.error;
    const data = `${options.emoji} ${markdown.bold(key)}`;

    embed.setColor('#f04947')
    embed.setDescription(data)

    return options.type == 'message' ? this.channel.send(data) : this.channel.send({ embeds: [embed] });

}

