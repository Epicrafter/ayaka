const Logs = require('../../models/logs');
const dateFormat = require('dateformat');

const missingArgument = require('../../assets/embeds/missingArgument');

module.exports = {
    name: 'sanctionlist',
    description: 'get all the sanctions associated to this server',
    category: 'information',
    usage: 'sanctionlist',
    permission: 'MANAGE_SERVER',
    run: async (client, message, args, embed) => {

        let cmd = client.commands.get('sanctionlist');

        let id = args[0];
        let user = client.users.cache.get(id) || message.mentions.members.first();
        if(id && !user) return missingArgument(message, client.lang('NO_VALID_ID'), cmd.usage);

        let request;
        id 
        ? request = { guildID: message.guild.id, userID: user.id }
        : request = { guildID: message.guild.id };

        let sanction = await Logs.find(request).catch(err => {

            console.log(err);
            message.channel.send(client.lang('ERROR_DATABASE_FETCH'));
            return;

        });

        let data = [`${client.lang('GET_SANCTION_NOTE')},`];
        sanction.forEach(log => {
            data.push(`\`\`${log.logID}\`\` ( ${log.logType} | ${dateFormat(log.date, 'dd/mm/yyyy')} )`)
        })

        if(sanction.toString().length == 0) data.push(client.lang('NO_SANCTION'));

        let authorMessage;
        console.log(user)
        user ? authorMessage = `${user.id}\'s sanctions` : `Sanction in ${message.guild.name}`;

        embed.setAuthor(authorMessage, message.guild.iconURL({ format: 'jpg', dyanmic: true, size: 1024 }))
        embed.setDescription(data.toString().replace(/\s*,\s*|\s+,/g, '\n'))

        message.channel.send({ embeds: [embed] }); 

    }
}