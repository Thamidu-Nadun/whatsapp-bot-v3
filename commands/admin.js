const isAdmin = require("../utils/isAdmin");

module.exports = {
  name: "admin",
  description: "Admin commands",
  async execute({ msg, args, commands, client }) {
    const admin = await isAdmin.execute({ msg: msg, args: args, commands: commands, client: client });
    console.log(admin);
    if (admin) {
      if (args.length === 0) {
        await msg.reply("✅ You are the bot owner.");
        return 0;
      } else {
        console.log(args[0]);
        if (args[0] === "test") {
          msg.reply("✅ TODO: Admin Commands.");
        }
      }
      return true;
    } else {
      await msg.reply("❌ You are not authorized to use this command.");
      return false;
    }
  },
};
