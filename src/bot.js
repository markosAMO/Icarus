require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

//The Guilds intent populates and maintains the guilds , channels and guild.roles caches, plus thread-related events.
const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

//obtain the folders of the /functions
const functionFolders = fs.readdirSync(`./src/functions`);
//obtain the files of those folders that ends in .js
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

    //pass a client to the file
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token); //client.login(token1||token2)
