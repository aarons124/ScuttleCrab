const Command = require('../../Class/ClassCommand.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const { Message, MessageEmbed } = require('discord.js');
const { Player } = require('erela.js');

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'skip',
      commandAliases: [],
      commandDescription: 'Salta una canción de la lista de reproducción.',
      commandUsage: 'skip',
      commandUsageExample: 'skip',
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

      if (
        message.guild.channels.cache
          .get(message.member.voice.channelId)
          .members.filter((x) => !x.user.bot).size === 1
      ) {
        const embed_succes_1 = new MessageEmbed()
          .setTitle('> Lista de reproducción')
          .setColor(client._color)
          .setDescription('La canción fue omitida de forma exitosa.');

        player.stop();
        return message.channel.send({
          embeds: [embed_succes_1],
        });
      }

      const guildCollection = client._skipvote.get(message.guild.id);

      if (guildCollection) {
        if (guildCollection.users.includes(message.author.id)) {
          const embed_hasVoted = new MessageEmbed()
            .setColor(client._colors.red)
            .setDescription(
              `${client._emojis.no_entry_sign} Usted ya ha votado para omitir la canción, **${message.author.tag}**.`
            );
          return message.channel.send({
            embeds: [embed_hasVoted],
          });
        }

        guildCollection.users.push(message.author.id);

        if (guildCollection.users.lenght > 1) {
          const skipUsersLenght = parseInt(
            message.guild.channels.cache
              .get(message.member.voice.channelId)
              .members.filter((x) => !x.user.bot).size
          );

          const embed_newVote = new MessageEmbed()
            .setColor(client._colors.yellow)
            .setDescription(
              `${client._emojis.arrow_forward} **${message.author.tag}** votó para omitir la canción actual.\n**Votos actuales:** ${guildCollection.users.length}/${skipUsersLenght}.`
            );
          message.channel.send({
            embeds: [embed_newVote],
          });
        }

        const number = parseInt(
          message.guild.channels.cache
            .get(message.member.voice.channelId)
            .members.filter((x) => !x.user.bot).size
        );

        if (guildCollection.users.length < number) return;

        const embed_succes_2 = new MessageEmbed()
          .setTitle('> Lista de reproducción')
          .setColor(client._color)
          .setDescription('La canción actual fue omitida de forma exitosa.');

        message.channel.send({
          embeds: [embed_succes_2],
        });

        player.stop();
        client._skipvote.delete(message.guild.id);
      } else {
        const userList = {
          users: new Array(),
        };

        client._skipvote.set(message.guild.id, userList);

        userList.users.push(message.author.id);

        const skipUsersLenght = parseInt(
          message.guild.channels.cache
            .get(message.member.voice.channelId)
            .members.filter((x) => !x.user.bot).size
        );

        const embed_init_votation = new MessageEmbed()
          .setColor(client._colors.yellow)
          .setDescription(
            `**${message.author.tag}** inició la votación para omitir la canción actual.\n**Votos actuales:** 1/${skipUsersLenght}.`
          );
        return message.channel.send({
          embeds: [embed_init_votation],
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
