const Command = require('../../Class/ClassCommand.js');
const SummonerData = require('../../Class/ClassSummonerData.js');

const GetMapNameSpanish = require('../../Functions/GetMapNameSpanish');
const isInfinity = require('../../Functions/IsInfinity.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');

const ChampionEmojis = require('../../Json/ChampionEmojis.json');
const SpellsEmojis = require('../../Json/Spells.json');

const {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');

module.exports = class MatchsCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'matchs',
      commandAliases: ['match-list', 'matches'],
      commandDescription: 'Muestra la lista de partidas del invocador.',
      commandUsage: 'matchs [región] [invocador]',
      commandUsageExample: 'matchs LAN Moonlight Diana',
      commandCategory: 'LoL',
      commandCooldown: 8,
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
            .setTitle('> Espera un momento')
            .setDescription(
              `${
                client._emojis.stopwatch
              } Recolectando el historial de partidas del invocador __**${username}** (${region.toUpperCase()})__...`
            ),
        ],
      });

      await msg.channel.sendTyping();

      const summonerData = new SummonerData(region, username);
      const patch = await summonerData.getCurrentPatch();
      const {
        summonerLevel,
        name: summonerName,
        profileIconId,
        id: summonerId,
      } = await summonerData.profileBasicData();

      const lastPlayedMatch = await summonerData.lastPlayedMatch();
      if (!lastPlayedMatch) {
        if (msg.deletable) await msg.delete();
        return _errorEmbed(
          message,
          client._colors.red,
          '> ¡Lamentable!',
          '😔 No logré obtener ninguna información de partidas del invocador.',
          false
        );
      }
      // `> **${summonerName}** (${summonerLevel} - ${region.toUpperCase()})`
      const embeds_matches = new Array();
      let disable_0 = true;
      let disable_1 = true;
      let disable_2 = true;
      let disable_3 = true;
      let disable_4 = true;

      if (lastPlayedMatch[0]) {
        disable_0 = false;
        const { time, mode, map, spells } = lastPlayedMatch[0];
        const {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
        } = lastPlayedMatch[0].stats;
        const { name: championName } = lastPlayedMatch[0].stats.champion;

        const array_0 = [
          `${GetMapNameSpanish(map)} (${mode}) (${time[1]}).`,
          `${win ? '🟢 Victoria' : '🔴 Derrota'}.`,
          `${
            deaths == 0 && kills > 0 ? 'KDA Perfecto' : 'No tuvo KDA Perfecto'
          }.`,
          `Jugó ${ChampionEmojis[String(championName)]} **${championName}**.`,
          `**KDA:** ${kills}/${deaths}/${assists} (${
            isNaN((kills + assists) / deaths)
              ? '00.0'
              : isInfinity((kills + assists) / deaths)
              ? '100.0'
              : ((kills + assists) / deaths).toFixed(1)
          }%).`,
          `**CS:** ${totalMinionsKilled + neutralMinionsKilled}.`,
          `**Hechizos:** ${SpellsEmojis[String(spells.summoner1Id)]}${
            SpellsEmojis[String(spells.summoner2Id)]
          }.`,
          `**Fecha:** ${time[0]}.`,
        ];

        const embed_0 = new MessageEmbed()
          .setColor(client._color)
          .setTitle('**Partida 1**')
          .setThumbnail(
            `http://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileIconId}.png`
          )
          .setDescription(array_0.join('\n'));

        embeds_matches.push(embed_0);
      } else {
        if (msg.deletable) await msg.delete();
        return _errorEmbed(
          message,
          client._colors.red,
          '> ¡Lamentable!',
          '😔 No logré obtener ninguna información de partidas del invocador.',
          false
        );
      }

      if (lastPlayedMatch[1]) {
        disable_1 = false;
        const { time, mode, map, spells } = lastPlayedMatch[1];
        const {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
        } = lastPlayedMatch[1].stats;
        const { name: championName } = lastPlayedMatch[1].stats.champion;

        const array_1 = [
          `${GetMapNameSpanish(map)} (${mode}) (${time[1]}).`,
          `${win ? '🟢 Victoria' : '🔴 Derrota'}.`,
          `${
            deaths == 0 && kills > 0 ? 'KDA Perfecto' : 'No tuvo KDA Perfecto'
          }.`,
          `Jugó ${ChampionEmojis[String(championName)]} **${championName}**.`,
          `**KDA:** ${kills}/${deaths}/${assists} (${
            isNaN((kills + assists) / deaths)
              ? '00.0'
              : isInfinity((kills + assists) / deaths)
              ? '100.0'
              : ((kills + assists) / deaths).toFixed(1)
          }%).`,
          `**CS:** ${totalMinionsKilled + neutralMinionsKilled}.`,
          `**Hechizos:** ${SpellsEmojis[String(spells.summoner1Id)]}${
            SpellsEmojis[String(spells.summoner2Id)]
          }.`,
          `**Fecha:** ${time[0]}.`,
        ];

        const embed_1 = new MessageEmbed()
          .setColor(client._color)
          .setTitle('**Partida 2**')
          .setThumbnail(
            `http://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileIconId}.png`
          )
          .setDescription(array_1.join('\n'));

        embeds_matches.push(embed_1);
      }

      if (lastPlayedMatch[2]) {
        disable_2 = false;
        const { time, mode, map, spells } = lastPlayedMatch[2];
        const {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
        } = lastPlayedMatch[2].stats;
        const { name: championName } = lastPlayedMatch[2].stats.champion;

        const array_2 = [
          `${GetMapNameSpanish(map)} (${mode}) (${time[1]}).`,
          `${win ? '🟢 Victoria' : '🔴 Derrota'}.`,
          `${
            deaths == 0 && kills > 0 ? 'KDA Perfecto' : 'No tuvo KDA Perfecto'
          }.`,
          `Jugó ${ChampionEmojis[String(championName)]} **${championName}**.`,
          `**KDA:** ${kills}/${deaths}/${assists} (${
            isNaN((kills + assists) / deaths)
              ? '00.0'
              : isInfinity((kills + assists) / deaths)
              ? '100.0'
              : ((kills + assists) / deaths).toFixed(1)
          }%).`,
          `**CS:** ${totalMinionsKilled + neutralMinionsKilled}.`,
          `**Hechizos:** ${SpellsEmojis[String(spells.summoner1Id)]}${
            SpellsEmojis[String(spells.summoner2Id)]
          }.`,
          `**Fecha:** ${time[0]}.`,
        ];

        const embed_2 = new MessageEmbed()
          .setColor(client._color)
          .setTitle('**Partida 3**')
          .setThumbnail(
            `http://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileIconId}.png`
          )
          .setDescription(array_2.join('\n'));

        embeds_matches.push(embed_2);
      }

      if (lastPlayedMatch[3]) {
        disable_3 = false;
        const { time, mode, map, spells } = lastPlayedMatch[3];
        const {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
        } = lastPlayedMatch[3].stats;
        const { name: championName } = lastPlayedMatch[3].stats.champion;

        const array_3 = [
          `${GetMapNameSpanish(map)} (${mode}) (${time[1]}).`,
          `${win ? '🟢 Victoria' : '🔴 Derrota'}.`,
          `${
            deaths == 0 && kills > 0 ? 'KDA Perfecto' : 'No tuvo KDA Perfecto'
          }.`,
          `Jugó ${ChampionEmojis[String(championName)]} **${championName}**.`,
          `**KDA:** ${kills}/${deaths}/${assists} (${
            isNaN((kills + assists) / deaths)
              ? '00.0'
              : isInfinity((kills + assists) / deaths)
              ? '100.0'
              : ((kills + assists) / deaths).toFixed(1)
          }%).`,
          `**CS:** ${totalMinionsKilled + neutralMinionsKilled}.`,
          `**Hechizos:** ${SpellsEmojis[String(spells.summoner1Id)]}${
            SpellsEmojis[String(spells.summoner2Id)]
          }.`,
          `**Fecha:** ${time[0]}.`,
        ];

        const embed_3 = new MessageEmbed()
          .setColor(client._color)
          .setTitle('**Partida 4**')
          .setThumbnail(
            `http://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileIconId}.png`
          )
          .setDescription(array_3.join('\n'));

        embeds_matches.push(embed_3);
      }

      if (lastPlayedMatch[4]) {
        disable_4 = false;
        const { time, mode, map, spells } = lastPlayedMatch[4];
        const {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
        } = lastPlayedMatch[4].stats;
        const { name: championName } = lastPlayedMatch[4].stats.champion;

        const array_4 = [
          `${GetMapNameSpanish(map)} (${mode}) (${time[1]}).`,
          `${win ? '🟢 Victoria' : '🔴 Derrota'}.`,
          `${
            deaths == 0 && kills > 0 ? 'KDA Perfecto' : 'No tuvo KDA Perfecto'
          }.`,
          `Jugó ${ChampionEmojis[String(championName)]} **${championName}**.`,
          `**KDA:** ${kills}/${deaths}/${assists} (${
            isNaN((kills + assists) / deaths)
              ? '00.0'
              : isInfinity((kills + assists) / deaths)
              ? '100.0'
              : ((kills + assists) / deaths).toFixed(1)
          }%).`,
          `**CS:** ${totalMinionsKilled + neutralMinionsKilled}.`,
          `**Hechizos:** ${SpellsEmojis[String(spells.summoner1Id)]}${
            SpellsEmojis[String(spells.summoner2Id)]
          }.`,
          `**Fecha:** ${time[0]}.`,
        ];

        const embed_4 = new MessageEmbed()
          .setColor(client._color)
          .setTitle('**Partida 5**')
          .setThumbnail(
            `http://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${profileIconId}.png`
          )
          .setDescription(array_4.join('\n'));

        embeds_matches.push(embed_4);
      }

      const btns = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId('game_2')
          // .setEmoji('2️⃣')
          .setDisabled(disable_1)
          .setLabel('Partida 2')
          .setStyle('PRIMARY'),

        new MessageButton()
          .setCustomId('game_3')
          // .setEmoji('3️⃣')
          .setDisabled(disable_2)
          .setLabel('Partida 3')
          .setStyle('PRIMARY'),

        new MessageButton()
          .setCustomId('game_4')
          // .setEmoji('4️⃣')
          .setDisabled(disable_3)
          .setLabel('Partida 4')
          .setStyle('PRIMARY'),

        new MessageButton()
          .setCustomId('game_5')
          // .setEmoji('5️⃣')
          .setDisabled(disable_4)
          .setLabel('Partida 5')
          .setStyle('PRIMARY')
      );

      msg.edit({
        content: `> **${summonerName}** (${summonerLevel} - ${region.toUpperCase()}).`,
        embeds: [embeds_matches[0]],
        components: [btns],
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
          case 'game_2':
            await interaction.reply({
              embeds: [embeds_matches[1]],
              ephemeral: true,
            });
            break;

          case 'game_3':
            await interaction.reply({
              embeds: [embeds_matches[2]],
              ephemeral: true,
            });
            break;

          case 'game_4':
            await interaction.reply({
              embeds: [embeds_matches[3]],
              ephemeral: true,
            });
            break;

          case 'game_5':
            await interaction.reply({
              embeds: [embeds_matches[4]],
              ephemeral: true,
            });
            break;
        }
      });

      collector.on('end', () => {
        if (!msg.deleted) {
          if (btns.components[0].disabled == false)
            btns.components[0].setDisabled(true);

          if (btns.components[1].disabled == false)
            btns.components[1].setDisabled(true);

          if (btns.components[2].disabled == false)
            btns.components[2].setDisabled(true);

          if (btns.components[3].disabled == false)
            btns.components[3].setDisabled(true);
          msg.edit({
            components: [btns],
          });
        }
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
