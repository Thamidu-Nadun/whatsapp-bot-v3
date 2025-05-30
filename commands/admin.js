const isAdmin = require("../utils/isAdmin");
const { sended } = require("../utils/console-logger");
const { writeLog } = require("../utils/logger-v2");

module.exports = {
  name: "admin",
  description: "Admin commands",
  async execute({ msg, args, commands, client }) {
    const admin = await isAdmin.execute({
      msg: msg,
      args: args,
      commands: commands,
      client: client,
    });
    console.log(admin);
    if (admin) {
      if (args.length === 0) {
        await msg.reply("✅ You are the bot owner.");
        console.log(sended("✅ You are the bot owner.", msg?._data?.to));
        writeLog(
          `${commands}`,
          "INFO",
          `User ${msg?._data?.from} is the bot owner.`,
        );

        return 0;
      } else {
        console.log(args[0]);
        if (args[0] === "test") {
          msg.reply("✅ TODO: Admin Commands.");
          console.log(sended("✅ TODO: Admin Commands.", msg?._data?.to));
          writeLog(
            `${commands}`,
            "INFO",
            `User ${msg?._data?.from} is testing admin commands.`,
          );
        }
      }
      return true;
    } else {
      await msg.reply("❌ You are not authorized to use this command.");
      console.log(
        sended(
          "❌ You are not authorized to use this command.",
          msg?._data?.to,
        ),
      );
      writeLog(
        `${commands}`,
        "ERROR",
        `User ${msg?._data?.from} is not authorized to use this command.`,
      );
      return false;
    }
  },
};
