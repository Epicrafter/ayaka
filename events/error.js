const client = require('../index');

client.on('error', (error) => {

    console.log(error);
    
})