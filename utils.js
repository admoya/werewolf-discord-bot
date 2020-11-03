const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceId');
// Set up firebase client
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://discord-werewolf.firebaseio.com',
});
const db = admin.database();
const refsMemo = {};
setInterval(() => { // Clean up refs every hour
  const deadRefsWalking = Object.keys(refsMemo).filter(({ killMeAt }) => killMeAt < Date.UTC());
  deadRefsWalking.forEach(key => delete refsMemo[key]);
}, 3.6e6)

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
    return user;
  },

  getMsgAuthorUsername: (msg) => {
    return msg.author.username;
  },

  getMsgAuthorId: (msg) => {
    return msg.author.id;
  },

  getDBRef: (path) => {
    if (!refsMemo[path]) {
      refsMemo[path] = db.ref(path);
      refsMemo[path].killMeAt = Date.UTC() + 8.64e7 // 24 hour life
    }
    return refsMemo[path];
  }
};
