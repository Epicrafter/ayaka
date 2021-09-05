const missingArgument = require('../../assets/embeds/missingArgument');

module.exports = {
    name: 'dm',
    description: 'private message a user using the bot',
    category: 'information',
    usage: 'dm <@member> <message>',
    permission: 'MANAGE_SERVER',
    run: async (client, message, args, embed) => {

        let cmd = client.commands.get('dm');
        let member = message.mentions.members.first();
        let toSend = args.slice(1).join(' ');

        if(!member) return missingArgument(message, client.lang('NO_MENTION'), cmd.usage);
        if(!toSend) return missingArgument(message, client.lang('NO_DM_MESSAGE'), cmd.usage);

        embed.setAuthor(client.lang('SENT_YOU_DM', message.author.tag), message.author.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 }))
        embed.setDescription(`**Message:** ${toSend}\n${client.lang('SENT_FROM', message.guild.name)}`)

        try {

            message.delete();
            member.send({ embeds: [embed] });
            message.success(client.lang('DM_SUCCESS'), { type: 'embed '})

        } catch(err) {

            console.log(err)
            message.error(client.lang('DM_ERROR'), { type: 'embed '})

        }

    }
}