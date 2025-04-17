require("dotenv").config();
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const { from_to } = require("./utils/console-logger");

const commands = new Map();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

const client = new Client({
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  // Comment this line to use the default session
  authStrategy: new LocalAuth({
    dataPath: "./auth",
  }),
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("message_create", async (msg) => {
  if (!msg.fromMe) {
    console.log(msg.body);
  }

  if (!msg.body.startsWith("/")) return;

  const args = msg.body.slice(1).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = commands.get(commandName);

  if (!command) return;

  try {
    if (command.execute.constructor.name === "AsyncFunction") {
      from_to(msg?._data?.from, msg?._data?.to);

      await command.execute({
        msg: msg,
        args: args,
        commands: commands,
        client: client,
      });
    } else {
      from_to(msg?._data?.from, msg?._data?.to);

      command.execute({
        msg: msg,
        args: args,
        commands: commands,
        client: client,
      });
    }
  } catch (error) {
    console.error(error);
    msg.reply("There was an error executing that command.");
  }
});

client.initialize();
