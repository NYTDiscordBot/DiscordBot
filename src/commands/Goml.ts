import { TextBasedChannel } from "discord.js";
import DiscordClient, { MESSAGES } from "../DiscordClient";

async function goml(client: DiscordClient, channel: TextBasedChannel): Promise<void> {
  if (channel.id !== DiscordClient.CHANNEL_IDS.MAIN) {
    console.log("channel isn't in our list of valid channels so skipping");
    return;
  }

  await client.sendMessage(MESSAGES.GOML, DiscordClient.CHANNEL_IDS.MAIN);
}

export default goml;
