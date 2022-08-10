// Imports and configuration
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { BOT_TOKEN, APP_ID } = process.env;

// New client and event listeners
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
	console.log(`🌀 Logged in as ${client.user.tag}!`);
});

// Login to Discord
client.login(BOT_TOKEN);