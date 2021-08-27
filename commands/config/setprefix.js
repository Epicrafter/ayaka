const missingArgument = require('../../assets/embeds/missingArgument');
const Guild = require('../../models/guild');

module.exports = {
    name: 'setprefix',
    description: "change the client's prefix",
    category: 'config',
    usage: 'setprefix <prefix>',
    permission: 'MANAGE_SERVER',
    run: async (client, message, args, embed) => {

        let cmd = client.commands.get('setprefix');

        let prefix = args[0];
        if(!prefix) return missingArgument(message, client.lang('NO_PREFIX'), cmd.usage);

        await Guild.findOne({

            guildID: message.guild.id

        }, (err, guild) => {

            if(err) return message.channel.send(client.lang('ERROR_DATABASE_FETCH'));

            guild.updateOne({

                prefix: prefix

            })
            .then(result => console.log(result))
            .catch(err => console.error(err))

        })

        embed.setDescription(client.lang('NEW_PREFIX', prefix))
        message.channel.send({ embeds: [embed] });

    }
}