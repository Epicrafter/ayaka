const client = require('../index.js');

client.on('ready', () => {

    console.log(`[BOT] - ${client.user.username} ready`);

    client.user.setActivity(`ayaka-bot.tk | !help`, { type: 'WATCHING' });

    // let avatars = [
    //     'https://i.imgur.com/Tntd72J.jpg', // purple
    //     'https://i.imgur.com/tOWymG5.jpg', // yellow
    //     'https://i.imgur.com/8T3xJ5H.jpg' // green
    // ];

    // setInterval(() => {

    //     client.user.setAvatar(avatars[Math.floor(Math.random() * avatars.length)]);

    // }, 15000)

});