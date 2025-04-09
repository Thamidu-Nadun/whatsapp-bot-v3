module.exports = {
  name: "echo",
  description: "Echo the input text",
  async execute(msg, { args }) {
    await msg.reply(args.join(" ") || "Nothing to echo.");
  },
};
