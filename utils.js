module.exports = {
  removeCommand: (msg) => {
    const words = msg.split(' ');
    if (words[0].startsWith('!')) words.shift();
    return words.join(' ');
  },

  getMentionedUser: (msg) => {
    if (msg.mentions.users.size > 1) {
      console.log('More than 1 mention in the message, using the first only!');
    } else if (!msg.mentions.users) {
      console.log('No mentioned users found!');
      return null;
    }
    const user = msg.mentions.users.values().next().value;
    console.log('Mentioned User: ' + user);
    return user;
  },

  getMsgAuthorUsername: (msg) => {
    return msg.author.username;
  },

  getMsgAuthorId: (msg) => {
    return msg.author.id;
  },
};
