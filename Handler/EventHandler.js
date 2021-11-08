async function loadEvents(client) {
  const Read = require('util').promisify(require('fs').readdir);
  const Events = await Read('./Events/Client');
  try {
    Events.forEach((e) => {
      e = e.split('.');
      client.on(e[0], (...args) =>
        new (require(`../Events/Client/${e[0]}.js`))(client).run(...args)
      );
    });
  } catch (err) {
    console.error(`[EVENTHANDLER] ${err.message}`);
  }
}

module.exports = loadEvents;
