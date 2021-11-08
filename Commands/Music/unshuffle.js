const Command = require('../../Class/ClassCommand.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const { Message, MessageEmbed } = require('discord.js');
const { Player } = require('erela.js');

module.exports = class UnshuffleCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'unshuffle',
      commandAliases: [],
      commandDescription: 'Ordena nuevamente la lista de reproducción.',
      commandUsage: 'unshuffle',
      commandUsageExample: 'unshuffle',
      commandCategory: 'music',
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
      const voiceChannel = message.member.voice.channelId;
      /**
       * @type {Player}
       */
      const player = await client._manager.players.get(message.guild.id);
      const channel = message.member.voice.channelId;

      if (!voiceChannel) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted tiene que estar dentro de un canal de voz para usar este comando.`,
          false
        );
      }

      if (!player) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} No hay ninguna canción que esté sonando actualmente en este servidor.`,
          false
        );
      }

      if (!player.queue.current) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} No hay ninguna canción que esté sonando actualmente en este servidor.`,
          false
        );
      }

      if (channel !== player.voiceChannel) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted tiene que estar en el mismo canal de voz que yo para usar ese comando.`,
          false
        );
      }

      if (!player.get('beforeshuffle')) {
        return _errorEmbed(
          message,
          client._colors.red,
          `Comando \`${this.information.name}\``,
          `${client._emojis.no_entry_sign} La lista de canciones no ha sido revuelta con anterioridad.`,
          false
        );
      }

      player.queue.clear();

      for (const track of player.get('beforeshuffle')) {
        player.queue.add(track);
      }

      const embed_success = new MessageEmbed()
        .setTitle('> Lista de reproducción')
        .setColor(client._color)
        .setDescription(
          'La lista de canciones fue organizada de forma exitosa.'
        );

      message.channel.send({
        embeds: [embed_success],
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
