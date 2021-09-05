const { Permissions } = require('discord.js');
const missingArgument = require('../../assets/embeds/missingArgument');
const permissions = Object.keys(Permissions.FLAGS);
const emojis = require('../../assets/json/emojis.json');

module.exports = {
    name: 'permissions',
    description: 'return all the permissions a user has on a channel',
    category: 'information',
    usage: 'permissions [@member]',
    permission: 'MANAGE_MESSAGES',
    run: async (client, message, args, embed) => {

        let cmd = client.commands.get('permissions');
        let member = message.mentions.members.first() || message.member;
        if(!member) return missingArgument(message, client.lang('NO_MENTION'), cmd.usage); 

        let text = '```';
        const mPermissions = message.channel.permissionsFor(member);
		const total = {
			denied: 0,
			allowed: 0
		};

		permissions.forEach((perm) => {

			if(!mPermissions.has(perm)){

				text += `${perm} ❌\n`;
				total.denied++;

			} else {

				text += `${perm} ✅\n`;
				total.allowed++;

			}

		});

		text += `\n${total.allowed} ✅ | ${total.denied} ❌\`\`\``+"\n";
        
        embed.setAuthor(`${member.user.tag} Permissions in ${message.channel.name}`, member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 }))
        embed.setDescription(`${text}`)
		message.channel.send({ embeds: [embed] });
        
    }
}   