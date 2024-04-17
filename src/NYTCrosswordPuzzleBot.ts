import * as dotenv from "dotenv";
dotenv.config();
import DiscordClient, { MESSAGES } from "./DiscordClient";
import Cron, { CRON_INTERVALS } from "./Cron";
import goml from "./commands/Goml";
import { ChannelType, Message } from "discord.js";
import { getErrorMessage } from "./utils";

const discordClient = new DiscordClient();

discordClient.login(process.env.TOKEN || "");

discordClient.on("ready", async () => {

  try {
    await discordClient.sendMessage(MESSAGES.UPDATE, DiscordClient.CHANNEL_IDS.CHANGELOG);
  } catch (e: unknown) {
    const error = getErrorMessage(e);
    console.log("log: Cannot send update message");
    console.log("error: ", error);
  }


  //NYT Crossword updates at 10PM EST on weekdays and 6PM EST on weekends
  Cron.startJob(CRON_INTERVALS.WEEKDAY, async () => {
    try {
      await discordClient.sendMessage(MESSAGES.PUZZLE, DiscordClient.CHANNEL_IDS.MAIN);
    } catch (e: unknown) {
      const error = getErrorMessage(e);
      console.log("log: Cannot send weekday puzzle message");
      console.log("error: ", error);
    }
  });

  Cron.startJob(CRON_INTERVALS.WEEKEND, async () => {
    try {
      await discordClient.sendMessage(MESSAGES.PUZZLE, DiscordClient.CHANNEL_IDS.MAIN);
    } catch (e: unknown) {
      const error = getErrorMessage(e);
      console.log("log: Cannot send weekend puzzle message");
      console.log("error: ", error);
    }
  });
});

discordClient.on("messageCreate", async (message: Message) => {
  const parsedMessage = discordClient.parseMessage(message.content);
  if (parsedMessage === "goml" && message.channel.type === ChannelType.GuildText) {
    try {
      await goml(discordClient, message.channel);
    } catch (e: unknown) {
      const error = getErrorMessage(e);
      console.log("log: Cannot send goml message");
      console.log("error: ", error);
    }
  }
});
