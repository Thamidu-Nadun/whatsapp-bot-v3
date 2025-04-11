module.exports = {
  name: "admin",
  description: "Admin commands",
  async execute({ msg, client }) {
    const clientNumber = client.info.wid._serialized; // format: "123456789@c.us"
    const senderNumber = msg.from;

    if (senderNumber === clientNumber) {
      return true;
    } else {
      return false;
    }
  },
};
