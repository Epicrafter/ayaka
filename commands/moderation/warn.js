const { MessageEmbed } = require('discord.js');

const missingArgument = require('../../assets/embeds/missingArgument');
const checkUser = require('../../mongoose/checkUser');
const updateWarn = require('../../mongoose/user/updateWarn');

const User = require('../../models/user');
const Guild = require('../../models/guild');

module.exports = {
    name: 'warn',
    description: 'warn a user on the server',
    category: 'moderation',
    usage: 'warn <@member> <reason>',
    permission: 'MANAGE_MESSAGES',
    run: async (client, message, args, sanctionEmbed) => {

        message.delete().catch(() => console.log('cannot delete user\'s message'));

        let cmd = client.commands.get('warn');

        let member = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if(!member) return missingArgument(message, client.lang('NO_MENTION_TYPE', client.lang('WARN')), cmd.usage); 
        if(!reason) return missingArgument(message, client.lang('NO_REASON'), cmd.usage);

        checkUser(message.guild.id, member.id, member.user.username, member.user.tag); 
        updateWarn(message.guild.id, member.id);

        let userInfo = await User.findOne({

            guildID: message.guild.id,
            userID: member.id

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

        sanctionEmbed.setDescription(`${client.lang('WARNED_DM', message.guild.name)}\n${client.lang('REASON', reason)}\n${client.lang('WARN_COUNT', userInfo.warnCount)}\n${client.lang('WARNED_BY', message.author.tag)}`)
        sanctionEmbed.setTimestamp()
        
        member.send({ embeds: [sanctionEmbed ]}).catch(() => console.log("Can't send message to this user"));

        let embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle('Sanction')
        .setTimestamp()
        .setDescription(`${client.lang('WARNED', member.user.tag)}\n${client.lang('REASON', reason)}\n${client.lang('WARN_COUNT', userInfo.warnCount)}`)

        message.guild.channels.cache.get(channel.sanctionsChannel).send({ embeds: [embed] });

    }
}