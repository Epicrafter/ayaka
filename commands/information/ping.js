module.exports = {
    name: 'ping',
    description: 'return the bot latency',
    category: 'information',
    usage: 'ping',
    permission: 'MANAGE_MESSAGES',
    run: async (client, message, args, embed) => {

        try {
            message.delete();
        } catch(err) { throw err };

        embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 }))
        message.channel.send({ embeds: [embed] }).then(msg => {

            const ping = msg.createdTimestamp - message.createdTimestamp;
            embed.setDescription(`**Bot Latency:** ${ping}ms\n**API Latency:** ${client.ws.ping}ms`)
            msg.edit({ embeds: [embed ]});

        })

    }
}