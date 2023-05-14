const { SlashCommandBuilder } = require('discord.js');
const { getPot } = require('../../api/pot');
const { getStartOfDay } = require('../../util/date');
const { stageWagerPost } = require('../../util/post');

const data = new SlashCommandBuilder()
  .setName('pot-daily')
  .setDescription('Replies with Tezos Pepe Prize Pot statistics for the current day.');

const execute = async (interaction) => {
  const potStatistics = await getPot(getStartOfDay().toISOString());

  const postHeader = `Pepe Prize Pot Daily Statistics 🐸\n${getStartOfDay().toUTCString()}`;

  const post = stageWagerPost(postHeader, potStatistics);

  await interaction.reply(post);
};

module.exports = {
  data,
  execute,
};
