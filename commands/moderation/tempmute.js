const { MessageEmbed } = require('discord.js');
const ms = require('ms');

const Guild = require('../../models/guild');

const missingArgument = require('../../assets/embeds/missingArgument');

module.exports = {
    name: "tempmute",
    description: 'temporarily mute a member',
    category: "moderation",
    usage: 'tempmute <@member> <duration> <reason>',
    permission: 'MANAGE_MESSAGES',
    run: async (client, message, args) => {

        message.delete().catch(() => console.log('cannot delete user\'s message'));

        let cmd = client.commands.get('tempmute');

        let member = message.mentions.members.first();
        let reason = args.slice(2).join(' ');
        let duration = args[1];

        let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');

        if(!member) return missingArgument(message, client.lang('NO_MENTION_TYPE', client.lang('MUTE')), cmd.usage);
        if(!reason) return missingArgument(message, client.lang('NO_REASON'), cmd.usage);
        if(!duration) return missingArgument(message, client.lang('MISSING_MUTE_DURATION'), cmd.usage);
        if(member.roles.cache.some(role => role.name === 'muted')) return message.error(client.lang('ALREADY_MUTED', member.user.username), { type: 'embed' });

        if(!muteRole) {

            muteRole = await message.guild.roles.create({

                name: "muted",
                color: "#a29bfe",
                reason: "mute role created"

            });

            message.guild.channels.cache.forEach(async(channel, id) => {

                await channel.permissionOverwrites.edit(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    CONNECT: false
                });

            });

        };

        let channel = await Guild.findOne({

            guildID: message.guild.id

        }).catch(err => {

            console.log(err);
            message.channel.send(client.lang('ERROR_DATABASE_FETCH'));
            return;

        });

        if(!channel.sanctionsChannel) return message.error(client.lang('NO_SANCTIONS_CHANNEL'), { type: 'embed' });

        await member.roles.add(muteRole.id);

        const mutedFor = (ms(ms(duration)));

        const embedChannel = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle('Sanction')
        .setTimestamp()
        .setDescription(`**${member.user.tag}** ${client.lang('MUTED')}\n${client.lang('REASON', reason)}\n**${client.lang('DURATION')}**: ${mutedFor}`)

        const embedPrivate = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle(client.lang('SANCTION'))
        .setDescription(`${client.lang('YOU_MUTED_IN', message.guild.name)} \n **${client.lang('DURATION')}**: ${mutedFor} \n ${client.lang('REASON', reason)}`)

        let embedUnmute = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(client.lang('UNMUTED', member.id));

        message.guild.channels.cache.get(channel.sanctionsChannel).send({ embeds: [embedChannel] });
        member.send({ embeds: [embedPrivate] }).catch(() => console.log("Can't send a message to this user"))

        setTimeout(() => {

            member.roles.remove(muteRole.id);
            message.channel.send({ embeds: [embedUnmute] });
    
        }, ms(duration));
 


    }
}