const {
  codeBlock, bold,
} = require('discord.js');
const { wagersToTextList } = require('./wagers');

const generatePost = (header, content) => {
  const postHeader = bold(header);

  const post = `${postHeader}${codeBlock(content)}`;
  return post;
};

const stageWagerPost = (header, potStatistics) => {
  const { wagers, totalBurned } = potStatistics;
  const wagerList = wagersToTextList(wagers);

  const postContent = `Burned: ${totalBurned}\n\n${wagerList}`;
  const post = generatePost(header, postContent);

  return post;
};

const stageTokenPost = (header, tokenStatistics) => {
  const { holders, price } = tokenStatistics;

  const postContent = `Price: ${price}ꜩ\nHolders: ${holders}`;
  const post = generatePost(header, postContent);

  return post;
};

module.exports = {
  generatePost,
  stageWagerPost,
  stageTokenPost,
};