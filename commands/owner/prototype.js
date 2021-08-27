module.exports = {
    name: 'prototype',
    description: 'test a command',
    category: 'owner',
    usage: 'prototype',
    owner: true,
    run: async (client, message, args) => {

        const type = args[0];

        message.error('Role created', {
           type: type
        });

    }
}