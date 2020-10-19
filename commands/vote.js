require('dotenv').config();
const admin = require('firebase-admin');
const { removeCommand } = require('../utils');
const serviceAccount = require('../firebase-service-id.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://discord-werewolf.firebaseio.com',
});

const db = admin.database();
const ref = db.ref('games');
ref.once('value', function(snapshot) {
  console.log(snapshot.val());
});

module.exports = {
  name: '!vote',
  description: 'Submits a vote',
  execute: (msg, args) => {
    console.log(msg);
    msg.reply(removeCommand(msg.content));
  },
};
