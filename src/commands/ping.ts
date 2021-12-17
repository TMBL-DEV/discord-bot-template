import { SlashCommandBuilder } from "@discordjs/builders";
import DiscordSlashCommand from "../blueprints/discord_slash_command";

const command: DiscordSlashCommand = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("replies with pong"),
	async execute(interaction) {
		await interaction.reply("Pong!");
	},
};

module.exports = command;
