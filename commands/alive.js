const { sended, from_to } = require("../utils/console-logger");
const { writeLog } = require("../utils/logger-v2");

module.exports = {
  name: "alive",
  description: "Check if the bot is alive",
  async execute({ msg }) {
    const aliveMessage = "🤖 *I'm alive!*";
    await msg.reply(aliveMessage);
    console.log(sended("✅ Bot is alive!", msg?._data?.to));
    writeLog(
      "alive",
      "INFO",
      `User ${msg?._data?.from} checked if the bot is alive.`,
    );
  },
};
