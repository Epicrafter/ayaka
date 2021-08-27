const missingArgument = require('../../assets/embeds/missingArgument');
const Guild = require('../../models/guild');

module.exports = {
    name: 'setmessage',
    description: 'set a custom message for whenever a member joins or leaves this guild',
    category: 'config',
    usage: 'setmessage <welcome|goodbye> <message>',
    note: '*<user>* will mention the member\n*<server>* will be replaced by the guild\'s name\n*<member_count>* will be replaced by the guild\'s member count\nDiscord Markdown (Chat formatting) is also supported',
    permission: 'MANAGE_SERVER',
    run: async (client, message, args) => {

        let cmd = client.commands.get('setmessage');
        let type = args[0];
        let cmessage = args.slice(1).join(' ');

        if(!type || type !== 'welcome' && type !== 'goodbye') return missingArgument(message, client.lang('NO_EVENT_TYPE'), cmd.usage);
        if(!cmessage) return missingArgument(message, client.lang('NO_CUSTOM_MESSAGE'), cmd.usage);

        await Guild.findOne({

            guildID: message.guild.id

        }, (err, guild) => {

            if(err) return console.error(err);

            if(type == 'welcome') {

                guild.updateOne({

                    welcomeMessage: cmessage

                })
                .then(result => console.log(result))
                .catch(err => console.error(err))

            } else {

                guild.updateOne({

                    goodbyeMessage: cmessage

                })
                .then(result => console.log(result))
                .catch(err => console.error(err))

            }

        })

        let final;
        type == 'welcome' ? final = client.lang('NEW_MEMBER', cmessage) : final = client.lang('BYE_MEMBER', cmessage);

        message.success(final, { type: 'embed' });

    }
}