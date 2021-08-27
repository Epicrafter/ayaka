const missingArgument = require('../../assets/embeds/missingArgument');
const Guild = require('../../models/guild');

module.exports = {
    name: 'setgreetings',
    description: 'set the welcome or goodbye channel',
    category: 'config',
    usage: 'setgreetings <channel_id> <welcome|goodbye>',
    permission: 'MANAGE_CHANNELS',
    run: async (client, message, args) => {

        let cmd = client.commands.get('setgreetings');
        let mention = args[0];
        let type = args[1];
        
        let channel = message.guild.channels.cache.get(mention);

        if(!channel || channel.type === 'GUILD_VOICE') return missingArgument(message, client.lang('INVALID_CHANNEL'), cmd.usage);
        if(!type || type !== 'welcome' && type !== 'goodbye') return missingArgument(message, client.lang('NO_EVENT_TYPE'), cmd.usage)

        await Guild.findOne({

            guildID: message.guild.id

        }, (err, guild) => {

            if(err) return console.error(err);
                
            if(type == 'welcome') {

                guild.updateOne({
                    welcomeChannel: mention
                })
                .then(result => console.log(result))
                .catch(err => console.error(err))

            } else {

                guild.updateOne({
                    goodbyeChannel: mention
                })
                .then(result => console.log(result))
                .catch(err => console.error(err))

            }

        })

        let final;
        type == 'welcome' ? final = client.lang('NEW_MEMBERS_LOGS', mention) : final = client.lang('BYE_MEMBERS_LOGS', mention);

        message.success(final, { type: 'embed' });

    }
}