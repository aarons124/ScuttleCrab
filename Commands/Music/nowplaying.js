const Command = require('../../Class/ClassCommand.js');
const { Message, MessageEmbed } = require('discord.js');
const { getInfo } = require('ytdl-core');
const { Player } = require('erela.js');

module.exports = class NowplayingCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'nowplaying',
      commandAliases: ['np', 'now', 'current'],
      commandDescription: 'Muestra información acerca de la canción actual.',
      commandUsage: 'nowplaying',
      commandUsageExample: 'nowplaying',
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
      /**
       * @type {Player}
       */
      const player = await client._manager.players.get(message.guild.id);
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

      const data = await getInfo(player.queue.current.uri);

      if (!data) {
        const embed_error = new MessageEmbed()
          .setColor(client._colors.red)
          .setDescription(
            `${client._emojis.no_entry_sign} La canción actual no está disponible en **YouTube**.`
          );
        return message.channel.send({
          embeds: [embed_error],
        });
      }

      const array = [
        `**Duración:** ${
          player.queue.current.isStream
            ? `🔴 En vivo`
            : _format(player.queue.current.duration)
        }.`,
        `**Autor:** ${data.videoDetails.author.name}.`,
        `**Añadida por:** ${player.queue.current.requester.tag}.`,
        `**Fecha de publicación:** ${data.videoDetails.publishDate}.`,
        `**Likes:** ${
          data.videoDetails.likes
            ? data.videoDetails.likes.toLocaleString()
            : data.videoDetails.likes
        }.`,
        `**Dislikes:** ${
          data.videoDetails.dislikes
            ? data.videoDetails.dislikes.toLocaleString()
            : data.videoDetails.dislikes
        }.`,
        `**Vistas:** ${parseInt(
          data.videoDetails.viewCount
        ).toLocaleString()}.`,
      ];

      const embed_success = new MessageEmbed()
        .setTitle(`> ${data.videoDetails.title}`)
        .setURL(data.videoDetails.video_url)
        .setColor(client._color)
        .setThumbnail(data.videoDetails.thumbnails[0].url)
        .setDescription(array.join('\n'))
        .addField(
          `**Barra de progreso:**`,
          `${createProgressBar(
            player.position,
            player.queue.current.duration,
            12
          )}\n\`${
            new Date(player.position).toISOString().substr(11, 8) +
            ' / ' +
            (player.queue.current.duration == 0
              ? ' 🔴 En vivo'
              : _format(player.queue.current.duration).split(' ')[0])
          }\``
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

function createProgressBar(current, total, max) {
  const percentage = current / total;
  const percentageText = Math.round(percentage * 100);
  const progress = Math.round(max * (current / total));
  const remain = max - progress;
  return `[${['▬'.repeat(progress), '💿', '▬'.repeat(remain)].join(
    ''
  )}] **${percentageText}%**.`;
}
