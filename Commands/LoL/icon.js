const Command = require('../../Class/ClassCommand.js');
const SummonerData = require('../../Class/ClassSummonerData.js');

const _errorEmbed = require('../../Functions/ErrorEmbed');

const {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');

module.exports = class IconCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'icon',
      commandAliases: [],
      commandDescription: 'Muestra el ícono del invocador.',
      commandUsage: 'icon [región] [invocador]',
      commandUsageExample: 'icon LAN Moonlight Diana',
      commandCategory: 'LoL',
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
      let region = args[0];
      let region_final;
      const username = args.slice(1).join(' ');
      if (!region) {
        return _errorEmbed(
          message,
          client._color,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted debe ingresar la región del invocador el cual deseas obtener la información.`,
          true,
          'Uso correcto:',
          `${await client._guildPrefix(message)}${
            this._information.commandUsage
          }`
        );
      }
      if (region) {
        region = region.toLowerCase();
        region = region.replace(/[0-9]/g, '');
      }
      switch (region) {
        case 'ru':
        case 'kr':
          region_final = region;
          break;
        case 'lan':
          region_final = 'la1';
          break;
        case 'las':
          region_final = 'la2';
          break;
        case 'oce':
          region_final = 'oc1';
          break;
        case 'eune':
          region_final = 'eun1';
          break;
        default:
          region_final = `${region}1`;
          break;
      }
      if (
        ![
          'br1',
          'eun1',
          'euw1',
          'jp1',
          'kr',
          'la1',
          'la2',
          'na1',
          'oc1',
          'tr1',
          'ru',
        ].includes(region_final)
      ) {
        return _errorEmbed(
          message,
          client._color,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted debe ingresar una región de invocador válida.`,
          true,
          'Regiones válidas:',
          'LAN, LAS, NA, RU, KR, EUW, EUNE, BR, TR, KR, JP.'
        );
      }

      if (!username) {
        return _errorEmbed(
          message,
          client._color,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted debe ingresar el nombre del invocador el cual deseas obtener la información.`,
          true,
          'Uso correcto:',
          `${await client._guildPrefix(message)}${
            this._information.commandUsage
          }`
        );
      }

      const summonerData = new SummonerData(region, username);

      const { name, profileIconId } = await summonerData.profileBasicData();
      const patch = await summonerData.getCurrentPatch();

      const btn = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle('LINK')
          .setLabel('Abrir en una nueva pestaña')
          .setURL(
            `http://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileIconId}.png`
          )
      );

      const embed_success = new MessageEmbed()
        .setColor(client._color)
        .setTitle(`> **${name}** (${region.toUpperCase()})`)
        .setImage(
          `http://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileIconId}.png`
        );

      message.channel.send({
        embeds: [embed_success],
        components: [btn],
      });
    } catch (error) {
      if (error.message == 'Este usuario no existe en la región actual.') {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted debe ingresar un invocador válido en la región.`,
          false
        );
      }

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
