require("dotenv").config();
const axios = require("axios");
const { MessageMedia } = require("whatsapp-web.js");
const { sended } = require("../utils/console-logger");
const { logger } = require("../utils/logger");

module.exports = {
  name: "img",
  description: "Get images from Unsplash",
  async execute({ msg, args }) {
    if (!args.length) {
      msg.reply("Please provide a search term.");
      console.log(sended("Please provide a search term.", msg?._data?.to));
      logger(`Please provide a search term.`, msg?._data?.to);
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
        logger(
          `No images found for your search term: ${searchTerm}`,
          msg?._data?.to,
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
          logger(`Image ${i + 1} sent: ${imageUrl}`, msg?._data?.to);
        }
      }
    } catch (error) {
      console.error(error);
      msg.reply("There was an error fetching the images.");
      console.log(
        sended("There was an error fetching the images.", msg?._data?.to),
      );
      logger(`Error fetching images: ${error.message}`, msg?._data?.to);
    }
  },
};
