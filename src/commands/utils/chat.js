const { SlashCommandBuilder } = require('discord.js');
const openai = require("../../config/openAIConfig");
module.exports = {
	data: new SlashCommandBuilder()
	.setName('chat')
	.setDescription('Interaction with bard AI')
	.addStringOption(option =>
		option.setName('message')
			.setDescription('The input to echo back')
			.setRequired(true)
	),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.deferReply();
		const question = interaction.options.getString("message");
		const messages = [
			{
				role: "system",
				content: "Give a short answer to the question 1 paragraph with 10 sententece maximum.",	
			},
			{
				role: "user",
				content:question,
			},
		];

		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: messages,
			temperature: 0.5,
		});
		const advice = completion.data.choices[0].message.content;
		await interaction.editReply(advice);
	},
  };