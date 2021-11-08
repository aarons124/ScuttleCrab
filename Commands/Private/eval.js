const Command = require('../../Class/ClassCommand.js');
const { Message, Util, Formatters } = require('discord.js');
const { inspect } = require('util');

module.exports = class EvalCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'eval',
      commandAliases: ['e', 'ev'],
      commandDescription: 'Evalua código JavaScript desde el Bot.',
      commandUsage: 'eval [código]',
      commandUsageExample: 'eval this.client',
      commandCategory: 'private',
      commandCooldown: 5,
      commandPermissionsBot: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],
      commandPermissionsUser: [],
      onlyNsfwChat: false,
      argsReq: true,
      voteReq: false,
      onlyDevs: true,
      isEnable: true,
    });
  }
  /**
   *
   * @param {Message} message
   * @param {String[]} args
   * @returns
   */
  async run(message, args) {
    /**
     * @type {import('../../Class/ClassClient')}
     */
    const client = this.client;
    try {
      if (!args[0])
        return message.channel.send({
          content: 'Debes ingresar algo para evaluar.',
        });

      let evaluated = eval(args.join(' '));
      if (evaluated instanceof Promise) {
        const m = message.channel.send({
          content: 'Evaluando la promesa...',
        });
        evaluated
          .then(async (e) => {
            let evaluated = e;
            if (typeof evaluated !== 'string')
              evaluated = inspect(evaluated, { depth: 0 });
            const arr = Util.splitMessage(evaluated, {
              maxLength: 1950,
              char: '',
            });
            (await m).edit({
              content: Formatters.codeBlock('js', arr[0]),
            });
          })
          .catch(async (e) => {
            let evaluated = e;
            if (typeof evaluated !== 'string')
              evaluated = inspect(evaluated, { depth: 0 });
            const arr = Util.splitMessage(evaluated, {
              maxLength: 1950,
              char: '',
            });
            (await m).edit({
              content: Formatters.codeBlock('js', arr[0]),
            });
          });
      } else {
        if (typeof evaluated !== 'string')
          evaluated = inspect(evaluated, { depth: 0 });
        const arr = Util.splitMessage(evaluated, {
          maxLength: 1950,
          char: '',
        });
        await message.channel.send({
          content: Formatters.codeBlock('js', arr[0]),
        });
      }
    } catch (error) {
      console.error(
        `[${String(this._information.commandName).toUpperCase()}] ${
          error.message
        }.`
      );

      message.channel.send({
        content: `A ocurrido un error. Aquí el debug:\n${client._markdown(
          error.message,
          'js'
        )}`,
      });
    }
  }
};
