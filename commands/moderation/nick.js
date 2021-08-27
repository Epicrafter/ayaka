const missingArgument = require("../../assets/embeds/missingArgument");

module.exports = {
    name: 'nick',
    description: 'change the username of a member',
    category: 'moderation',
    usage: 'nick <@member> <new_name>',
    permission: 'MANAGE_NICKNAMES',
    run: async (client, message, args, embed) => {

        let cmd = client.commands.get('nick');

        let member = message.mentions.members.first();
        let nick = args[1];
        
        if(!member) return missingArgument(message, client.lang('NO_MENTION_TYPE', client.lang('RENAME')), cmd.usage);
        if(!nick) return missingArgument(message, client.lang('NO_NICK'),cmd.usage)

        member.setNickname(nick);
        embed.setAuthor(`${member.user.username} ${client.lang('RENAMED', nick)}`, member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 }));

        message.channel.send({ embeds: [embed] });

    }
}