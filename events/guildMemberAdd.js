const client = require('../index');
const User = require('../models/user');
const Guild = require('../models/guild');
const { MessageEmbed } = require('discord.js');

client.on('guildMemberAdd', async (member) => {

    await User.findOne({

        guildID: member.guild.id,
        userID: member.id

    }, (err, user) => {

        if(err) console.error(err);
        if(!user) {

            const newUser = new User({

                guildID: member.guild.id,
                userID: member.id,
                username: member.user.username,
                userTag: member.user.tag,
                kickCount: 0,
                banCount: 0,
                warnCount: 0

            });

            newUser.save()
            .then(result => console.log(result))
            .catch(error => console.error(error));

        }

    })

    const guildSettings = await Guild.findOne({

        guildID: member.guild.id

    }).catch(err => { console.error(err) });

    if(guildSettings.welcomeChannel) {

        let channel;
        let message;
        if(guildSettings.welcomeChannel) channel = guildSettings.welcomeChannel, message = guildSettings.welcomeMessage;

        let final = message.replace('<user>', `<@${member.id}>`).replace('<server>', member.guild.name).replace('<member_count>', member.guild.memberCount);

        let embed = new MessageEmbed()
        .setColor('#feca57')
        .setDescription(final)

        member.guild.channels.cache.get(channel).send({ embeds: [embed ]});

    }

})