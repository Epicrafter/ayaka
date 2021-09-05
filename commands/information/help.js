const { MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'show commands list or specific command help',
    category: 'information',
    usage: 'help [command_name]',
    run: async (client, message, args, embed) => {
        
        let commandArg = args[0];

        let docsButton = new MessageActionRow()
        .addComponents(

            new MessageButton()
			.setLabel('Docs')
            .setURL('https://www.ayaka-bot.tk/')
			.setStyle('LINK'),

            new MessageButton()
            .setLabel('Invite')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=875322665064357888&permissions=261993005047&scope=bot')
            .setStyle('LINK'), 

            new MessageButton()
            .setLabel('Repository')
            .setURL('https://github.com/Epicrafter/ayaka')
            .setStyle('LINK')

        )
        
        if(!commandArg) {

            const commands = (category) => {

                return client.commands
                    .filter(cmd => cmd.category === category)
                    // .map(cmd => `>**${cmd.name}**: ${cmd .description[0].toUpperCase() + cmd.description.slice(1)}`)
                    .map(cmd => `\`\`${cmd.name}\`\``)
                    .join(' ');
    
            }
    
            const info = client.categories
                .map(cat => `\n**${cat[0].toUpperCase() + cat.slice(1)}** \n ${commands(cat)}`)
                .reduce((string, category) => string + '\n' + category);
            
            const description = client.lang('HELP_DESCRIPTION');

            embed.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 }))
            embed.setDescription(description + info)
            message.channel.send({ embeds: [embed], components: [docsButton] });

        } else {

            let command = args[0].toLowerCase();
            let cmd = client.commands.get(command);

            if(cmd == undefined) return message.error(client.lang('NO_COMMAND'), { type: 'embed' } );

            let data = `\`\`<>\`\`: required | \`\`[]\`\`: optional\n\n**Description**\n${cmd.description[0].toUpperCase() + cmd.description.slice(1)}.\n`;

            if(cmd.note) data = data + `\n**Note**\n${cmd.note}\n`;
            if(cmd.permission) data = data + `\n**Required Permission**\n${cmd.permission}`;
            if(cmd.owner) data = data + `\n**Owner** \nTRUE`;
            
            embed.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 }))
            embed.setTitle(`\`\`${cmd.usage}\`\``)
            embed.setDescription(data.toString())

            message.channel.send({ embeds: [embed] });

        }

    }
}

 