const { removeCommand } = require('../utils');
module.exports = {
  name: '!echo',
  description: 'Replies with the same message',
  execute: (msg, args) => {
    console.log(msg);
    msg.reply(removeCommand(msg.content));
  },
};

