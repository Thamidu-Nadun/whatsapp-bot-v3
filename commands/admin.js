module.exports = {
    name: "admin",
    description: "Admin commands",
    async execute(msg, args, commands, client) {
        const clientNumber = client.info.wid._serialized; // bot's number in full ID format like "123456789@c.us"
        const senderNumber = msg.from; // sender's number in the same format

        if (senderNumber === clientNumber) {
            await msg.reply("✅ You are the bot owner.");
            return true;
        } else {
            await msg.reply("❌ You are not authorized to use this command.");
            return false;
        }
    }
};
