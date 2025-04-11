const { logger } = require("../utils/logger");

module.exports = {
  name: "test",
  description: "Test command to check if the bot is working",
  async execute() {
    console.log("Hello from the test command!");
    logger("Test command executed successfully.");
    return 0;
  },
};
