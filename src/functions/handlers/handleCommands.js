//reads the files and dynamicly
const fs = require('fs');
//to register the commands
const { REST, Routes } = require('discord.js');
module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

        const {commands, commandArray} = client;
        for(const file of commandFiles){
            const command = require(`../../commands/${folder}/${file}`);
            commands.set(command.data.name, command);
            commandArray.push(command.data.toJSON());
        }
    }

    const clientId='1105878851600519300';
    const guildId = '755630204436611112';
    const rest = new REST().setToken(process.env.token);

    try {
      console.log(`Started refreshing application (/) commands.`);
      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: client.commandArray, }
      );
      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }

  };
};
