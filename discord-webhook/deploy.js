// Imports and configuration
require('dotenv').config();

const { readdirSync } = require('node:fs');
const { join } = require('node:path');

const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

const { BOT_TOKEN, CLIENT_ID, PRODUCTION } = process.env;

const commands = [];
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

// Deploy commands based on PRODUCTION environment variable
if (PRODUCTION.toLowerCase() === 'true') {
    const { PRODUCTION_GUILD_ID } = process.env;

    rest.put(Routes.applicationGuildCommands(CLIENT_ID, PRODUCTION_GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands in production guild!'))
	.catch(console.error);
} else if (PRODUCTION.toLowerCase() === 'false') {
    const { DEVELOPMENT_GUILD_ID } = process.env;

    rest.put(Routes.applicationGuildCommands(CLIENT_ID, DEVELOPMENT_GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands in development guild!'))
    .catch(console.error);
} else {
    console.error('PRODUCTION environment variable is not set to true or false!');
    process.exit(1);
}