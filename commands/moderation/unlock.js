// module.exports = {
//     name: 'unlock',
//     description: 'unlock a channel',
//     category: 'moderation',
//     usage: 'unlock [#channel]',
//     permission: 'MANAGE_SERVER',
//     run: async (client, message, args) => {

//         let channel = message.mentions.channels.first() || message.channel;
//         channel.permissionOverwrites.create(channel.guild.roles.everyone, { SEND_MESSAGES: true });
//         console.log(channel.name)

//         if(!channel.name.includes('🔒-')) return message.error(client.lang('NOT_LOCKED'), { type: 'embed' });

//         let channelName = channel.name.replace('🔒-', '');
//         console.log(channelName);
//         channel.setName(channelName)

//         message.success(client.lang('CHANNEL_UNLOCKED'), { type: 'embed' });

//     }
// }  