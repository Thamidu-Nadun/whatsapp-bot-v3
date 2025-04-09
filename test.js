const fs = require("fs");
const path = require("path");

const commands = new Map();
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));

// console.log(commandFiles)

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}
// console.log(commands)
var str = "";
commands.forEach((x) => {
  // console.log(x.name + ' -> ' + x.description)
  str += x.name + " -> " + x.description + "\n";
  // console.log(x.execute)
});

console.log(str);

// const val = commands.get('test');
// console.log(val.execute.constructor.name);

// alive -> description
