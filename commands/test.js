module.exports = {
  name: "test",
  description: "Test command to check if the bot is working",
  async execute() {
    console.log("Hello from the test command!");
    return 0;
  },
};
