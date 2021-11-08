const Command = require('../../Class/ClassCommand.js');
const _humanizePermisson = require('../../Functions/HumanizePermission');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'play',
      commandAliases: ['p'],
      commandDescription: 'Reproduce la canción que desees.',
      commandUsage: 'play [canción / url]',
      commandUsageExample: 'play George Michael - Careless Whisper',
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

      if (!voiceChannel) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted tiene que estar dentro de un canal de voz para usar este comando.`,
          false
        );
      }

      if (!args.join(' '))
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted debe ingresar el título o URL de la canción a reproducir.`,
          true,
          'Uso correcto:',
          `${await client._guildPrefix(message)}${
            this._information.commandUsage
          }`
        );

      const res = await client._manager.search(args.join(' '), message.author);
      const player = client._manager.create({
        guild: message.guild.id,
        voiceChannel: voiceChannel,
        textChannel: message.channel.id,
        selfDeafen: true,
      });

      const channel = message.member.voice;
      if (channel.channelId !== player.voiceChannel)
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted tiene que estar en el mismo canal de voz que yo para usar ese comando.`,
          false
        );

      if (
        !message.guild.channels.cache
          .get(voiceChannel)
          .permissionsFor(client.user.id)
          .has('VIEW_CHANNEL')
      )
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} No tengo el permiso requerido para la ejecución del comando.`,
          true,
          'Permiso requerido:',
          `${_humanizePermisson('viewChannel')}.`
        );

      if (
        !message.guild.channels.cache
          .get(voiceChannel)
          .permissionsFor(client.user.id)
          .has('CONNECT')
      )
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} No tengo el permiso requerido para la ejecución del comando.`,
          true,
          'Permiso requerido:',
          `${_humanizePermisson('connect')}.`
        );

      if (
        !message.guild.channels.cache
          .get(voiceChannel)
          .permissionsFor(client.user.id)
          .has('SPEAK')
      )
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} No tengo el permiso requerido para la ejecución del comando.`,
          true,
          'Permiso requerido:',
          `${_humanizePermisson('speak')}.`
        );

      if (
        message.guild.channels.cache.get(voiceChannel).type ==
        'GUILD_STAGE_VOICE'
      )
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} No puedo reproducir música en los canales de \`Escenario\`.`,
          false
        );

      if (player.state !== 'CONNECTED') {
        await player.connect();
        const embed_join = new MessageEmbed()
          .setTitle('> Reproducción de música')
          .setColor(client._color)
          .setDescription(
            `Entrando al canal de voz <#${message.member.voice.channelId}>.`
          );
        message.channel.send({ embeds: [embed_join] });
      }
      const getPlayer = client._manager.players.get(message.guild.id);
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();

        const embed = new MessageEmbed()
          .setColor(client._colors.red)
          .setDescription('Ocurrió un error inesperado, intenta nuevamente.');

        message.channel.send({
          embeds: [embed],
        });
        throw res.exception;
      } else if (res.loadType === 'NO_MATCHES') {
        if (!player.queue.current) player.destroy();

        const embed = new MessageEmbed()
          .setColor(client._colors.red)
          .setDescription(
            'Lastimosamente no he encontrado la canción que deseas, intenta nuevamente.'
          );

        message.channel.send({
          embeds: [embed],
        });
      } else if (res.loadType === 'TRACK_LOADED') {
        player.queue.add(res.tracks[0]);
        if (getPlayer.queue[0]) {
          const embed_track_loaded = new MessageEmbed()
            .setTitle('> Lista de reproducción')
            .setColor(client._color)
            .setDescription(
              `Se agregó __**${
                res.tracks[0].uri
                  ? `[${res.tracks[0].title}](${res.tracks[0].uri})`
                  : res.tracks[0].title
              }**__ a la lista`
            );
          message.channel.send({ embeds: [embed_track_loaded] });
        }

        if (!player.playing) player.play();
      } else if (res.loadType === 'PLAYLIST_LOADED') {
        client._manager.emit('playListAdd', res.playlist);
        res.tracks.forEach((track) => player.queue.add(track));
        const embed_playlist_loaded = new MessageEmbed()
          .setTitle('> Lista de reproducción')
          .setColor(client._color)
          .setDescription(
            `Se añadieron \`${res.tracks.length}\` canciones a la lista de reproducción desde la playlist \`${res.playlist.name}\`.`
          );
        for (const song of player.queue) {
          song.resolve?.();
        }
        message.channel.send({ embeds: [embed_playlist_loaded] });

        if (!player.playing) await player.play();
      } else if (res.loadType === 'SEARCH_RESULT') {
        const tracks = res.tracks.slice(0, 10);
        const track = tracks[0];
        player.queue.add(track);
        if (getPlayer.queue[0]) {
          const embed_song_added = new MessageEmbed()
            .setTitle('> Lista de reproducción')
            .setColor(client._color)
            .setDescription(
              `Se agregó __**[${track.title}](${track.uri})**__ a la lista.`
            );
          message.channel.send({ embeds: [embed_song_added] });
        }

        if (!player.playing) await player.play();
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
