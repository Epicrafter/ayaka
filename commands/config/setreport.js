const Guild = require('../../models/guild');
const missingArgument = require('../../assets/embeds/missingArgument');

module.exports = {
    name: 'setreport',
    description: 'set the report channel',
    category: 'config',
    usage: 'setreport <channel_id>',
    permission: 'MANAGE_SERVER',
    run: async (client, message, args, embed) => {

        let cmd = client.commands.get('setreport');

        let mention = args[0];
        let channel = message.guild.channels.cache.get(mention);

        if(!mention) return missingArgument(message, client.lang('SET_REPORT_MISSING'), cmd.usage);
        if(!channel || channel.type === 'GUILD_VOICE') return message.error(client.lang('INVALID_CHANNEL'), { type: 'embed' });

        Guild.findOne({

            guildID: message.guild.id

        }, (err, guild) => {

            if(err) return console.error;

            guild.updateOne({

                reportChannel: mention

            })
            .then(result => console.log(result))
            .catch(err => console.error(err))

        });

        embed.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', dyanmic: true, size: 1024 }))
        embed.setDescription(client.lang('REPORT_CHANNEL', mention))

        message.channel.send({ embeds: [embed] });

    }
}