import { DMChannel, TextBasedChannel } from "discord.js";
import goml from "../../src/commands/Goml";
import DiscordClient from "../../src/DiscordClient";

describe("Goml", () => {
  const discordClient = new DiscordClient();
  const sendMock = jest.fn();
  discordClient.sendMessage = sendMock;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("goml", () => {
    describe("should not send a message", () => {
      test("when a 'goml' message was sent in a DM.", async () => {
        const channel: Partial<DMChannel> = {};
        await goml(discordClient, <DMChannel>channel);
        expect(sendMock).not.toHaveBeenCalled();
      });

      test("when a 'goml' message was not sent in the 'main' channel.", async () => {
        // I think the fact that I have to define `valueOf` here is a bug
        // or I'm just not understanding something about how `Partial` works here.
        const channel = {
          id: DiscordClient.CHANNEL_IDS.MAIN + "foo",
          valueOf: () => {
            return "why";
          },
        } as TextBasedChannel;
        await goml(discordClient, channel);
        expect(sendMock).not.toHaveBeenCalled();
      });
    });

    describe("should send a message", () => {
      test("when a 'goml' message was sent in the 'main' channel.", async () => {
        // Again more weirdness with `valueOf` and partial type definition here.
        const channel = {
          id: DiscordClient.CHANNEL_IDS.MAIN,
          valueOf: () => {
            return "why";
          },
        } as TextBasedChannel;
        await goml(discordClient, channel);
        expect(sendMock).toHaveBeenCalled();
      });
    });
  });
});
