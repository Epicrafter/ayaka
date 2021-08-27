const missingArgument = require('../../assets/embeds/missingArgument');

const Guild = require('../../models/guild');
 
module.exports = {
    name: 'report',
    description: 'report a user on the server',
    category: 'moderation',
    usage: 'report <@member> <reason>',
    run: async (client, message, args, embed) => {

        let cmd = client.commands.get('report');

        let member = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        let channel = await Guild.findOne({
        
            guildID: message.guild.id

        }).catch(err => {

            console.log(err);
            message.channel.send(client.lang('ERROR_DATABASE_FETCH'));
            return;

        });

        if(!channel.reportChannel) return message.error(client.lang('NO_REPORT_CHANNEL'), { type: 'embed' } );

        let reportChannel = channel.reportChannel;

        if(!member) return missingArgument(message, client.lang('NO_MENTION_TYPE', client.lang('REPORT')), cmd.usage);
        if(!reason) return missingArgument(message, client.lang('NO_REASON'), cmd.usage);
        if(member.id == message.author.id) return message.error(client.lang('REPORT_YOU'), { type: 'embed' });

        embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 }))
        embed.setDescription(`${client.lang('REPORTED', member.id)}\n\n${client.lang('CHANNEL', message.channel.id)}\n${client.lang('REASON', reason)}`)
        embed.setTimestamp()

        message.guild.channels.cache.get(reportChannel).send({ embeds: [embed] });

    }
}