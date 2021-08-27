const { MessageEmbed } = require('discord.js');
const User = require('../../models/user');

const missingArgument = require('../../assets/embeds/missingArgument');
  
const checkUser = require('../../mongoose/checkUser');

module.exports = {
    name: 'clearsanctions',
    description: 'reset the number of times a member has been kicked, banned or warned on the server',
    category: "moderation",
    usage: 'clearsanctions <@member> <kicks|bans|warns>',
    permission: 'MANAGE_MESSAGES',
    run: async(client, message, args, embed) => {
        
        let cmd = client.commands.get('clearsanctions');

        let member = message.mentions.members.first();
        let resetType = args[1]; 

        if(!member) 
            return missingArgument(message, client.lang('NO_MENTION'), cmd.usage);
        if(!resetType) 
            return missingArgument(message, client.lang('USER_RESET_TYPE'), cmd.usage);
        if(resetType !== 'kicks' && resetType !== 'bans' && resetType !== 'warns') 
            return missingArgument(message, client.lang('USER_RESET_TYPE'), cmd.usage);

        checkUser(message.guild.id, member.id, member.user.username, member.user.tag);

        await User.findOne({

            guildID: message.guild.id, 
            userID: member.id

        }, (err, user) => {

            if(err) console.error(err);

            if(resetType === 'kicks') {

                user.updateOne({

                    kickCount: 0

                })
                .then(result => console.log(result))
                .catch(err => console.error(err))

            }

            if(resetType === 'bans') {

                user.updateOne({

                    banCount: 0

                })
                .then(result => console.log(result))
                .catch(err => console.error(err))

            }

            if(resetType === 'warns') {

                user.updateOne({

                    warnCount: 0

                })
                .then(result => console.log(result))
                .catch(err => console.error(err))

            }

            let type;
            if(resetType === 'kicks') type = client.lang('USER_RESET', client.lang('TYPE_KICKS'))
            if(resetType === 'bans') type = client.lang('USER_RESET', client.lang('TYPE_BANS'))
            if(resetType === 'warns') type = client.lang('USER_RESET', client.lang('TYPE_WARNS'))

            embed.setAuthor(type, member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            message.channel.send({ embeds: [embed] });

        })

    }
}