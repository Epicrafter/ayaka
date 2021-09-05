const row = new MessageActionRow()
        .addComponents(

            new MessageSelectMenu()
                .setCustomId('userinfo')
                .setPlaceholder('Nothing Selected')
                .setMaxValues(1)
                .setMinValues(0)
                .addOptions([
                    {
                        'label': 'Type: User',
                        'description': 'Information on the user',
                        'value': 'first_option',
                        'default': true
                    },
                    {
                        'label': 'Type: Member',
                        'description': 'Information on the member',
                        'value': 'second_option',
                        'default': false
                    }
                ])

        )

        embed.setAuthor(member.user.tag, pfp)
        embed.setDescription('user');

        message.channel.send({ ephemeral: true, embeds: [embed], components: [row] })

            const filter = (interaction) => 
            interaction.isSelectMenu() 
            && interaction.user.id === message.author.id; 

            const collector = message.channel.createMessageComponentCollector({
                filter,
                max: 100,
            });

            collector.on('collect', async (collected) => {

                // const value = collected.values[0];

                let collect;
                collected.values[0] == 'first_option' ? collect = 'user' : collect = 'member';
                embed.setDescription(collect)

                collected.update({ embeds: [embed] });

        });