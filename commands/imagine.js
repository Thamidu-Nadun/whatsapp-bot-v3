const consoleLogger = require("../utils/console-logger");
const { logger } = require("../utils/logger");
const { MessageMedia } = require("whatsapp-web.js");
const { writeLog } = require("../utils/logger-v2");

module.exports = {
  name: "imagine",
  description: "Generate an image based on a prompt",
  async execute({ msg, args }) {
    const URI = "https://image.pollinations.ai/prompt/";
    const prompt = args.join(" ");
    const url = `${URI}${prompt}`;

    try {
      const image = await MessageMedia.fromUrl(url, { unsafeMime: true });
      if (image) {
        msg.reply(image, null, {
          caption: `Here is your image for the prompt: *"${prompt}"*`,
        });
        consoleLogger.sended(
          `Here is your image for the prompt: "${prompt}"`,
          msg?._data?.to,
        );
        logger(`Image sent for prompt: "${prompt}"`, msg?._data?.to);
        writeLog(
          "imagine",
          "INFO",
          `User ${msg?._data?.from} generated an image for the prompt: "${prompt}"`,
        );
      }
    } catch (error) {
      console.error(error);
      msg.reply("There was an error fetching the image.");
      consoleLogger.sended(
        "There was an error fetching the image.",
        msg?._data?.to,
      );
      logger(`Error fetching image: ${error.message}`, msg?._data?.to);
      writeLog(
        "imagine",
        "ERROR",
        `User ${msg?._data?.from} encountered an error while generating an image.`,
      );
      return;
    }
  },
};
