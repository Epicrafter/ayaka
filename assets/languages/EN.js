const mark = require('@discordjs/builders');

const languageData = {
    // PING: (ms) => `Pong! Bot's latency: ${ms}ms`,
    NO_COMMAND: "This command doesn' seem to exist",
    ONLY_OWNER: "Only the owner of this bot cant execute this command",
    ADD_DATABASE: "This guild was not in our database. We have now added it.",
    ERROR_DATABASE_FETCH: "An error occurred while trying to fetch information from out database. Please try again later. ",
    ERROR_OCCURRED: "An error occurred while attempting to run this task",
    NO_VALID_ID: "Please provide a valid user ID",
    VALID_NUMBER: "Please provide a valid number of message you want to delete",

    NO_PREFIX: "You must provide a new prefix",
    NEW_PREFIX: (prefix) => `Prefix has been changed to \`\`${prefix}\`\``,
    PREFIX: (prefix) => `The prefix set on this server is \`\`${prefix}\`\``,

    SANCTION: "Sanction",
    DURATION: "Duration",
    UNDETERMINED: 'undetermined',
    CHANNEL: (channel) => `**In channel**: <#${channel}>`,
    INVALID_CHANNEL: "Could not find that channel, please try again",
    CHANNEL: 'channel',

    REASON: (reason) => `**Reason**: ${reason}`,
    NO_REASON: "Please provide a reason",
    NO_MENTION_TYPE: (forType) => `Please mention the user you want to ${forType}`,
    NO_MENTION: "Please mention a user",

    KICK: "kick",
    CANT_KICK_YOURSELF: "You can't kick yourself",
    CANT_KICK_USER: "You can't kick that user",
    KICKED: (userTag) => `**${userTag}** has been kicked`,
    KICKED_DM: (guildName) => `You have been kicked from **${guildName}**`,
    KICK_COUNT: (count) => `**Kick Count**: ${count}`,
    KICKED_BY: (author) => `**Kicked by**: ${author}`,

    USER_CHECK_TYPE: "Check type",
    CHECK_TYPES: "kicks | bans | warns",
    CHECK_USER_MESSAGE_KICK: (typeNumber) => `has been kicked ${typeNumber} from this server`,
    CHECK_USER_MESSAGE_BAN: (typeNumber) => `has been banned ${typeNumber} from this server`,
    CHECK_USER_MESSAGE_WARNS: (typeNumber) => `has been warned ${typeNumber} from this server`,

    USER_RESET_TYPE: "Reset type",
    USER_RESET: (type) => `The number of ${type} have been reseted`,
    TYPE_KICKS: 'kicks',
    TYPE_BANS: 'bans',
    TYPE_WARNS: 'warns',

    MESSAGES_DELETED: (deletedAmount) => `I have successfully deleted ${deletedAmount} message(s)`,

    MUTE: "mute",
    TEMPMUTED: (duration) => `has been muted for ${duration}`,
    MUTED: 'has been muted',
    ALREADY_MUTED: (user) => `${user} is already muted`,
    MISSING_MUTE_DURATION: 'Please specify how long you want the user to be muted for',
    YOU_MUTED_IN: (server) => `You have been muted in **${server}**`,
    NOT_MUTED: "This user is not currently muted",
    UNMUTED: (user) => `<@${user}> has been unmuted`,

    HELP_DESCRIPTION: "Here is a list of command you can use. To obtain more information on a command, type \`\`!help <command>\`\` \`\`(eg: !help say).\`\`\n",

    WARN: 'warned',
    WARNED: (user) => `${user} has been warned`,
    WARNED_DM: (server) => `You have been warned in **${server}**`,
    WARN_COUNT: (count) => `**Warns**: ${count}`,
    WARNED_BY: (user) => `**Warned by**: ${user}`,

    RENAME: 'rename',
    RENAMED: (nick) => `has been renamed to ${nick}`,
    NO_NICK: "New username",

    REPORT: 'report',
    REPORTED: (user) => `<@${user}> has been reported`,
    REPORT_YOU: "You can\'t report yourself",

    SET_REPORT_MISSING: "Please mention a valid channel you want the report to be sent in",
    REPORT_CHANNEL: (channel) => `All reports will now be logged in <#${channel}>`,
    NO_REPORT_CHANNEL: "No channel report defined! Run the \`\`setreport\`\` command to define one.",

    SET_SANCTIONS_MISSING: "Please mention a valid channel you want the sanctions to be sent in",
    SANCTION_CHANNEL: (channel) => `All sanctions will now be logged in <#${channel}>`,
    NO_SANCTIONS_CHANNEL: "No channel sanctions defined! Run the **setsanctions** command to define one.",

    NO_VALID_DURATION: "Either enter a valid duration or type off if you want to turn off slowmode on this channel",
    SLOWMODE_ACTIVATE: (duration) => `A cooldown has been set to ${duration}`,
    SLOWMODE_DESACTIVATE: (channel) => `The cooldown in <#${channel}> has been turned off`,

    NEW_MEMBERS_LOGS: (channel) => `New members will now be logged in <#${channel}>`,
    BYE_MEMBERS_LOGS: (channel) => `Members leaving the server will now be logged in <#${channel}>`,
    NEW_MEMBER: (message) => `Welcome message is now set to\n\`\`\`${message}\`\`\``,
    BYE_MEMBER: (message) => `Goodbye message is now set to\n\`\`\`${message}\`\`\``,
    NO_EVENT_TYPE: 'Please provide the type of event (\`\`welcome\`\` or \`\`goodbye\`\`)',
    NO_CUSTOM_MESSAGE: "A custom message is required",

    NO_DM_MESSAGE: "Please include the message you wish to send to the user",
    DM_SUCCESS: "Successfully sent the message to the user",
    DM_ERROR: "An error occurred while trying to send the message to the user",
    SENT_YOU_DM: (user) => `${user} sent you a message`,
    SENT_FROM: (server) => `**Sent from server:** ${server}`,

    BAN: "ban",
    CANT_KICK_YOURSELF: "You can't ban yourself",
    CANT_KICK_USER: "You can't ban that user",
    BANNED: (userTag) => `**${userTag}** has been banned`,
    BANNED_DM: (guildName) => `You have been banned from **${guildName}**`,
    BAN_COUNT: (count) => `**Ban Count**: ${count}`,
    BANNED_BY: (author) => `**Banned by**: ${author}`,

    CHANNEL_LOCKED: 'Channel has been locked',
    NOT_LOCKED: 'This channel isn\'t locked',
    ALREADY_LOCKED: 'This channel is already locked',
    CHANNEL_UNLOCKED: 'Channel has been unlocked',

    NO_ANNOUNCE_CHANNEL: 'Please specify to which channel you would like to send the announcement too',
    NO_ANNOUNCEMENT: 'Please provide a announcement message',
    ANNOUNCE_SUCCESS: 'The announcement was successfully delivered',
    NEW_ANNOUNCEMENT: 'New announcement',

    NO_SANCTION_ID: 'Please provide a sanction ID',
    NOT_A_SANCTION: 'A sanction with this ID doesn\'t exist',
    GET_SANCTION_NOTE: 'To get information about a specific sanction, use the \`\`getsanction\`\` command\n',
    NO_SANCTION: '**This user does not have any registered sanctions**'

};

const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;