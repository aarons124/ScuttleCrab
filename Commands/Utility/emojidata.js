const Command = require('../../Class/ClassCommand.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const { Message, Util, MessageEmbed } = require('discord.js');

module.exports = class EmojidataCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'emojidata',
      commandAliases: ['emoji'],
      commandDescription:
        'Proporciona información respecto a un emoji del servidor.',
      commandUsage: 'emojidata [emoji]',
      commandUsageExample: 'emojidata <:owokhe:888321445351030795>',
      commandCategory: 'utility',
      commandCooldown: 4,
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
      if (!args[0]) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted debe ingresar el emoji del cual desea obtener información.`,
          true,
          'Uso correcto:',
          `${await client._guildPrefix(message)}${
            this._information.commandUsage
          }`
        );
      }

      let emoji =
        client.emojis.cache.get(args[0]) ||
        client.emojis.cache.find((e) => e.name === args[0]) ||
        (await message.guild.emojis.fetch(args[0]).catch(() => {}));
      if (!emoji) {
        const e = Util.parseEmoji(args[0]);
        if (!e.id) emoji = client.emojis.cache.find((a) => a.name === e.name);
        else
          emoji =
            client.emojis.cache.get(e.id) ||
            (await message.guild.emojis.fetch(e.id).catch(() => {}));
        if (!emoji) {
          return _errorEmbed(
            message,
            client._colors.red,
            `> Comando __${client._capitalize(
              this._information.commandName
            )}__`,
            `${client._emojis.no_entry_sign} Usted debe ingresar un emoji válido.`,
            false
          );
        }
      }

      let auth = emoji.author;
      if (
        !auth &&
        message.guild.me.permissions.has('MANAGE_EMOJIS_AND_STICKERS') &&
        emoji.guild.id === message.guild.id
      ) {
        auth = await emoji.fetchAuthor();
      } else if (!auth) auth = 'No tengo permiso de verlo.';

      const embed_success = new MessageEmbed()
        .setColor(client._color)
        .setTitle(`> ${emoji.name}`)
        .setURL(emoji.url)
        .setThumbnail(emoji.url)
        .setDescription(
          [
            `**ID:** ${emoji.id}.`,
            `**Creación:** <t:${Math.round(emoji.createdTimestamp / 1000)}:F>.`,
            `**Animado:** ${emoji.animated ? '✅' : '❌'}.`,
            `**Disponible:** ${emoji.available ? '✅' : '❌'}.`,
            `**Está eliminado:** ${emoji.deleted ? '✅' : '❌'}.`,
            `**Requiere dos puntos:** ${emoji.requiresColons ? '✅' : '❌'}.`,
          ].join('\n')
        );

      if (emoji.guild.id === message.guild.id) {
        embed_success.addField(
          'Información en el servidor:',
          [
            `**Añadido por:** ${auth.tag || 'Unknown#0000'}.`,
            `**Roles que pueden usarlo:** ${
              emoji.roles.cache.first()
                ? emoji.roles.cache.map((e) => `${e.toString()}`).join(', ')
                : '@everyone'
            }.`,
          ].join('\n')
        );
      }

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
