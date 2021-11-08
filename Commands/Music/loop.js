const Command = require('../../Class/ClassCommand.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const { Message, MessageEmbed } = require('discord.js');
const { Player } = require('erela.js');

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'loop',
      commandAliases: [],
      commandDescription:
        'Activa el modo repetición, ya sea de la canción o de la lista de reproducción.',
      commandUsage: 'loop [song / queue / off]',
      commandUsageExample: 'loop song',
      commandCategory: 'music',
      commandCooldown: 3,
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
          `${client._emojis.no_entry_sign} Usted debe ingresar el modo de loop desee.`,
          true,
          'Uso correcto:',
          `${await client._guildPrefix(message)}${
            this._information.commandUsage
          }`
        );
      }

      switch (args[0]?.toLowerCase()) {
        case 'song':
        case 'track':
        case 's':
        case 't':
          if (player.trackRepeat) {
            player.setTrackRepeat(false);
          } else {
            player.setTrackRepeat(true);
          }
          if (player.queueRepeat) {
            player.setQueueRepeat(false);
          }
          const embedTrack = new MessageEmbed()
            .setColor(client._color)
            .setTitle('> Lista de reproducción')
            .setDescription(
              `El modo de repetición de la canción ahora está **${
                player.trackRepeat ? `Habilitado` : `Deshabilitado`
              }**.`
            );
          message.channel.send({ embeds: [embedTrack] });

          break;

        case 'queue':
        case 'qu':
        case 'q':
          if (player.queueRepeat) {
            player.setQueueRepeat(false);
          } else {
            player.setQueueRepeat(true);
          }
          if (player.trackRepeat) {
            player.setTrackRepeat(false);
          }

          const embedQueue = new MessageEmbed()
            .setColor(client._color)
            .setTitle('> Lista de reproducción')
            .setDescription(
              `El modo de repetición de la lista de canciones ahora está **${
                player.queueRepeat ? `Habilitado` : `Deshabilitado`
              }**.`
            );
          message.channel.send({ embeds: [embedQueue] });

          break;

        case 'off':
          if (player.queueRepeat) {
            player.setQueueRepeat(false);
          }
          if (player.trackRepeat) {
            player.setTrackRepeat(false);
          }
          const embedOff = new MessageEmbed()
            .setColor(client._color)
            .setTitle('> Lista de reproducción')
            .setDescription(
              `El modo de repetición de la lista de canciones y de la canción ahora están **Deshabilitadas**.`
            );
          message.channel.send({ embeds: [embedOff] });

          break;
        default:
          _errorEmbed(
            message,
            client._colors.red,
            `> Comando __${client._capitalize(
              this._information.commandName
            )}__`,
            `${client._emojis.no_entry_sign} Usted debe ingresar un modo válido.`,
            true,
            'Uso correcto:',
            `${await client._guildPrefix(message)}${
              this._information.commandUsage
            }`
          );
          break;
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
