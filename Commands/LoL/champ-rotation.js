const Command = require('../../Class/ClassCommand.js');
const ChampionEmoji = require('../../Json/ChampionEmojis.json');
const axios = require('axios').default;
const { Message, MessageEmbed } = require('discord.js');

module.exports = class ChampRotationCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'champ-rotation',
      commandAliases: ['rotation', 'cr'],
      commandDescription: 'Muestra la rotación gratuita de campeones.',
      commandUsage: 'champ-rotation',
      commandUsageExample: 'champ-rotation',
      commandCategory: 'LoL',
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
      const response = await axios.get(
        `https://la1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${process.env.RIOT_API_TOKEN}`
      );

      const freeWeekIds = response.data.freeChampionIds;
      const championsResponse = await axios.get(
        `http://ddragon.leagueoflegends.com/cdn/11.21.1/data/es_ES/champion.json`
      );

      const championsInfo = Object.values(championsResponse.data.data);
      const getChampionInfo = (id) => {
        return championsInfo.find((champion) => champion.key === String(id));
      };

      const arr = [];
      let pos = 0;
      for (const freeId of freeWeekIds) {
        if (!Array.isArray(arr[pos])) arr[pos] = [];
        arr[pos].push(freeId);
      }

      for (const ids of arr) {
        const champions = ids
          .map((id) => ({ id, ...getChampionInfo(id) }))
          .filter((x) => !!x.name);

        const embed = new MessageEmbed()
          .setTitle('> Rotación gratuita de campeones')
          .setColor(client._color)
          .setDescription(
            champions
              .map((champion) => {
                return `${ChampionEmoji[`${champion.name}`]} ${champion.name}.`;
              })
              .join('\n')
          );
        message.channel.send({
          embeds: [embed],
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
