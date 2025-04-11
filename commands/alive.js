const { sended, from_to } = require("../utils/console-logger");
const { logger } = require("../utils/logger");

module.exports = {
  name: "alive",
  description: "Check if the bot is alive",
  async execute({ msg }) {
    const aliveMessage = "🤖 *I'm alive!*";
    await msg.reply(aliveMessage);
    console.log(sended("✅ Bot is alive!", msg?._data?.to));
    logger(`✅ Bot is alive! to ${msg?._data?.to}`);
  },
};
