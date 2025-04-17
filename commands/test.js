const { writeLog } = require("../utils/logger-v2");

module.exports = {
  name: "test",
  description: "Test command to check if the bot is working",
  async execute() {
    console.log("Hello from the test command!");
    writeLog("TEST", "DEBUG", "Test command executed successfully.");
    return 0;
  },
};
