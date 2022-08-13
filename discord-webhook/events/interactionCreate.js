// On interaction create event 
module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
            console.log(`${interaction.user.tag} executed ${command.data.name} command in #${interaction.channel.name}`);
        } catch (error) {
            console.error(error);
        }
    }
};