const { MessageEmbed } = require('discord.js');

const User = require('../../models/user');
const Guild = require('../../models/guild');

const checkUser = require('../../mongoose/checkUser');
const updateKick = require('../../mongoose/user/updateKick');

const missingArgument = require('../../assets/embeds/missingArgument');
 
module.exports = {
    name: "kick",
    description: "kicks a user from the server",
    category: "moderation",
    usage: 'kick <@member> <reason>',
    permission: 'KICK_MEMBERS',
    run: async(client, message, args, sanctionEmbed) => {

        let cmd = client.commands.get('kick');

        let member = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if(!member) return missingArgument(message, client.lang('NO_MENTION_TYPE', client.lang('KICK')), cmd.usage);
        if(!reason) return missingArgument(message, client.lang('NO_REASON'), cmd.usage);

        let guildID = message.guild.id;
        let userID = member.id;
        let username = member.user.username;
        let userTag = member.user.tag;

        if(userID === message.author.id) return message.error(client.lang('CANT_KICK_YOURSELF'), { type: 'embed' } );

        await checkUser(guildID, userID, username, userTag);
        await updateKick(guildID, userID);

        let userInfo = await User.findOne({

            guildID: guildID, userID: userID

        }).catch(err => {

            console.log(err);
            message.channel.send(client.lang('ERROR_DATABASE_FETCH'));
            return;

        });

        let channel = await Guild.findOne({

            guildID: message.guild.id

        }).catch(err => {

            console.log(err);
            message.channel.send(client.lang('ERROR_DATABASE_FETCH'));
            return;

        });

        if(!channel.sanctionsChannel) return message.error(client.lang('NO_SANCTIONS_CHANNEL'), { type: 'embed' } );

        sanctionEmbed.setTitle('Sanction')
        sanctionEmbed.setDescription(`${client.lang('KICKED_DM', message.guild.name)}\n${client.lang('REASON', reason)}\n${client.lang('KICK_COUNT', userInfo.kickCount)}\n${client.lang('KICKED_BY', message.author.tag)}`)
        sanctionEmbed.setTimestamp()
        member.kick(reason);

        const kickEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle('Sanction')
        .setTimestamp()
        .setDescription(`${client.lang('KICKED', member.user.tag)}\n${client.lang('REASON', reason)}\n${client.lang('KICKED_BY', message.author.tag)}\n${client.lang('KICK_COUNT', userInfo.kickCount)}`)

        message.guild.channels.cache.get(channel.sanctionsChannel).send({ embeds: [kickEmbed] });
        member.send({ embeds: [sanctionEmbed]}).catch(() => console.log("Can't send message to user"))

    }
}  