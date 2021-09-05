const client = require('../index');
const Guild = require('../models/guild');
const { MessageEmbed } = require('discord.js');

client.on('guildMemberRemove', async (member) => {

    const guildSettings = await Guild.findOne({

        guildID: member.guild.id

    }).catch(err => { console.error(err) });

    if(guildSettings.goodbyeChannel) {

        let channel;
        let message;
        if(guildSettings.goodbyeChannel) channel = guildSettings.goodbyeChannel, message = guildSettings.goodbyeMessage;

        let final = message.replace('<user>', `<@${member.id}>`).replace('<server>', member.guild.name).replace('<member_count>', member.guild.memberCount);

        let embed = new MessageEmbed()
        .setColor('#ff6b6b')
        .setDescription(final)

        member.guild.channels.cache.get(channel).send({ embeds: [embed ]});

    }

})