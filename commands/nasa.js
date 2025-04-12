const axios = require("axios");
const { MessageMedia } = require("whatsapp-web.js");
const { writeLog } = require("../utils/logger-v2");
require("dotenv").config();

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_URI = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

async function fetchNasaData() {
  try {
    const response = await axios.get(NASA_URI);
    return response.data;
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    return null;
  }
}
module.exports = {
  name: "nasa",
  description: "Get NASA image of the day",
  async execute({ msg }) {
    const data = await fetchNasaData();
    if (!data) {
      return msg.reply("Failed to fetch data from NASA.");
    }
    const caption = `*\`\`\`Astronomy Picture of the Day\`\`\`*\n*${data.title}*\n${data.date}_\n\n${data.explanation}\n\n> --nasa--`;

    const media = await MessageMedia.fromUrl(data.url, {
      unsafeMime: true,
    });
    msg.reply(media, null, {
      caption: caption,
    });
    writeLog(
      "nasa",
      "INFO",
      `User ${msg?._data?.from} fetched NASA image of the day: "${data.title}"`,
    );
  },
};
