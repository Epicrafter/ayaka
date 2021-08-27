const { MessageEmbed } = require('discord.js');
const User = require('../../models/user');

const missingArgument = require('../../assets/embeds/missingArgument');

const checkUser = require('../../mongoose/checkUser');

module.exports = {
    name: 'sanctions',
    description: 'check the number of times a member has been kicked, banned or warned on the server',
    category: "moderation",
    usage: 'check-user <@member> <kicks|bans|warns>',
    permission: 'MANAGE_MESSAGES',
    run: async(client, message, args, embed) => {

        let cmd = client.commands.get('sanctions');

        let member = message.mentions.members.first();
        let checkType = args[1];

        if(!member) 
            return missingArgument(message, client.lang('NO_MENTION'), cmd.usage);
        if(!checkType) 
            return missingArgument(message, client.lang('USER_CHECK_TYPE'), cmd.usage);
        if(checkType !== 'kicks' && checkType !== 'bans' && checkType !== 'warns') 
            return missingArgument(message, client.lang('USER_CHECK_TYPE'), cmd.usage);

        checkUser(message.guild.id, member.id, member.user.username, member.user.tag);

        let userInfo = await User.findOne({

            guildID: message.guild.id,
            userID: member.id

        }).catch(err => {

            console.log(err);
            message.channel.send(client.lang('ERROR_DATABASE_FETCH'));
            return;

        });

        let messageType;
        if(checkType === 'kicks') messageType = client.lang('CHECK_USER_MESSAGE_KICK', userInfo.kickCount)
        if(checkType === 'bans') messageType = client.lang('CHECK_USER_MESSAGE_BAN', userInfo.banCount)
        if(checkType === 'warns') messageType = client.lang('CHECK_USER_MESSAGE_WARNS', userInfo.warnCount)
 
        let finalMessage = `${member.user.tag
        } ${messageType}`;

        embed.setAuthor(finalMessage, member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 }))
        message.channel.send({ embeds: [embed] })
 
    }
} 