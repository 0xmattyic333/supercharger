const { SlashCommandBuilder } = require("@discordjs/builders");

// Ping command 
module.exports = {
	data: new SlashCommandBuilder()
		.setName("webhook")
		.setDescription("Webhook management")
        .addSubcommand(subcommand =>
            subcommand
                .setName("create")
                .setDescription("Create a webhook")
                .addStringOption(option => option.setName("name").setDescription("Name of the webhook"))
                .addStringOption(option => option.setName("avatar").setDescription("Avatar of the webhook"))
                .addChannelOption(option =>option.setName("channel").setDescription("Channel to send the webhook to"))
        ),

	async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        if (!subcommand) return;

        switch (subcommand) {
            case "create":
                const name = interaction.options.getString("name") || "New Webhook";
                const avatar = interaction.options.getString("avatar") || "https://cdn.discordapp.com/embed/avatars/0.png";
                const channel = interaction.options.getChannel("channel") || interaction.channel;

                channel.createWebhook({
                    name: name,
                    avatar: avatar,
                }).then(webhook => {
                    interaction.reply(`Webhook created: ${JSON.stringify(webhook)}`);
                }).catch(error => {
                    interaction.reply(`Error creating webhook: ${error}`);
                });
                break;
            default:
                interaction.reply(`Unknown subcommand: ${subcommand}`);
                break;
        }
    }
};