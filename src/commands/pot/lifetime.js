const { SlashCommandBuilder } = require('discord.js');
const { getPot } = require('../../api/pot');
const { stageWagerPost } = require('../../util/post');

const data = new SlashCommandBuilder()
  .setName('pot-lifetime')
  .setDescription('Replies with Tezos Pepe Prize Pot lifetime statistics.');

const execute = async (interaction) => {
  const potStatistics = await getPot();
  const post = stageWagerPost('Pepe Prize Pot Lifetime Statistics (top 25) 🐸', potStatistics);

  await interaction.reply(post);
};

module.exports = {
  data,
  execute,
};
