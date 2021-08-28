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

        duration == 'off' || duration == '0s' ? 
            embed.setDescription(`${client.lang('SLOWMODE_DESACTIVATE', mention)}`) 
            : embed.setDescription(`${client.lang('SLOWMODE_ACTIVATE', duration)}\n**${client.lang('CHANNEL')}**: <#${mention}>`);

        if(duration == 'off') duration = '0';

        if(regex.test(duration) !== true || !duration) return message.error(client.lang('NO_VALID_DURATION'), { type: 'embed' } );
        if(mention) {
            let channel = message.guild.channels.cache.get(mention);
            if(!channel || channel.type === 'GUILD_VOICE') return message.error(client.lang('INVALID_CHANNEL'), { type: 'embed' } );
        }

        let time = ms(duration) / 1000;

        !mention ? message.channel.setRateLimitPerUser(time) : channel.setRateLimitPerUser(time);

        embed.setTitle('Slowmode')
        embed.setTimestamp()
        message.channel.send({ embeds: [embed] });

    }
} 