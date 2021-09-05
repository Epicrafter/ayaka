const moment = require('moment');
const User = require('../../models/user');
const checkUser = require('../../mongoose/checkUser');

module.exports = {
    name: 'userinfo',
    description: 'returns all information on a user',
    category: 'information',
    usage: 'userinfo [@member]',
    permission: 'MANAGE_MESSAGES',
    run: async (client, message, args, embed) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(message.author.id); 
        let pfp = member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 });

        await checkUser(message.guild.id, member.id, member.user.username, member.user.tag);

        let userinfo = await User.findOne({

            guildID: message.guild.id, 
            userID: member.id

        }).catch(err => {

            console.log(err);
            message.channel.send(client.lang('ERROR_DATABASE_FETCH'));
            return;

        });
        
        let nickname;
        member.nickname ? nickname = member.nickname : nickname = "None";

        // let status;
        // if(!member.presence) status = 'offline';
        // if(member.presence.status == 'dnd') status = 'do not disturb'; 
        // if(member.presence.status == 'idle') status = 'idle'; 
        // if(member.presence.status == 'online') status = 'online'; 

        let joinedDiscord = `${moment(member.user.createdTimestamp).format('MMMM Do YYYY')} (${moment(member.user.createdTimestamp).startOf('dat').fromNow()})`;
        let joinedServer = `${moment(member.joinedAt).format('MMMM Do YYYY')} (${moment(member.joinedAt).startOf('day').fromNow()})`;

        let roles = [];
        member._roles.forEach(role => {
                        
            let r = message.guild.roles.cache.find(roles => roles.id === role);
            roles.push(`<@&${r.id}>`);
                        
        });

        if(!roles) console.log(true)

        roles.toString().length = 0 ? roles = '@everyone' : roles + '@everyone';

        let values = [
            `**Username:** ${nickname}`, 
            `**Discriminator:** ${member.user.discriminator}`, 
            `**ID:** ${member.id}`, 
            `**Joined Discord:** ${joinedDiscord}`,
            `**Joined Server:** ${joinedServer}`,
            `**Roles [${roles.length.toString()}]:** ${roles.toString().replace(/\s*,\s*|\s+,/g, ' ')}` 
        ];

        embed.setAuthor(member.user.tag, pfp)
        embed.setThumbnail(pfp)
        embed.setDescription(values.join('\n').toString().replace(/,/g, ' '))

        message.channel.send({ embeds: [embed] });
 
    }
}