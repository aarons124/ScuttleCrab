const Command = require('../../Class/ClassCommand.js');
const {
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} = require('discord.js');

module.exports = class SupportCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'support',
      commandAliases: [],
      commandDescription:
        '¿Necesitas ayuda especial? Únete al servidor de soporte.',
      commandUsage: 'support',
      commandUsageExample: 'support',
      commandCategory: 'utility',
      commandCooldown: 3,
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
          // .setEmoji(client._emojis.face_with_monocle)
          .setStyle('LINK')
          .setLabel('Soporte')
          .setURL('https://discord.gg/pE6efwjXYJ')
      );

      const embed_success = new MessageEmbed()
        .setTitle('> Servidor de soporte')
        .setDescription(
          'Si tienes dudas o quieres reportar un error respecto al Bot, puedes unirte al servidor de soporte y en el canal <#903135230511173642> puedes hacerlo.'
        )
        .setColor(client._color);
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
