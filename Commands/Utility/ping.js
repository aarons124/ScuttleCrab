const Command = require('../../Class/ClassCommand.js');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'ping',
      commandAliases: ['pong', 'latency'],
      commandDescription: 'Muestra que tan rápido va el bot.',
      commandUsage: 'ping',
      commandUsageExample: 'ping',
      commandCategory: 'utility',
      commandCooldown: 5,
      commandPermissionsBot: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],
      commandPermissionsUser: [],
      onlyNsfwChat: false,
      argsReq: false,
      voteReq: false,
      onlyDevs: false,
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
      const _embed = new MessageEmbed()
        .setColor(client._color)
        .setTitle('> ¡Pong!')
        .setDescription(
          [
            `**Bot Ping:** \`${client.ws.ping}ms\`.`,
            `**Message Ping:** \`${Date.now() - message.createdTimestamp}ms\`.`,
          ].join('\n')
        );

      message.channel.send({
        embeds: [_embed],
      });
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
