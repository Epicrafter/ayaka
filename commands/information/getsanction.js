const Logs = require('../../models/logs');
const missingArgument = require('../../assets/embeds/missingArgument');

const dateFormat = require('dateformat');

module.exports = {
    name: 'getsanction',
    description: 'get some information about a specifig sanction',
    category: 'information',
    usage: 'getsanction <sanction_id>',
    note: 'To get all the sanctions on a server use the \`\`sanctionlist\`\` command',
    permission: 'MANAGE_SERVER',
    run: async (client, message, args, embed) => {

        let cmd = client.commands.get('getsanction');
        let sanctionid = args[0];
        if(!sanctionid) return missingArgument(message, client.lang('NO_SANCTION_ID'), cmd.usage);
        
        let sanction = await Logs.findOne({ 

            logID: sanctionid,
            guildID: message.guild.id

        }).catch(err => {

            console.log(err);
            message.channel.send(client.lang('ERROR_DATABASE_FETCH'));
            return;

        });

       
        if(!sanction) return message.error(client.lang('NOT_A_SANCTION'), { type: 'embed' });

        let user = client.users.cache.get(sanction.userID);

        // embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 }))
        embed.setTitle(`Sanction \`\`#${sanction.id}\`\``)
        embed.setThumbnail(user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024}))
        // embed.setDescription(`**Sanction type**\n${sanction.logType}\n\n**User**\n<@${sanction.userID}> | ${sanction.userID}\n\n**Reason**\n${sanction.reason}\n\n**Date**\n${moment(sanction.date).format('MMMM Do YYYY, h:mm:ss a')}`)
        embed.addFields(
            { name: 'Sanction', value: sanction.logType, inline: true }, 
            { name: '\u200B', value: '\u200B', inline: true },  
            { name: 'Date', value: dateFormat(sanction.date, 'mmmm dS, yyyy, h:MM:ss tt'), inline: true },
            { name: 'User ID', value: sanction.userID, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },   
            { name: 'User', value: `${user.username}#${user.discriminator}`, inline: true }, 
            { name: 'Reason', value: sanction.reason }
        )

        message.channel.send({ embeds: [embed] });

    }
}