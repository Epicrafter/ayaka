const User = require('../../models/user');

module.exports = async function updateBan(guildID, userID) {

    await User.findOne({

        guildID: guildID,
        userID: userID

    }, (err, user) => {

        if(err) console.log(err);

        user.updateOne({

            banCount: user.banCount + 1

        })
        .then(result => console.log(result))
        .catch(err => console.error(err))

    })

} 