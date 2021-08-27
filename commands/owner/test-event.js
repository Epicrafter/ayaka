module.exports = {
    name: 'test-event',
    description: 'test an client event',
    category: 'owner',
    usage: 'test-event',
    owner: true,
    run: async (client, message, args) => {

        client.emit('guildMemberAdd', message.member);
        return message.channel.send('new member');

    }
}