// Imports and configuration
require('dotenv').config();

const { readdirSync } = require('node:fs');
const { join } = require('node:path');

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { BOT_TOKEN } = process.env;

// New client and event listeners
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Command handling
client.commands = new Collection();
const commandsPath = join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".js"));

commandFiles.forEach(file => {
	const command = require(join(commandsPath, file));
	client.commands.set(command.data.name, command);
});

// Event handling
const eventsPath = join(__dirname, "events");
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Login to Discord
client.login(BOT_TOKEN);