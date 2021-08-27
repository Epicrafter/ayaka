const { Util } = require('discord.js');

module.exports = {
    name: 'emoji',
    description: 'steal an emoji from the server',
    category: 'owner',
    usage: 'emoji <:emoji:>',
    owner: true,
    run: async (client, message, args) => {

        const parsedEmoji = Util.parseEmoji(args[0]);

        // if(parsedEmoji.id) {

        //     const extension = parsedEmoji.animated ? ".gif" : ".png";
        //     const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}?v=1`;

        //     message.guild.emojis
        //         .create(url, parsedEmoji.name)
        //         .then((emoji) => message.channel.send(`Added: \`${emoji.url}\``));

        // }

        console.log(parsedEmoji)
        
        // message.channel.send(`<:ayaka_success:880748958220189756>`);
        // message.channel.send(`<:ayaka_error:880748958278909972>`)

    }
}