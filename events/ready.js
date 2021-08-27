const client = require('../index.js');

client.on('ready', () => {
    console.log(`[BOT] - ${client.user.username} ready`);
});