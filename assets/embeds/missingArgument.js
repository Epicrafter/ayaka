const { MessageEmbed } = require('discord.js');
const { italic, quote } = require('@discordjs/builders'); 

module.exports = function missingArgument(message, messageContent, usage) {

    let embed = new MessageEmbed()
    .setColor('#a29bfe')
    .setTitle('Missing Argument')
    .setDescription(`${messageContent}\n\nUsage: \`\`${usage}\`\``)

    message.channel.send({ embeds: [embed] });

}