const { Manager } = require('erela.js');
const Spotify = require('erela.js-spotify');
const Deezer = require('erela.js-deezer');
const Facebook = require('erela.js-facebook');
const AppleMusic = require('erela.js-apple');
const Filters = require('erela.js-filters');

async function loadMusicUtitaries(client) {
  client._manager = new Manager({
    clientName: 'ScuttleMusic',
    nodes: [
      {
        host: 'localhost',
        port: 2333,
        password: 'lavalink1234',
      },
    ],
    plugins: [
      new Spotify({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      }),
      new Deezer(),
      new Facebook(),
      new AppleMusic(),
      new Filters(),
    ],
    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  });
  const Read = require('util').promisify(require('fs').readdir);
  const Events = await Read('./Events/Music');
  Events.forEach((e) => {
    e = e.split('.');
    client._manager.on(e[0], (...args) =>
      new (require(`../Events/Music/${e[0]}.js`))(client).run(...args)
    );
  });
}

module.exports = loadMusicUtitaries;
