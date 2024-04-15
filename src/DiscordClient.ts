import { Client, TextChannel, Intents } from "discord.js";

export enum MESSAGES {
  UPDATE = "Ya boy is back and better than ever\nFor change notes, ask <@677740656747216916>",
  PUZZLE = "Hey fellas! The NYT mini crossword just updated! Go get 'em!\nhttps://www.nytimes.com/crosswords/game/mini",
  GOML = "GET ON HIS LEVEL",
}

class DiscordClient extends Client {
  static CHANNEL_IDS = {
    CHANGELOG: process.env.CHANGELOG_CHANNEL || "",
    MAIN: process.env.CHANNEL || "",
  };

  constructor() {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT,
      ],
    });
  }

  sendMessage = async (message: MESSAGES, channelId: string) => {
    const hasValidChannels =
      this.isValidChannel(DiscordClient.CHANNEL_IDS.CHANGELOG) && this.isValidChannel(DiscordClient.CHANNEL_IDS.MAIN);
    const channelIdMatches =
      channelId === DiscordClient.CHANNEL_IDS.CHANGELOG || channelId === DiscordClient.CHANNEL_IDS.MAIN;
    if (hasValidChannels && channelIdMatches) {
      const channel = await this.channels.fetch(channelId);
      (channel as TextChannel)?.send(message);
    }
  };

  parseMessage = (message: string): string => {
    return message.toLowerCase().trim();
  };

  isValidChannel = (channelId: string): boolean => {
    // channel ids seem to always be 18 length
    return channelId.length === 18;
  };
}

export default DiscordClient;
