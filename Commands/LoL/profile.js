const Command = require('../../Class/ClassCommand.js');
const SummonerData = require('../../Class/ClassSummonerData.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const getMapNameEs = require('../../Functions/GetMapNameSpanish');
const isInfinity = require('../../Functions/IsInfinity');
const getMapNameById = require('../../Functions/GetMapNameById');
const getQueueName = require('../../Functions/GetQueueName');
const getGameModeES = require('../../Functions/getGameModeSpanish');
const RankedEmoji = require('../../Json/RankedEmoji.json');
const RankName = require('../../Json/Ranks.json');
const ChampionEmojis = require('../../Json/ChampionEmojis.json');
const SpellsEmojis = require('../../Json/Spells.json');
const fabricio = require('@fabricio-191/ms');
const {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');

module.exports = class ProfileCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'profile',
      commandAliases: ['summoner'],
      commandDescription:
        'Perfil del invocador con rangos, campeones y última partida.',
      commandUsage: 'profile [región] [invocador]',
      commandUsageExample: 'profile LAN Moonlight Diana',
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

      const msg = await message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(client._colors.deepskyblue)
            .setTitle(`> Espera un momento`)
            .setDescription(
              `${
                client._emojis.stopwatch
              } Recolectando información acerca del invocador __**${username}** (${region.toUpperCase()})__...`
            ),
        ],
      });

      await msg.channel.sendTyping();

      const summonerData = new SummonerData(region, username);

      const {
        summonerLevel,
        name: summonerName,
        profileIconId,
        id: summonerId,
      } = await summonerData.profileBasicData();

      const patch = await summonerData.getCurrentPatch();

      const mostPlayedChampions = await summonerData.mostPlayedChampions(
        summonerId
      );

      const rankedInfo = await summonerData.rankedInfo(summonerId);

      const currentMatch = await summonerData.getCurrentMatch(summonerId);

      const lastMatch = await summonerData.lastMatch();

      const embeds = new Array();

      const embed_profile = new MessageEmbed()
        .setColor(client._color)
        .setTitle(
          `> **${summonerName}** (${summonerLevel} - ${region.toUpperCase()})`
        )
        .setThumbnail(
          `http://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileIconId}.png`
        )
        .addField(
          `Mejores campeones:`,
          mostPlayedChampions.length > 0
            ? mostPlayedChampions
                .map((champ, index) => {
                  return `\`${index + 1}.\` ${
                    ChampionEmojis[`${champ.name}`]
                  } **[${champ.level}] ${champ.name}:** ${parseInt(
                    champ.points
                  ).toLocaleString()} pts.`;
                })
                .join('\n')
            : 'No hay maestría de campeones.'
        );

      if (lastMatch) {
        const { time, mode, map, spells } = lastMatch[0];
        const {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
        } = lastMatch[0].stats;
        const { name: championName } = lastMatch[0].stats.champion;
        embed_profile.addField(
          'Última partida:',
          `${getMapNameEs(map)} (${mode}) (${time[1]}).\n${
            win ? ':green_circle:' : ':red_circle:'
          } ${deaths == 0 && kills > 1 ? '`' + 'KDA Perfecto' + '`.\n' : ''} ${
            ChampionEmojis[`${championName}`]
          } **${championName}** con **${kills}/${deaths}/${assists}** (${
            isNaN((kills + assists) / deaths)
              ? '00.0'
              : isInfinity((kills + assists) / deaths)
              ? '100.0'
              : ((kills + assists) / deaths).toFixed(1)
          }%) y **${
            totalMinionsKilled + neutralMinionsKilled
          }CS**.\n**Hechizos:** ${SpellsEmojis[`${spells.summoner1Id}`]}${
            SpellsEmojis[`${spells.summoner2Id}`]
          }.\n${time[0]}.`
        );
      } else {
        embed_profile.addField(
          'Última partida:',
          'No hay registro de partidas.'
        );
      }

      const embed_ranked_stats = new MessageEmbed()
        .setAuthor(
          `${summonerName} (${summonerLevel} - ${region.toUpperCase()})`
        )
        .setTitle('> Estadisticas de clasificatoria')
        .setColor(client._color)
        .setThumbnail(
          `http://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileIconId}.png`
        )
        .addField(
          'Solo/Dúo:',
          rankedInfo.solo
            ? `**${
                RankedEmoji[
                  `${rankedInfo.solo[0].tier
                    .split(' ')
                    .map((x) => x[0]?.toUpperCase() + x.slice(1)?.toLowerCase())
                    .join(' ')}`
                ]
              } ${
                RankName[
                  `${rankedInfo.solo[0].tier
                    .split(' ')
                    .map((x) => x[0]?.toUpperCase() + x.slice(1)?.toLowerCase())
                    .join(' ')}`
                ]
              } ${rankedInfo.solo[0].rank}**.\n**${
                rankedInfo.solo[0].leaguePoints
              }LP** / ${rankedInfo.solo[0].wins}V ${
                rankedInfo.solo[0].losses
              }D.\n**Tasa de victoria:** ${
                (
                  (rankedInfo.solo[0].wins * 100) /
                  (rankedInfo.solo[0].wins + rankedInfo.solo[0].losses)
                ).toFixed(1) || 0
              }%.`
            : 'Sin clasificar.',
          true
        )
        .addField(
          'Flexible:',
          rankedInfo.flex
            ? `**${
                RankedEmoji[
                  `${rankedInfo.flex[0].tier
                    .split(' ')
                    .map((x) => x[0]?.toUpperCase() + x.slice(1)?.toLowerCase())
                    .join(' ')}`
                ]
              } ${
                RankName[
                  `${rankedInfo.flex[0].tier
                    .split(' ')
                    .map((x) => x[0]?.toUpperCase() + x.slice(1)?.toLowerCase())
                    .join(' ')}`
                ]
              } ${rankedInfo.flex[0].rank}**.\n**${
                rankedInfo.flex[0].leaguePoints
              }LP** / ${rankedInfo.flex[0].wins}V ${
                rankedInfo.flex[0].losses
              }D.\n**Tasa de victoria:** ${
                (
                  (rankedInfo.flex[0].wins * 100) /
                  (rankedInfo.flex[0].wins + rankedInfo.flex[0].losses)
                ).toFixed(1) || 0
              }%.`
            : 'Sin clasificar.',
          true
        );

      embeds.push(embed_profile, embed_ranked_stats);

      const embed_inGame = new MessageEmbed();
      let boolean;
      if (currentMatch) {
        boolean = false;
        embed_inGame
          .setAuthor(
            `${summonerName} (${summonerLevel} - ${region.toUpperCase()})`
          )
          .setThumbnail(
            `http://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileIconId}.png`
          )
          .setTitle(`> Partida en vivo`)
          .addField(
            'Información de la partida:',
            `Partida ${getGameModeES(currentMatch.gameMode)
              .split(' ')
              .map((x) => x[0]?.toUpperCase() + x.slice(1)?.toLowerCase())
              .join(' ')} ${getQueueName(
              currentMatch.gameQueueConfigId
            )}.\n${getMapNameById(currentMatch.mapId)}.\n${
              currentMatch.startTimeGame < 1
                ? 'Acaba de empezar a jugar.'
                : `Tiempo en partida: ${fabricio(
                    Date.now() - currentMatch.startTimeGame,
                    {
                      long: false,
                      language: 'en',
                      length: 2,
                    }
                  )}.`
            }`
          )
          .addField(
            '🔵 Equipo Azul:',
            currentMatch.userTeam
              .map(
                (user) =>
                  `${ChampionEmojis[`${user.championName}`]} | ${
                    user.summonerName == summonerName
                      ? '__' + user.summonerName + '__'
                      : `${user.summonerName}`
                  }.`
              )
              .join('\n'),
            true
          )
          .addField(
            '🔴 Equipo Rojo:',
            currentMatch.enemyTeam
              .map(
                (user) =>
                  `${ChampionEmojis[`${user.championName}`]} | ${
                    user.summonerName == summonerName
                      ? '__' + user.summonerName + '__'
                      : `${user.summonerName}`
                  }.`
              )
              .join('\n'),
            true
          )
          .addField(`Spells:`, '\u200b', false)
          .addField(
            '🔵 Equipo Azul:',
            currentMatch.userTeam
              .map(
                (user) =>
                  `${ChampionEmojis[`${user.championName}`]} | ${
                    user.spells.one
                  }${user.spells.two}.`
              )
              .join('\n'),
            true
          )
          .addField(
            '🔴 Equipo Rojo:',
            currentMatch.enemyTeam
              .map(
                (user) =>
                  `${ChampionEmojis[`${user.championName}`]} | ${
                    user.spells.one
                  }${user.spells.two}.`
              )
              .join('\n'),
            true
          );
        if (currentMatch.bans.length > 0) {
          const BansArray = new Array();
          BansArray.redTeam = new Array();
          BansArray.blueTeam = new Array();
          const MapArray = currentMatch.bans
            .filter((x) => x.championId !== -1)
            .map(async (x) => {
              const { name } = await summonerData.getChampionById(x.championId);
              const pickTurn = x.pickTurn;
              if (x.teamId == 100) {
                BansArray.blueTeam.push({
                  name,
                  pickTurn,
                });

                BansArray.blueTeam.sort(function (a, b) {
                  if (a.pickTurn > b.pickTurn) {
                    return 1;
                  }
                  if (a.pickTurn < b.pickTurn) {
                    return -1;
                  }
                  return 0;
                });
              } else if (x.teamId == 200) {
                BansArray.redTeam.push({
                  name,
                  pickTurn,
                });

                BansArray.redTeam.sort(function (a, b) {
                  if (a.pickTurn > b.pickTurn) {
                    return 1;
                  }
                  if (a.pickTurn < b.pickTurn) {
                    return -1;
                  }
                  return 0;
                });
              }
              return BansArray;
            });

          const DataArray = await Promise.all(MapArray);

          const array_bans = [
            `🔵 | ${DataArray[0].blueTeam
              .map((x) => `**${x.name}**`)
              .join(', ')}.`,
            `🔴 | ${DataArray[0].redTeam
              .map((x) => `**${x.name}**`)
              .join(', ')}.`,
          ];
          embed_inGame.addField('Bans:', array_bans.join('\n'));
        }
        embed_inGame.setColor(client._color);
        embeds.push(embed_inGame);
      } else {
        boolean = true;
        embed_inGame
          .setTitle('> Partida en vivo')
          .setAuthor(
            `${summonerName} (${summonerLevel} - ${region.toUpperCase()})`
          )
          .setThumbnail(
            `http://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileIconId}.png`
          )
          .setDescription('Este invocador no está en partida actualmente.');
      }

      const btn = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId('ranked_stats')
          .setLabel('Clasificatoria')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('live_game')
          .setLabel('Partida en vivo')
          .setStyle('PRIMARY')
          .setDisabled(boolean)
      );

      await msg.edit({
        embeds: [embeds[0]],
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
          case 'ranked_stats':
            interaction.reply({
              embeds: [embeds[1]],
              ephemeral: true,
            });
            break;

          case 'live_game':
            interaction.reply({
              embeds: [embeds[2]],
              ephemeral: true,
            });
            break;
        }
      });

      collector.on('end', () => {
        if (!msg.deleted) {
          btn.components[0].setDisabled(true);
          if (btn.components[1].disabled == false)
            btn.components[1].setDisabled(true);
          msg.edit({
            components: [btn],
          });
        }
      });
    } catch (error) {
      console.error(
        `[${String(this._information.commandName).toUpperCase()}] ${
          error.message
        }.`
      );
      if (error.message == 'Este usuario no existe en la región actual.') {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted debe ingresar un invocador válido en la región.`,
          false
        );
      }
      message.channel.send({
        content: `A ocurrido un error. Aquí el debug:\n${client._markdown(
          error.message,
          'js'
        )}`,
      });
    }
  }
};
