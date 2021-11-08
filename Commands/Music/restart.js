const Command = require('../../Class/ClassCommand.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class RestartCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'restart',
      commandAliases: [],
      commandDescription: 'Reinicia la canción al segundo 0.',
      commandUsage: 'restart',
      commandUsageExample: 'restart',
      commandCategory: 'music',
      commandCooldown: 5,
      commandPermissionsBot: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],
      commandPermissionsUser: ['MANAGE_GUILD'],
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

      if (!message.member.permissions.has('MANAGE_GUILD')) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted no tiene el permiso necesario para el uso de este comando.`,
          true,
          'Permiso requerido:',
          'Manage guild'
        );
      }
      player.seek(Number(0) * 1000);

      const embed_success = new MessageEmbed()
        .setTitle('> Lista de reproducción')
        .setColor(client._color)
        .setDescription(
          `La posición de la canción se movió a: **${_format(
            Number(0) * 1000
          )}**.`
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

function _format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
      m = Math.floor(millis / 60000),
      s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1)
      return (
        (m < 10 ? '0' : '') +
        m +
        ':' +
        (s < 10 ? '0' : '') +
        s +
        ' | ' +
        Math.floor(millis / 1000) +
        ' segundos'
      );
    else
      return (
        (h < 10 ? '0' : '') +
        h +
        ':' +
        (m < 10 ? '0' : '') +
        m +
        ':' +
        (s < 10 ? '0' : '') +
        s +
        ' | ' +
        Math.floor(millis / 1000) +
        ' segundos'
      );
  } catch (error) {
    console.log(e.message);
  }
}
