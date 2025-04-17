const { sended } = require("../utils/console-logger");
const { writeLog } = require("../utils/logger-v2");

module.exports = {
  name: "help",
  description: "List all available commands",
  async execute({ msg, commands }) {
    let helpMessage = "📜 *Available Commands:*\n\n";
    commands.forEach((cmd) => {
      helpMessage += `/*${cmd.name}* - ${cmd.description}\n`;
    });

    await msg.reply(helpMessage);
    console.log(sended(helpMessage, msg?._data?.to));
    writeLog(
      "help",
      "INFO",
      `User ${msg?._data?.from} requested the list of available commands.`,
    );
  },
};
