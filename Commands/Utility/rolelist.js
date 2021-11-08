const Command = require('../../Class/ClassCommand.js');
const _paginationEmbed = require('../../Functions/PaginationEmbed');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class RolelistCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'rolelist',
      commandAliases: ['roles'],
      commandDescription: 'Muestra la lista de roles del servidor',
      commandUsage: 'rolelist',
      commandUsageExample: 'rolelist',
      commandCategory: 'utility',
      commandCooldown: 7,
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
      if (message.guild.roles.cache.size < 1) {
        return _errorEmbed(
          message,
          client._color,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} No hay roles en el servidor.`,
          false
        );
      }
      if (message.guild.roles.cache.size < 21) {
        const description_1 = Array.from(message.guild.roles.cache)
          .map((r) => r[1])
          .sort((x, y) => y.position - x.position)
          .filter((x) => x.id !== x.guild.id)
          .map((x, i) => `<@&${x.id}>`);
        const embed_roles_20 = new MessageEmbed()
          .setColor(client._color)
          .setTitle('> Lista de roles del servidor')
          .setDescription(description_1.join('\n'));
        return message.channel.send({ embeds: [embed_roles_20] });
      }

      const descriptions = [];
      let rolesPerPage = 20;
      const roles = message.guild.roles.cache
        .sort((x, y) => y.position - x.position)
        .filter((x) => x.id !== x.guild.id)
        .map((x) => `<@&${x.id}>.`);
      let i = 0;
      for (const role of roles) {
        if (!Array.isArray(descriptions[i])) descriptions[i] = [];
        descriptions[i].push(role);
        if (
          descriptions[i].length >= rolesPerPage ||
          descriptions[i].join('\n').length >= 4096
        )
          ++i;
      }

      const embeds = new Array();
      for (const description of descriptions) {
        const embed = new MessageEmbed()
          .setColor(client._color)
          .setTitle('> Lista de roles del servidor')
          .setDescription(description.join('\n'));
        embeds.push(embed);
      }

      _paginationEmbed(client, message, 15000, embeds);
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
