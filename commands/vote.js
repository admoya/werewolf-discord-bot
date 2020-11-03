require('dotenv').config();
const {
  getMentionedUser,
  getMsgAuthorId,
  getMsgAuthorUsername,
  getDBRef,
} = require('../utils');

module.exports = {
  name: '!vote',
  description: 'Submits a vote',
  execute: (msg) => {
    const { channel } = msg;
    const { parent: parentChannel } = channel;
    if (!parentChannel) { // TODO: add some validation that this is in a game
      msg.reply('You can\'t vote from here');
      return;
    }

    const votes = getDBRef(`games/${parentChannel.name}/${channel.name}/votes`);
    const voter = {
      id: getMsgAuthorId(msg),
      username: getMsgAuthorUsername(msg),
    };
    const votee = getMentionedUser(msg);
    if (!votee) {
      msg.reply('you need to tag someone to vote for them');
      return;
    }
    if (votee.bot) {
      msg.reply('you must vote for a human');
      return;
    }
    const vote = {
      voter,
      votee: { id: votee.id, username: votee.username},
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    };
    votes.push(vote, () => {
      msg.react('🗳️');
      msg.reply('you have voted for ' + votee)
    });
  },
};
