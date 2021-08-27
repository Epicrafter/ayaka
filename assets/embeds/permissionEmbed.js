const { MessageEmbed } = require('discord.js');

module.exports = function permissionEmbed(message, permission) {

    let embed = new MessageEmbed()
    .setColor('#ff7675')
    .addField(`Missing Permission`, `\`\`\`❯ ${permission}\`\`\``)

    message.channel.send({ embeds: [embed] });

}