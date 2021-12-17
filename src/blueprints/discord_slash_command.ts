import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction } from "discord.js";

export default interface DiscordSlashCommand {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
	execute(interaction: CommandInteraction<CacheType>): Promise<void>;
}
