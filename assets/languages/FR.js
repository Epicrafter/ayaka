const mark = require('@discordjs/builders');

const languageData = {
    // PING: (ms) => `Pong! Bot's latency: ${ms}ms`,
    NO_COMMAND: "Cette commande ne semble pas existé",
    ONLY_OWNER: "Seul le propriétaire de ce bot peut exécuter cette commande",
    ADD_DATABASE: "Cette guilde n'était pas dans notre base de données. Nous l'avons maintenant ajoutée.",
    ERROR_DATABASE_FETCH: "Une erreur s'est produite lors de la tentative d'extraction d'informations de notre base de données. Veuillez réessayer plus tard.",
    ERROR_OCCURRED: "Une erreur s'est produite lors de la tentative d'exécution de cette tâche",
    NO_VALID_ID: "Veulliez fournir un ID utilisateur valide",
    VALID_NUMBER: "Veuillez fournir un nombre valide de message que vous voulez supprimer",

    NO_PREFIX: "Veulliez fournir un nouveau préfixe",
    NEW_PREFIX: (prefix) => `Le préfixe a été modifié en \`\`${prefix}\`\``,
    PREFIX: (prefix) => `Le préfixe utilisé sur ce serveur est \`\`${prefix}\`\``,

    SANCTION: "Sanction",
    DURATION: "Durée",
    UNDETERMINED: 'indéterminé',
    CHANNEL: (channel) => `**Dans**: <#${channel}>`,
    INVALID_CHANNEL: 'Impossible de trouver ce salon, veuillez réessayer',
    CHANNEL: 'salon',

    REASON: (reason) => `**Raison**: ${reason}`,
    NO_REASON: "Veuilliez fournir une raison",
    NO_MENTION_TYPE: (forType) => `Veuilez mentionner l'utilisateur que vous voulez ${forType}`,
    NO_MENTION: "Veuilliez mentionner un utilisateur",

    KICK: "exlure",
    CANT_KICK_YOURSELF: "Vous ne pouvez pas vous exclure vous-même",
    CANT_KICK_USER: "Vous ne pouvez pas exclure cet utilisateur",
    KICKED: (userTag) => `**${userTag}** a été exclut`,
    KICKED_DM: (guildName) => `Vous avez été exclut de **${guildName}**`,
    KICK_COUNT: (count) => `**Nombre d'exclusions**: ${count}`,
    KICKED_BY: (author) => `**Exclut par**: ${author}`,

    USER_CHECK_TYPE: "Type d'information",
    CHECK_TYPES: "kicks | bans | warns",
    CHECK_USER_MESSAGE_KICK: (typeNumber) => `a été exclut ${typeNumber} fois sur ce serveur`,
    CHECK_USER_MESSAGE_BAN: (typeNumber) => `a été banni(é) ${typeNumber} fois sur ce serveur`,
    CHECK_USER_MESSAGE_WARNS: (typeNumber) => `a été averti(e) ${typeNumber} fois sur ce serveur`,

    USER_RESET_TYPE: 'Type de réinitialisation',
    USER_RESET: (type) => `Le nombre d'${type} ont été réinitialisé(e)s`,
    TYPE_KICKS: 'exclusions',
    TYPE_BANS: 'interdictions',
    TYPE_WARNS: 'avertissements',

    MESSAGES_DELETED: (deletedAmount) => `J'ai réussi à supprimer ${deletedAmount} message(s)`,

    MUTE: "réduire au silence",
    TEMPMUTED: (duration) => `a été reduit au silence pendant ${duration}`,
    MUTED: 'a été reduit au silence',
    ALREADY_MUTED: (user) => `${user} est déjà reduit au silence`,
    MISSING_MUTE_DURATION: "Veuillez préciser la durée pendant laquelle vous souhaitez que l'utilisateur soit reduit au silence",
    YOU_MUTED_IN: (server) => `Vous venez d'être reduit au silence sur **${server}**`,
    NOT_MUTED: "Cet utilisateur n'est pas actuellement reduit au silence",
    UNMUTED: (user) => `<@${user}> a retrouvé la voix`,

    HELP_DESCRIPTION: "Voici la liste de commandes mis à votre disposition. Pour obtenir plus d'informations sur une commande, tapez \`\`!help <commande>\`\` \`\`(ex: !help say).\`\`\n",
    
    WARN: 'avertir',
    WARNED: (user) => `**${user}** a été avertit`,
    WARNED_DM: (server) => `Vous avez éte averti sur **${server}**`,
    WARN_COUNT: (count) => `**Nombre d'avertissements**: ${count} `,
    WARNED_BY: (user) => `**Averti par**: ${user}`,

    RENAME: 'renommer',
    RENAMED: (nick) => `a été renommé a ${nick}`,
    NO_NICK: "Nouveau nom d'utilisateur",

    REPORT: 'signaler',
    REPORTED: (user) => `<@${user}> a été signalé`,
    REPORT_YOU: 'Vous ne pouvez pas vous signaler vous-même',

    SET_REPORT_MISSING: "Veuillez indiquer un salon valide dans lequel vous souhaitez que les signalements soit envoyé",
    REPORT_CHANNEL: (channel) => `Tous les rapports seront désormais enregistrés dans <#${channel}>`,
    NO_REPORT_CHANNEL: "Pas de salon report défini! Exécutez la commande \`\`setreport\`\` pour en définir un.",

    SET_SANCTIONS_MISSING: "Veulliez indiquer un salon valide dans lequel vous souhaitez que les sanctions soit envoyé",
    SANCTION_CHANNEL: (channel) => `Toutes les sanctions seront désormais enregistrés dans <#${channel}>`,
    NO_SANCTIONS_CHANNEL: "Pas de salon sanctions défini! Exécutez la commande **setsanctions** pour en définir un.",

    NO_VALID_DURATION: 'Entrez une durée valide ou, entrez \`\`off\`\` si vous souhaitez désactiver le mode lent sur ce salon',
    SLOWMODE_ACTIVATE: (duration) => `Un mode lent de ${duration} vient d'être activé`,
    SLOWMODE_DESACTIVATE: (channel) => `Le mode lent dans <#${channel}> vient d'être désactiver`,

    NO_MENTION_OWNER: 'Veulliez mentionner **@Epicrafter#4261** pour pouvoir utiliser cette commande',

    NEW_MEMBERS_LOGS: (channel) => `Les nouveaux membres seront désormais annoncés dans <#${channel}>`,
    BYE_MEMBERS_LOGS: (channel) => `Les membres quittant le serveur seront désormais annoncés dans <#${channel}>`,
    NEW_MEMBER: (message) => `Le message de bienvenue est maintenant\n\`\`\`${message}\`\`\``,
    BYE_MEMBER: (message) => `Le message d'adieu est maintenant \n\`\`\`${message}\`\`\``,
    NO_EVENT_TYPE: "Veuillez indiquer le type d'événement (\`\`welcome\`\` or \`\`goodbye\`\`)",
    NO_CUSTOM_MESSAGE: "Un message custom est nécessaire",

    NO_DM_MESSAGE: "Veuillez inclure le message que vous souhaitez envoyer à l'utilisateur",
    DM_SUCCESS: "Le message a été envoyé avec succès à l'utilisateur",
    DM_ERROR: "Une erreur s'est produite lors de l'envoi du message à l'utilisateur",
    SENT_YOU_DM: (user) => `${user} vous à envoyé un message`,
    SENT_FROM: (server) => `**Envoyé depuis le serveur:** ${server}`,

    BAN: "bannir",
    CANT_BAN_YOURSELF: "Vous ne pouvez pas vous bannir vous-même",
    CANT_BAN_USER: "Vous ne pouvez pas bannir cet utilisateur",
    BANNED: (userTag) => `**${userTag}** a été banni`,
    BANNED_DM: (guildName) => `Vous avez été banni de **${guildName}**`,
    BAN_COUNT: (count) => `**Nombre de bannissement**: ${count}`,
    BANNED_BY: (author) => `**Banni par**: ${author}`,

    CHANNEL_LOCKED: 'Le salon a été verrouillé',
    NOT_LOCKED: 'Ce salon n\'est pas verrouillé',
    ALREADY_LOCKED: 'Ce salon est déjà verrouillé',
    CHANNEL_UNLOCKED: 'Le salon a été déverrouillé',

    NO_ANNOUNCE_CHANNEL: 'Veuillez préciser le salon dans lequel vous souhaitez envoyer l\'annonce',
    NO_ANNOUNCEMENT: 'Veuilliez fournir un message d\'annonce',
    ANNOUNCE_SUCCESS: 'L\'annonce a été livrée avec succès',
    NEW_ANNOUNCEMENT: 'Nouvelle annonce',

    NO_SANCTION_ID: 'Veuillez fournir un ID de sanction',
    NOT_A_SANCTION: 'Une sanction avec cet ID n\'existe pas',
    GET_SANCTION_NOTE: 'Pour obtenir plus d\'informations sur une sanction, utilisez la commande \`\`getsanction\`\`',
    NO_SANCTION: '**Cet utilisateur n\'a pas de sanctions enregistrées**'

};

const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;