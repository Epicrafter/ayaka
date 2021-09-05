// module.exports = {
//     name: 'lock',
//     description: 'lock a channel',
//     category: 'moderation',
//     usage: 'lock [#channel]',
//     permission: 'MANAGE_SERVER',
//     run: async (client, message, args) => {

//         let channel = message.mentions.channels.first() || message.channel;
//         channel.permissionOverwrites.create(channel.guild.roles.everyone, { SEND_MESSAGES: false });

//         if(channel.name.includes('🔒-')) return message.error(client.lang('ALREADY_LOCKED'), { type: 'embed' });

//         channel.setName(`🔒-${channel.name}`)
//         console.log(`🔒-${channel.name}`)

//         message.success(client.lang('CHANNEL_LOCKED'), { type: 'embed' });

//     }
// }   