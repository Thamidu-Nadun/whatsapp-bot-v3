require('dotenv').config();
const axios = require('axios');
const { MessageMedia } = require("whatsapp-web.js");


module.exports = {
    name: "fruit",
    description: "Get a fruit image",
    async execute({ msg, args }) {
        if (!args.length) {
            msg.reply("Please provide a fruit name.");
            return;
        }

        const unsplashUrl = "https://api.unsplash.com/search/photos";
        const fruityViceUrl = "https://www.fruityvice.com/api/fruit/";

        const fruit_name = args[0] || "banana";
        const fruitUrl = fruityViceUrl + fruit_name;

        const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_KEY;

        try {
            // Fetch fruit data from FruityVice API
            const fruitResponse = await axios.get(fruitUrl);
            let { name, family, genus, order, nutritions } = fruitResponse.data;
            const fruitData = `
            --------------------------
            Name: *${name}*\n
            Family: ${family}\n
            Genus: ${genus}\n
            Order: ${order}\n
            Other Information:\n
            \tCalories: ${nutritions?.calories} calories\n
            \tCarbohydrates: ${nutritions?.carbohydrates} carbohydrates\n
            \tProtein: ${nutritions?.protein} protein\n
            \tFat: ${nutritions?.fat} fat\n
            \tSugar: ${nutritions?.sugar} sugar\n
            --------------------------
            `;

            // Fetch fruit Image From Unsplash
            const imageResponse = await axios.get(unsplashUrl, {
                params: { query: fruit_name + " fruit", per_page: 1 },
                headers: {
                    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                },
            });
            let imageUrl = imageResponse.data.results[0]?.urls?.regular;

            // Send fruit data and image URL to the user
            const fruitMedia = await MessageMedia.fromUrl(imageUrl, {
                unsafeMime: true,
            });
            if (imageUrl) {
                msg.reply(fruitMedia, null, {
                    caption: fruitData,
                });
            } else {
                msg.reply(fruitData);
            }
        } catch (error) {
            console.error(error);
            msg.reply("There was an error fetching the fruit image.");
        }
    },
};
