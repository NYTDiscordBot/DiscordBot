import { DMChannel, NewsChannel, TextChannel } from "discord.js";
import DiscordClient, { MESSAGES } from "../DiscordClient";

async function goml(client: DiscordClient, channel: DMChannel | TextChannel | NewsChannel): Promise<void> {
  if (channel instanceof DMChannel || channel.id !== DiscordClient.CHANNEL_IDS.MAIN) return;

  await client.sendMessage(MESSAGES.GOML, DiscordClient.CHANNEL_IDS.MAIN);
}

export default goml;
