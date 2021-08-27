const { readdirSync } = require("fs");
const chalk = require('chalk');

const ascii = require("ascii-table");
const table = new ascii().setHeading(['Command', 'Status']);

const loaded = chalk.green('loaded');

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '🟢');
            } else {
                table.addRow(file, '🔴');
                continue;
            }

        }
    });
    console.clear(); 
    console.log(table.toString());
    console.log('');
    console.log('[COMMAND-HANDLER] - Ready');
}   