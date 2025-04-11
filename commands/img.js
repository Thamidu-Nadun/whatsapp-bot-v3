require('dotenv').config();
const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: "img",
    description: "Get images from Unsplash",
    async execute({ msg, args }) {
        if (!args.length) {
            msg.reply("Please provide a search term.");
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
                return;
            }

            for (let i = 0; i < images.length; i++) {
                const imageUrl = images[i]?.urls?.regular;
                if (imageUrl) {
                    const imgMedia = await MessageMedia.fromUrl(imageUrl, {
                        unsafeMime: true,
                    });
                    await msg.reply(imgMedia);
                }
            }
        } catch (error) {
            console.error(error);
            msg.reply("There was an error fetching the images.");
        }
    },
};
