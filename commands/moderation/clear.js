const { MessageEmbed } = require('discord.js');

const missingArgument = require('../../assets/embeds/missingArgument');

module.exports = {
    name: "clear",
    description: "quicly delete multiple messages",
    category: "moderation",
    permission: "MANAGE_MESSAGES",
    usage: "clear <amout>",
    run: async (client, message, args) => {

        let cmd = client.commands.get('clear');

        let amount = args[0];
        let deleteAmout;

        if(isNaN(amount) || !amount) return missingArgument(message, client.lang('VALID_NUMBER'), cmd.usage);

        if(message.deletable) message.delete();
        

        if(parseInt(amount > 100)) {
            deleteAmout = 100;
        } else {
            deleteAmout = parseInt(amount)
        }

        let embed = new MessageEmbed()
        .setColor(client.embedColor)

        message.channel.bulkDelete(deleteAmout, true)
        .then((messages) => {

            let deletedAmount = messages.size;
            embed.setDescription(client.lang('MESSAGES_DELETED', deletedAmount))
            message.channel.send({ embeds: [embed] })

        })
        .catch(err => message.error(client.lang('ERROR_OCCURRED'), { type: 'embed' } )); 


        
        
    }
}