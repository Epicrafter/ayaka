const { MessageEmbed } = require('discord.js');

const User = require('../../models/user');
const Guild = require('../../models/guild');

const checkUser = require('../../mongoose/checkUser');
const updateBan = require('../../mongoose/user/updateBan');

const missingArgument = require('../../assets/embeds/missingArgument');

const newLogs = require('../../mongoose/sanctions/newLogs');

const id = require('uniqid');   
const moment = require('moment');
 
module.exports = {
    name: "ban",
    description: "ban a user from the server",
    category: "moderation",
    usage: 'ban <@member> <reason>',
    permission: 'BAN_MEMBERS',
    run: async(client, message, args, sanctionEmbed) => {

        let cmd = client.commands.get('ban');

        let member = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if(!member) return missingArgument(message, client.lang('NO_MENTION_TYPE', client.lang('BAN')), cmd.usage);
        if(!reason) return missingArgument(message, client.lang('NO_REASON'), cmd.usage);

        let guildID = message.guild.id;
        let userID = member.id;
        let username = member.user.username;
        let userTag = member.user.tag;

        if(userID === message.author.id) return message.error(client.lang('CANT_BAN_YOURSELF'), { type: 'embed' } );

        await checkUser(guildID, userID, username, userTag);

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

        let uid = id();
        let date = moment(new Date());
        
        newLogs({
            id: uid,
            guildId: message.guild.id, 
            userId: member.id, 
            logType: 'Ban',
            reason: reason, 
            date: date
        });

        sanctionEmbed.setTitle('Sanction')
        sanctionEmbed.setDescription(`${client.lang('BANNED_DM', message.guild.name)}\n${client.lang('REASON', reason)}\n${client.lang('BAN_COUNT', `${userInfo.banCount + 1}`)}\n${client.lang('BANNED_BY', message.author.tag)}`)
        sanctionEmbed.setTimestamp()
        
        try {

            member.send({ embeds: [sanctionEmbed]}).catch(() => console.log("Can't send message to user"))
            member.ban({ reason: reason });

        } catch(err) {

            console.log(err);
            return message.error('An error occured while trying to ban this user', { type: 'embed' });

        }

        await updateBan(guildID, userID);

        const banEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle('Sanction')
        .setTimestamp()
        .setDescription(`${client.lang('BANNED', member.user.tag)}\n**ID**: ${member.id}\n${client.lang('REASON', reason)}\n${client.lang('BANNED_BY', message.author.tag)}\n${client.lang('BAN_COUNT', `${userInfo.banCount + 1}`)}\n**Sanction ID**: ${uid}`)

        message.guild.channels.cache.get(channel.sanctionsChannel).send({ embeds: [banEmbed] });

    }
}   