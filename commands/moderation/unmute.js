const { MessageEmbed } = require('discord.js');

const missingArgument = require('../../assets/embeds/missingArgument');

module.exports = {
    name: "unmute",
    description: 'unmute a member',
    category: "moderation",
    usage: 'unmute <@member>',
    permission: 'MANAGE_MESSAGES',
    run: async (client, message, args) => {

        let cmd = client.commands.get('unmute');

        let member = message.mentions.members.first();

        let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');

        if(!member) return missingArgument(message, client.lang('NO_MENTION_TYPE', client.lang('MUTE')), cmd.usage);
        if(!member.roles.cache.some(role => role.name === 'muted')) return message.error(client.lang('NOT_MUTED'), { type: 'embed' } );

        let user = member.id;

        let embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(client.lang('UNMUTED', user));

        message.channel.send({ embeds: [embed] });
        member.roles.remove(muteRole.id);

    }
}