module.exports = {
  removeCommand: (msg) => {
    const words = msg.split(' ');
    if (words[0].startsWith('!')) words.shift();
    return words.join(' ');
  },
};
