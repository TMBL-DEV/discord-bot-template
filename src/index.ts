import * as dotenv from "dotenv";
import * as path from "path";
import { Client, Intents } from "discord.js";
import DiscordSlashCommand from "./blueprints/discord_slash_command";
import { CommandSync } from "./command_sync";

let dotenvPath = path.join(process.cwd(), ".env");
if (path.parse(process.cwd()).name === "dist")
	dotenvPath = path.join(process.cwd(), "..", ".env");

dotenv.config({ path: dotenvPath });

// IMPORTANT!! always import the config that uses the .env file after loading in the .env
import discordConfig from "./configs/discord_config"


// init clients
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const CommandsClient = new CommandSync();

const commands: DiscordSlashCommand[] = CommandsClient.sync(discordConfig.token);

const main = () => {
	client.on("ready", async () => {
		console.log("your application is ready");
	});

	client.on("interactionCreate", async (interaction) => {
		if (!interaction.isCommand()) return;

		const command: null|DiscordSlashCommand = commands.find(
			(slashCommand: DiscordSlashCommand) =>
				slashCommand.data.name === interaction.commandName
		) ?? null;

		if (!command) {
			return interaction.reply("command not found");
		}

		await command.execute(interaction);
	});

	client.login(discordConfig.token);
};

main();
