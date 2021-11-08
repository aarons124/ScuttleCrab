const Command = require('../../Class/ClassCommand.js');
const {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');

module.exports = class VoteCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'vote',
      commandAliases: [],
      commandDescription: 'Vota por mí.',
      commandUsage: 'vote',
      commandUsageExample: 'vote',
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
      const btn = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle('LINK')
          .setLabel('Top.gg')
          .setURL('https://top.gg/bot/855554329897336852/vote'),
        new MessageButton()
          .setStyle('LINK')
          .setLabel('Discord.boats')
          .setURL('https://discord.boats/bot/855554329897336852/vote')
      );

      const embed_success = new MessageEmbed()
        .setTitle('> ¡Increíble!')
        .setColor(client._color)
        .setDescription(
          `${client._emojis.partying_face} Agradezco que quieras votar por mí, puedes hacerlo cada 12 horas.`
        );
      message.channel.send({
        embeds: [embed_success],
        components: [btn],
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
