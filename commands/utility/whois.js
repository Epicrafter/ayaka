// const moment = require('moment');
// const User = require('../../models/user');
// const checkUser = require('../../mongoose/checkUser');

// module.exports = {
//     name: 'whois',
//     description: 'returns all the information about a member',
//     category: 'moderation',
//     usage: 'whois [@member]',
//     permission: 'MANAGE_MESSAGES',
//     run: async (client, message, args, embed) => {

//         let member = message.mentions.members.first() || message.guild.members.cache.get(message.author.id); 
//         let memberPFP = member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 });

//         let data = [];
//         let final;
        
//         checkUser(message.guild.id, member.id, member.user.username, member.user.tag); 

//         let userInfo = await User.findOne({

//             guildID: message.guild.id,
//             userID: member.id

//         }).catch(err => {
 
//             console.log(err);
//             message.channel.send(client.lang('ERROR_DATABASE_FETCH'));
//             return;

//         }); 

//         let joinedDiscord = `${moment(member.user.createdTimestamp).format('MMMM Do YYYY')} (${moment(member.user.createdTimestamp).startOf('dat').fromNow()})`;
//         let joinedServer = `${moment(member.joinedAt).format('MMMM Do YYYY')} (${moment(member.joinedAt).startOf('day').fromNow()})`;
//         console.log(member.presence); 
//         if(member.presence.status == null) member.presence.status = 'offline';
//         if(member.presence.status == 'dnd') member.presence.status = 'do not disturb'; 

//         let nickname;
//         member.nickname ? nickname = member.nickname : nickname = "None";
   
//         data.push(`\n**Username:** ${nickname}\n**Discriminator:** ${member.user.discriminator}\n**ID:** ${member.id}\n**Joined Discord:** ${joinedDiscord}\n**Status:** ${member.presence.status}\n**Joined Server:** ${joinedServer}`);

//         if(member._roles.length.toString() != 0) {

//             let roles = [];
//             member._roles.forEach(role => {

//                 let r = message.guild.roles.cache.find(roles => roles.id === role);
//                 roles.push(`<@&${r.id}>`);

//             });

//             final = data.toString() + `\n**Roles [${roles.length.toString()}]:** ${roles.toString().replace(/\s*,\s*|\s+,/g, ' ')} @everyone`;

//         }   

//         final = final + `\n\n**Warn Count:** ${userInfo.warnCount}\n**Kick Count:** ${userInfo.kickCount}\n**Ban Count:** ${userInfo.banCount}`;

//         embed.setAuthor(member.user.tag, member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 }))
//         embed.setThumbnail(memberPFP)
//         embed.setDescription(final)

//         message.channel.send({ embeds: [embed] });

//     }   
// }      