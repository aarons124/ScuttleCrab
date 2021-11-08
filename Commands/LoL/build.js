const Command = require('../../Class/ClassCommand.js');
const SummonerData = require('../../Class/ClassSummonerData.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const {
  getCounters,
  getBuildsAndRunes,
} = require('../../Functions/GetChampionBuild');

const Runes = require('../../Json/Runes.json');
const Items = require('../../Json/Items.json');
const GetItemId = require('../../Functions/GetItemId');
const GetItemNameSpanish = require('../../Functions/GetItemNameSpanish');
const ChampionEmojis = require('../../Json/ChampionEmojis.json');
const Spells = require('../../Json/Spells.json');

const {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');

module.exports = class BuildCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'build',
      commandAliases: [],
      commandDescription:
        'Obtén los items, orden de habilidades y runas recomendadas para el campeón.',
      commandUsage: 'build [campeón]',
      commandUsageExample: 'build Diana',
      commandCategory: 'LoL',
      commandCooldown: 7,
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
      const champ = args.join(' ');
      if (!champ)
        return _errorEmbed(
          message,
          client._color,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted debe ingresar el nombre del campeón el cual desea obtener la información.`,
          true,
          'Uso correcto:',
          `${await client._guildPrefix(message)}${
            this._information.commandUsage
          }`
        );

      let champAPIRunes;
      let champAPIRiot;

      switch (champ) {
        case "Cho'Gat":
        case "cho'gat":
        case 'chogat':
        case 'cho':
        case 'Cho':
        case 'gat':
        case 'Gat':
          champAPIRunes = 'cho-gath';
          champAPIRiot = 'Chogath';
          break;
        case 'Aatrox':
        case 'aatrox':
        case 'Atrox':
        case 'atrox':
          champAPIRunes = 'aatrox';
          champAPIRiot = 'Aatrox';
          break;
        case 'Xin Zhao':
        case 'xinzhao':
        case 'XinZhao':
        case 'xin zhao':
        case 'xin':
        case 'zhao':
        case 'xz':
          champAPIRunes = 'xin-zhao';
          champAPIRiot = 'XinZhao';
          break;
        case 'Nunu y Willump':
        case 'nunuywillump':
        case 'NunuyWillump':
        case 'nunu y willump':
        case 'nunu':
        case 'willump':
        case 'nw':
          champAPIRunes = 'nunu';
          champAPIRiot = 'Nunu';
          break;
        case "Kai'sa":
        case "kai'sa":
        case 'kaisa':
        case 'Kai sa':
        case 'kaisa':
        case 'Kaisa':
        case 'kai':
        case 'Kai':
          champAPIRunes = 'kaisa';
          champAPIRiot = 'Kaisa';
          break;
        case 'Master Yi':
        case 'Maestro Yi':
        case 'master yi':
        case 'maestro yi':
        case 'master-yi':
        case 'maestro-yi':
        case 'Master-Yi':
        case 'Maestro-Yi':
        case 'yi':
        case 'masterQ':
          champAPIRunes = 'master-yi';
          champAPIRiot = 'MasterYi';
          break;
        case 'Twisted Fate':
        case 'TwistedFate':
        case 'twisted fate':
        case 'twistedfate':
        case 'Twisted-Fate':
        case 'twisted-fate':
        case 'tf':
        case 'Twisted':
        case 'twisted':
        case 'Fate':
        case 'fate':
          champAPIRunes = 'twisted-fate';
          champAPIRiot = 'TwistedFate';
          break;
        case 'Jarvan IV':
        case 'JarvanIV':
        case 'Jarvan-IV':
        case 'Jarvan-4':
        case 'Jarvan4':
        case 'jarvan iv':
        case 'jarvaniv':
        case 'jarvan-iv':
        case 'jarvan-4':
        case 'Jarvan4':
        case 'jarvan4':
        case 'Jarvan':
        case 'jarvan':
          champAPIRunes = 'jarvan-iv';
          champAPIRiot = 'JarvanIV';
          break;
        case "Kha'Zix":
        case "kha'zix":
        case 'khazix':
        case 'KhaZix':
        case 'kha zix':
        case 'Kha Zix':
        case 'k6':
          champAPIRunes = 'kha-zix';
          champAPIRiot = 'Khazix';
          break;
        case "Kog'Maw":
        case "kog'maw":
        case 'kogmaw':
        case 'KogMaw':
        case 'kog maw':
        case 'Kog Maw':
        case 'kog':
        case 'maw':
        case 'Kog':
        case 'Maw':
          champAPIRunes = 'kog-maw';
          champAPIRiot = 'KogMaw';
          break;
        case 'Miss Fortune':
        case 'miss fortune':
        case 'miss-fortune':
        case 'Miss-Fortune':
        case 'Miss':
        case 'miss':
        case 'fortune':
        case 'Fortune':
        case 'mf':
        case 'MF':
          champAPIRunes = 'miss-fortune';
          champAPIRiot = 'MissFortune';
          break;
        case 'Lee Sin':
        case 'lee sin':
        case 'lee-sin':
        case 'Lee-Sin':
        case 'Lee':
        case 'lee':
        case 'LS':
        case 'ls':
        case 'Lee-Sin':
          champAPIRunes = 'lee-sin';
          champAPIRiot = 'LeeSin';
          break;
        case 'LeBlanc':
        case 'leblanc':
        case 'le blanc':
        case 'Le Blanc':
        case 'le':
        case 'Le':
        case 'le-blanc':
        case 'Le-Blanc':
          champAPIRunes = 'leblanc';
          champAPIRiot = 'Leblanc';
          break;
        case 'Dr. Mundo':
        case 'dr. mundo':
        case 'Dr.Mundo':
        case 'dr.mundo':
        case 'dr mundo':
        case 'Dr Mundo':
        case 'dr-mundo':
        case 'Dr-Mundo':
        case 'DrMundo':
        case 'drmundo':
        case 'doctor mundo':
        case 'Doctor Mundo':
        case 'Mundo':
        case 'mundo':
          champAPIRunes = 'dr-mundo';
          champAPIRiot = 'DrMundo';
          break;
        default:
          champAPIRiot = champ
            .split(' ')
            .map((x) => x[0].toUpperCase() + x.slice(1).toLowerCase())
            .join('');
          champAPIRunes = champ;
      }

      const msg = await message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(client._colors.deepskyblue)
            .setTitle(`> Espera un momento`)
            .setDescription(
              `${client._emojis.stopwatch} Recolectando la build recomendada para __**${champAPIRiot}**__...`
            ),
        ],
      });

      msg.channel.sendTyping();

      // const { data: championData } = await Axios.get(
      //   `https://league-fire-b.herokuapp.com/champion/${champAPIRunes}`
      // );

      // if (championData.message === "Champion not found") {
      //   return _errorEmbed(
      //     message,
      //     client._colors.red,
      //     `> Comando __${client._capitalize(this._information.commandName)}__`,
      //     `${client._emojis.no_entry_sign} Usted debe ingresar un campeón válido, asegúrate de que su nombre esté escrito correctamente.`,
      //     false
      //   );
      // }

      const summonerData = new SummonerData('lan', 'Moonlight Diana');
      const patch = await summonerData.getCurrentPatch();
      const champ_info = await summonerData.getChampionByName(champAPIRiot);

      const build = await getBuildsAndRunes(champAPIRiot.toLowerCase(), '');
      const counters = await getCounters(champAPIRiot.toLowerCase());

      const array_runes = [
        `**Runas Principales:**\n${build.map((x) =>
          x.runesPrimary.map((runes) => getRune(runes)).join('.\n')
        )}.`,
        `**Runas Secundarias:**\n${build.map((x) =>
          x.runesSecondary.map((runes) => getRune(runes)).join('.\n')
        )}.`,
        `**Fragmentos:**\n${build.map((x) =>
          x.runesShard
            .map((runes) => getShardRune(runes.replace(/[^a-zA-Z]/g, '')))
            .join('.\n')
        )}.`,
      ];

      const embed_build = new MessageEmbed()
        .setColor(client._color)
        .setTitle(`> Runas recomendadas para ${champ_info.name}`)
        .setThumbnail(
          `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ_info.image.full}`
        )
        .setDescription(array_runes.join('\n'))
        .addField(
          'Hechizos recomendados:',
          build
            .map((x) =>
              x.spells.map((z) => `${Spells[getSpellId(z)]}`).join('')
            )
            .join('') + '.'
        );

      const embed_items = new MessageEmbed()
        .setColor(client._color)
        .setTitle('> Items recomendados')
        .setThumbnail(
          `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ_info.image.full}`
        )
        .setDescription(
          build
            .map((x) =>
              x.items
                .map(
                  (item) =>
                    `${Items[GetItemId(item)]} | ${GetItemNameSpanish(
                      `${item}`
                    )}.`
                )
                .join('\n')
            )
            .join('\n')
        );

      const embed_counters = new MessageEmbed()
        .setColor(client._color)
        .setTitle('> Counters')
        .setThumbnail(
          `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ_info.image.full}`
        );
      if (counters.map((x) => x.championsLostLanes.length > 0)) {
        const data = counters
          .map((x) =>
            x.championsLostLanes
              .map(
                (champion) => `${ChampionEmojis[`${champion}`]} | ${champion}.`
              )
              .join('\n')
          )
          .join('\n');
        embed_counters.addField(
          `Comúnmente pierde la línea contra:`,
          data || 'No hubo información recolectada.'
        );
      }

      if (counters.map((x) => x.championLostGames.length > 0)) {
        const data_1 = counters
          .map((x) =>
            x.championLostGames
              .map(
                (champion, index) =>
                  `${
                    ChampionEmojis[`${champion}`]
                  } | ${champion}: \`${counters.map(
                    (x) => x.winrateLostGames[index]
                  )}%\` de tasa de victoria.`
              )
              .join('\n')
          )
          .join('\n');
        embed_counters.addField(
          `Comúnmente pierde la partida contra:`,
          data_1 || 'No hubo información recolectada.'
        );
      }

      const btn = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('Items')
          .setCustomId('items'),
        new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('Counters')
          .setCustomId('counters')
      );

      msg.edit({
        embeds: [embed_build],
        components: [btn],
      });

      const filter = (i) => {
        if (i.user.id === message.author.id) return true;
        return i.reply({
          content: `**${i.user.tag}**, no puedes usar este botón.`,
          ephemeral: true,
        });
      };

      const collector = msg.createMessageComponentCollector({
        filter: filter,
        componentType: 'BUTTON',
        time: 60000,
      });

      collector.on('collect', async (interaction) => {
        switch (interaction.customId) {
          case 'items':
            interaction.reply({
              embeds: [embed_items],
              ephemeral: true,
            });
            break;

          case 'counters':
            interaction.reply({
              embeds: [embed_counters],
              ephemeral: true,
            });
            break;
        }
      });

      collector.on('end', () => {
        if (!msg.deleted) {
          btn.components[0].setDisabled(true);
          btn.components[1].setDisabled(true);
          msg.edit({
            components: [btn],
          });
        }
      });
    } catch (error) {
      if (error.message == 'Request failed with status code 403') {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted debe ingresar un campeón válido, asegúrate de que su nombre esté escrito correctamente.`,
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
function getRune(rune) {
  if (Runes[rune.toLowerCase()]) return null;
  const runeType = Object.keys(Runes).find((type) =>
    Runes[type]['runes_en'].find((x) => x.toLowerCase() === rune.toLowerCase())
  );
  return Runes[runeType]?.['runes_es'][
    Runes[runeType]['runes_en'].findIndex(
      (x) => x.toLowerCase() === rune.toLowerCase()
    )
  ];
}

function getSpellId(spellName) {
  const spellsNames = {
    Barrier: 21,
    Cleanse: 1,
    Ignite: 14,
    Exhaust: 3,
    Flash: 4,
    Ghost: 6,
    Heal: 7,
    Clarity: 13,
    'To the King!': 30,
    'Poro Toss': 31,
    Smite: 11,
    Mark: 39,
    // Mark: 32,
    Teleport: 12,
    Placeholder: 54,
  };

  return spellsNames[`${spellName}`];
}

function getShardRune(rune) {
  const shardRunes = {
    AdaptiveForce: 'Fuerza Adaptable',
    AttackSpeed: 'Velocidad de Ataque',
    AbilityHaste: 'Reducción de Enfriamiento',
    Armor: 'Armadura',
    MagicResistance: 'Resistencia Mágica',
    Health: 'Vida',
    ScalingHealth: 'Escalado de vida',
    ScalingCooldownReduction: 'Reducción de Enfriamiento',
  };

  return shardRunes[`${rune}`];
}
