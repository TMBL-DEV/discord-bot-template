import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/rest/v9";
import { readdirSync } from "fs";
import path from "path";
import DiscordSlashCommand from "./blueprints/discord_slash_command";
import discord from "./configs/discord_config"

export class CommandSync {
	public commands: DiscordSlashCommand[] = [];
	public rest = new REST({ version: "9" });

	public sync(discordToken: string): DiscordSlashCommand[] {
		this.rest.setToken(discordToken);

		const commandFiles = readdirSync(
			path.join(__dirname, "commands")
		).filter((file) => file.endsWith(".js"));

		for (const file of commandFiles) {
			const command = require(`./commands/${file}`);
			this.commands.push(command);
		}

		this.rest.put(Routes.applicationCommands(discord.appId), {
			body: this.commands.map((command: DiscordSlashCommand) => {
				return command.data;
			}),
		});

		return this.commands;
	}
}
