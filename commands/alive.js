const { sended, from_to } = require("../utils/console-logger");

module.exports = {
  name: "alive",
  description: "Check if the bot is alive",
  async execute({ msg }) {
    // from_to(msg?._data?.from, msg?._data?.to);
    const aliveMessage = "🤖 *I'm alive!*";
    await msg.reply(aliveMessage);
    console.log(sended("✅ Bot is alive!", msg?._data?.to));
  },
};
