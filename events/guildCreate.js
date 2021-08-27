const client = require('../index');
const Guild = require('../models/guild');

client.on('guildCreate', async (guild) => {

    console.log('Added from guildCreate()) function')

    console.log(guild.id);
    await Guild.findOne({
        guildID: guild.id
    }, (err, guilds) => { 

        if(err) console.log(err);

        if(!guilds) {

            const newGuild = new Guild({
                guildID: guild.id,
                guildName: guild.name,
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

})