const Command = require('../../Class/ClassCommand.js');
const {
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} = require('discord.js');

module.exports = class InviteCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'invite',
      commandAliases: [],
      commandDescription: '¿Te gusto?.',
      commandUsage: 'invite',
      commandUsageExample: 'invite',
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
          // .setEmoji("😳")
          .setStyle('LINK')
          .setLabel('Invitación')
          .setURL('https://invite.scuttlecrab.ml/')
      );

      const embed_success = new MessageEmbed()
        .setTitle('> ¡Genial!')
        .setDescription('Gracias por invitarme! Espero disfrutes de mí.')
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
