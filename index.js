const { Client, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
require('./helpers/extenders');

// Embeds
const config = require('./config'); 
const { token } = require('./tokens.json');
const permissionEmbed = require('./assets/embeds/permissionEmbed');

const language = config.language || 'EN';
const lang = require(`./assets/languages/${language}.js`);

const Guild = require('./models/guild');
 
const client = new Client({ intents: 32767 });
module.exports = client; 

client.commands = new Collection();
client.alias = new Collection();
client.categories = fs.readdirSync('./commands/');
client.mongoose = require("./mongoose/mongoose");
client.lang = lang;
client.embedColor = '#a29bfe';

['command', 'event'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on('messageCreate', async (message) => { 

    if(message.author.bot) return;

    await Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => { 

        if(err) console.log(err);

        if(!guild) {

            const newGuild = new Guild({
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: '!',
                sanctionsChannel: null,
                reportChannel: null,
                greetings: false,
                welcomeChannel: null,
                welcomeMessage: null,
                goodbyeChannel: null,
                goodbyeMessage: null,
            });

            newGuild.save()
            .then(result => console.log(result))
            .catch(error => console.log(error))

        }

    })

    let configGuild = await Guild.findOne({

        guildID: message.guild.id

    }).catch(err => {

        console.log(err);
        message.channel.send(client.lang('ERROR_DATABASE_FETCH'));
        return;

    });

    if(!message.content.startsWith(configGuild.prefix)) return;

    const args = message.content.slice(configGuild.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;    

    let command = client.commands.get(cmd);
    if(!command) return message.error(client.lang('NO_COMMAND'), { type: 'embed' });

    if(command) {

        let requiredPermission = command.permission;

        if(command.owner == true && message.author.id != '342333088573161472') {
            return permissionEmbed(message, client.lang('ONLY_OWNER'));
        }

        if(requiredPermission && !message.member.permissions.has(requiredPermission)) {
            return permissionEmbed(message, requiredPermission);
        }
        
        const embed = new MessageEmbed()
        .setColor(client.embedColor)

        const sanctionEmbed = new MessageEmbed()
        .setTitle('Sanction')
        .setColor(client.embedColor)

        command.run(client, message, args, embed, sanctionEmbed);
        
    }

});

client.mongoose.init();
client.login(token);