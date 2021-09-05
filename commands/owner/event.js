module.exports = {
    name: 'event',
    description: 'test an client event',
    category: 'owner',
    usage: 'event <event_type>',
    note: '[Here](https://discord.js.org/#/docs/main/stable/typedef/WSEventType) is a list of all the Event Types',
    owner: true,
    run: async (client, message, args) => {

        let event = args[0];
        client.emit(event, message.member);

    }
} 