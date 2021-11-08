const Command = require('../../Class/ClassCommand.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const { Message, MessageEmbed } = require('discord.js');
const { Player } = require('erela.js');

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'volume',
      commandAliases: ['vl', 'v'],
      commandDescription:
        'Modifica el volumen de sonido para la Lista de reproducción.',
      commandUsage: 'volume (número)',
      commandUsageExample: 'volume 75',
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

      if (!args[0]) {
        const embed_noArgs = new MessageEmbed()
          .setTitle('> Lista de reproducción')
          .setColor(client._color)
          .setDescription(`**Volumen de sonido actual:** ${player.volume}%.`);

        return message.channel.send({
          embeds: [embed_noArgs],
        });
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

      if (Number(args[0]) < 0 || Number(args[0]) > 101) {
        const embed_invalid_number = new MessageEmbed()
          .setColor(client._colors.red)
          .setDescription(
            `${client._emojis.no_entry_sign} Usted tiene que ingresar un número mayor a **0** pero menor a **100**.`
          );
        return message.channel.send({
          embeds: [embed_invalid_number],
        });
      }

      player.setVolume(Number(args[0]));

      const embed_success = new MessageEmbed()
        .setTitle('> Lista de reproducción')
        .setColor(client._color)
        .setDescription(
          `El volumen de sonido ha sido modificado de forma exitosa.\n**Volumen actual:** ${player.volume}%.`
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
