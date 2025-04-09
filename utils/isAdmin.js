module.exports = {
    name: "admin",
    description: "Admin commands",
    async execute({ msg, client }) {
        const clientNumber = client.info.wid._serialized; // format: "123456789@c.us"
        const senderNumber = msg.from;

        if (senderNumber === clientNumber) {
            // await msg.reply("✅ You are the bot owner.");
            return true;
        } else {
            // await msg.reply("❌ You are not authorized to use this command.");
            return false;
        }
    }
};
