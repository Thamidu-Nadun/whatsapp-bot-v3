require("dotenv").config();
const axios = require("axios");
const { MessageMedia } = require("whatsapp-web.js");
const { sended } = require("../utils/console-logger");
const { writeLog } = require("../utils/logger-v2");

module.exports = {
  name: "img",
  description: "Get images from Unsplash",
  async execute({ msg, args }) {
    if (!args.length) {
      msg.reply("Please provide a search term.");
      console.log(sended("Please provide a search term.", msg?._data?.to));
      writeLog(
        "img",
        "ERROR",
        `User ${msg?._data?.from} did not provide a search term.`,
      );
      return;
    }

    const unsplashUrl = "https://api.unsplash.com/search/photos";
    const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_KEY;
    const imageCount = parseInt(process.env.IMAGE_COUNT) || 1;

    const searchTerm = args.join(" ") || "nature";

    try {
      const imageResponse = await axios.get(unsplashUrl, {
        params: { query: searchTerm, per_page: imageCount },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });

      const images = imageResponse.data.results;

      if (images.length === 0) {
        msg.reply("No images found for your search term.");
        writeLog(
          "img",
          "ERROR",
          `User ${msg?._data?.from} did not find any images for the search term: ${searchTerm}`,
        );
        return;
      }

      for (let i = 0; i < images.length; i++) {
        const imageUrl = images[i]?.urls?.regular;
        if (imageUrl) {
          const imgMedia = await MessageMedia.fromUrl(imageUrl, {
            unsafeMime: true,
          });
          await msg.reply(imgMedia);
          console.log(sended(imgMedia, msg?._data?.to));
          writeLog(
            "img",
            "INFO",
            `User ${msg?._data?.from} received image ${i + 1} for the search term: ${searchTerm}`,
          );
        }
      }
    } catch (error) {
      console.error(error);
      msg.reply("There was an error fetching the images.");
      console.log(
        sended("There was an error fetching the images.", msg?._data?.to),
      );
      writeLog(
        "img",
        "ERROR",
        `User ${msg?._data?.from} encountered an error while fetching images.`,
      );
    }
  },
};
