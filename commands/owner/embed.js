const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'send a custom embed',
    category: 'owner',
    usage: 'embed',
    owner: true,
    run: async (client, message, args) => {

        let emoji = client.emojis.cache.find(emoji => emoji.name === '880567159095443456');
        console.log(emoji)

        const embed = new MessageEmbed()
        .setColor('#a29bfe')
        .setTitle(`${emoji}`)
        .setDescription('Veuilliez mentionner un utilsateur\nUsage: \`\`!clear-sanctions <@member> <kicks|bans|warns>\`\`')

        message.channel.send({ embeds: [embed] });

    }
} 