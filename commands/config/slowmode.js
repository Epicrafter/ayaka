const ms = require('ms');

module.exports = {
    name: 'slowmode',
    description: 'set slowmode on a channel',
    category: 'config',
    usage: 'slowmode <duration|off> <channel_id>',
    permission: 'MANAGE_CHANNELS',
    run: async (client, message, args, embed) => {

        let duration = args[0];
        let mention = args[1];

        let regex = /\d/;
        let channel = message.guild.channels.cache.get(mention);

        if(duration == 'off') duration = '0';

        if(regex.test(duration) !== true || !duration) return message.error(client.lang('NO_VALID_DURATION'), { type: 'embed' } );
        if(!channel || channel.type === 'GUILD_VOICE') return message.error(client.lang('INVALID_CHANNEL'), { type: 'embed' } );

        let time = ms(duration) / 1000;

        if(!mention) {

            message.channel.setRateLimitPerUser(time);

        } else {

            channel.setRateLimitPerUser(time);

        }

        if(duration == 'off' || duration == '0s') {

            embed.setDescription(`${client.lang('SLOWMODE_DESACTIVATE', mention)}`)

        } else {

            embed.setDescription(`${client.success} ${client.lang('SLOWMODE_ACTIVATE', duration)}\n**${client.lang('CHANNEL')}**: <#${mention}>`)

        }

        embed.setTitle('Slowmode')
        embed.setTimestamp()
        message.channel.send({ embeds: [embed] });

    }
} 