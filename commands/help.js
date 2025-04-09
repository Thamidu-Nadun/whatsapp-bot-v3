module.exports = {
  name: "help",
  description: "List all available commands",
  async execute(msg, args, commands) {
    let helpMessage = "📜 *Available Commands:*\n\n";
    commands.forEach((cmd) => {
      helpMessage += `/${cmd.name} - ${cmd.description}\n`;
    });

    await msg.reply(helpMessage);
  },
};
