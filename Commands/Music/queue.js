const Command = require('../../Class/ClassCommand.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const { Message, MessageEmbed } = require('discord.js');
const { Player, Queue } = require('erela.js');

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'queue',
      commandAliases: ['q', 'list', 'songs'],
      commandDescription: 'Muestra la lista de reproducción del servidor.',
      commandUsage: 'queue',
      commandUsageExample: 'queue',
      commandCategory: 'music',
      commandCooldown: 20,
      commandPermissionsBot: [
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'EMBED_LINKS',
        'ADD_REACTIONS',
      ],
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

      if (!message.channel.permissionsFor(client.user).has('ADD_REACTIONS')) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} No tengo el permiso **Add reactions** para el uso correcto de este comando.`,
          true,
          'Permiso requerido:',
          'Add reactions'
        );
      }

      if (player.queue.length < 1) {
        return message.channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle('> Lista de reproducción')
              .setColor(client._color)
              .addField(
                'Canción actual:',
                `**${player.queue.current.title}** [\`${
                  player.queue.current.isStream
                    ? `🔴 En vivo`
                    : _format(player.queue.current.duration).split(' ')[0]
                }\`].`
              ),
          ],
        });
      }

      const guildQueue = player.queue;

      let currentPage = 0;
      const embeds = _generateQueueEmbed(client._color, guildQueue);

      const queueEmbedMessage = await message.channel.send({
        content: `**Página actual:** ${currentPage + 1}/${embeds.length}.`,
        embeds: [embeds[currentPage]],
      });

      if (player.queue.length > 15) {
        try {
          await queueEmbedMessage.react(client._emojis.arrow_backward);
          await queueEmbedMessage.react(client._emojis.stop_button);
          await queueEmbedMessage.react(client._emojis.arrow_forward);
        } catch (error) {
          console.error(`[QUEUE] ${error.message}.`);
        }

        const filter = (reaction, user) =>
          [
            client._emojis.arrow_backward,
            client._emojis.stop_button,
            client._emojis.arrow_forward,
          ].includes(reaction.emoji.name) && message.author.id === user.id;
        const reactionCollector = queueEmbedMessage.createReactionCollector({
          filter: filter,
          time: 20000,
        });

        reactionCollector.on('collect', async (reaction, user) => {
          try {
            if (reaction.emoji.name === client._emojis.arrow_forward) {
              if (currentPage < embeds.length - 1) {
                currentPage++;
                queueEmbedMessage.edit({
                  content: `**Página actual:** ${currentPage + 1}/${
                    embeds.length
                  }.`,
                  embeds: [embeds[currentPage]],
                });
              }
            } else if (reaction.emoji.name === client._emojis.arrow_backward) {
              if (currentPage !== 0) {
                --currentPage;
                queueEmbedMessage.edit({
                  content: `**Página actual:** ${currentPage + 1}/${
                    embeds.length
                  }.`,
                  embeds: [embeds[currentPage]],
                });
              }
            } else {
              reactionCollector.stop();
              if (
                message.channel.permissionsFor(client.user).has('ADD_REACTIONS')
              ) {
                await reaction.message.reactions.removeAll();
              }
            }
            if (
              message.channel.permissionsFor(client.user).has('ADD_REACTIONS')
            ) {
              await reaction.users.remove(message.author.id);
            }
          } catch (error) {
            console.error(`[QUEUE] ${error.message}.`);
          }
        });
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
/**
 *
 * @param {Message} message
 * @param {String} color
 * @param {Queue} queue
 * @returns
 */
function _generateQueueEmbed(color, queue) {
  let embeds = [];
  let k = 15;

  for (let i = 0; i < queue.length; i += 15) {
    const current = queue.slice(i, k);
    let j = i;
    k += 15;

    const info = current
      .map((track) => `\`${++j}.\` **[${track.title}](${track.uri})**.`)
      .join('\n');

    const embed = new MessageEmbed()
      .setTitle('> Lista de reproducción')
      .setColor(color)
      .setDescription(info)
      .addField(
        'Canción actual:',
        `**${queue.current.title}** [\`${
          queue.current.isStream
            ? `🔴 En vivo`
            : _format(queue.current.duration).split(' ')[0]
        }\`].`
      );
    embeds.push(embed);
  }

  return embeds;
}

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
