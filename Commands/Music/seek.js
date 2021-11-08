const Command = require('../../Class/ClassCommand.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const { Message, MessageEmbed } = require('discord.js');
const { Player } = require('erela.js');

module.exports = class SeekCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'seek',
      commandAliases: [],
      commandDescription: 'Mueve de posición la canción.',
      commandUsage: 'seek [segundos]',
      commandUsageExample: 'seek 120',
      commandCategory: 'music',
      commandCooldown: 5,
      commandPermissionsBot: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],
      commandPermissionsUser: [],
      onlyNsfwChat: false,
      argsReq: true,
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

      if (!args[0]) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted tiene que ingresar el segundo al que desea mover la canción.`,
          true,
          'Uso correcto:',
          `${await client._guildPrefix(message)}${
            this._information.commandUsage
          }`
        );
      }

      if (isNaN(Number(args[0]))) {
        const embed_error = new MessageEmbed()
          .setColor(client._colors.red)
          .setDescription(
            `${client._emojis.no_entry_sign} Usted tiene que ingresar una cantidad/número válido.`
          );

        return message.channel.send({
          embeds: [embed_error],
        });
      }

      if (
        Number(args[0]) < 0 ||
        Number(args[0]) > player.queue.current.duration / 1000
      ) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${
            client._emojis.no_entry_sign
          } Usted tiene que ingresar una cantidad que no supere la duración del video.\nPuede ingresar desde **0** hasta los **${
            player.queue.current.duration / 1000
          }** segundos.`,
          false
        );
      }

      player.seek(Number(args[0]) * 1000);

      const embed_success = new MessageEmbed()
        .setTitle('> Lista de reproducción')
        .setColor(client._color)
        .setDescription(
          `La posición de la canción se movió a: **${_format(
            Number(args[0]) * 1000
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
