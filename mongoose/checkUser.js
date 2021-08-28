const User = require('../models/user');

module.exports = async function checkUser(guildID, userID, username, userTag) {

    console.log('function fired')

    await User.findOne({

        guildID: guildID,
        userID: userID

    }, (err, user) => {

        if(err) console.error(err);
        if(!user) {

            const newUser = new User({

                guildID: guildID,
                userID: userID,
                username: username,
                userTag: userTag,
                kickCount: 0,
                banCount: 0,
                warnCount: 0
        
            });
        
            newUser.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));

        }

    })

}