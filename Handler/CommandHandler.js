async function loadCommands(client) {
  const Read = require('util').promisify(require('fs').readdir);
  const Commands = await Read('./Commands');
  Commands.forEach(async (cmds) => {
    const commands = await Read('./Commands/' + cmds);
    commands
      .filter((cmd) => cmd.split('.').pop() === 'js')
      .forEach(async (cmd) => {
        let log = await client._loader('./Commands/' + cmds, cmd);
        if (log) console.log(log);
      });
  });
}

module.exports = loadCommands;
