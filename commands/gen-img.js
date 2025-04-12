// const { default: axios } = require("axios");
const consoleLogger = require("../utils/console-logger");
const { logger } = require("../utils/logger");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
  name: "gen-img",
  description: "Generate an image based on a prompt",
  async execute({ msg, args }) {
    const URI = "https://image.pollinations.ai/prompt/";
    const prompt = args.join(" ");
    const url = `${URI}${prompt}`;

    try {
      // const img_response = await axios.get(url);
      const image = await MessageMedia.fromUrl(url, { unsafeMime: true });
      if (image) {
        msg.reply(image, null, {
          caption: `Here is your image for the prompt: "${prompt}"`,
        });
        consoleLogger.sended(
          `Here is your image for the prompt: "${prompt}"`,
          msg?._data?.to,
        );
        logger(`Image sent for prompt: "${prompt}"`, msg?._data?.to);
      }
    } catch (error) {
      console.error(error);
      msg.reply("There was an error fetching the image.");
      consoleLogger.sended(
        "There was an error fetching the image.",
        msg?._data?.to,
      );
      logger(`Error fetching image: ${error.message}`, msg?._data?.to);
      return;
    }
  },
};
