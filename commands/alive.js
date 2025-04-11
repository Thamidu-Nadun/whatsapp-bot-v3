module.exports = {
  name: "alive",
  description: "Check if the bot is alive",
  async execute({ msg }) {
    const aliveMessage = "🤖 *I'm alive!*";
    await msg.reply(aliveMessage);
  },
};
