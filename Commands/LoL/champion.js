const Command = require('../../Class/ClassCommand.js');
const SummonerData = require('../../Class/ClassSummonerData.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require('discord.js');

module.exports = class ChampionCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'champion',
      commandAliases: ['champ'],
      commandDescription: 'Da información respecto a un campeón.',
      commandUsage: 'champion [campeón]',
      commandUsageExample: 'champion Diana',
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
      const abilities = ['Q', 'W', 'E', 'R'];
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
      const tags = {
        Mage: 'Mago',
        Marksman: 'Tirador',
        Support: 'Soporte',
        Fighter: 'Peleador',
        Tank: 'Tanque',
        Assassin: 'Asesino',
      };

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

      const summonerData = new SummonerData('lan', 'Moonlight Diana');
      const patch = await summonerData.getCurrentPatch();
      const champ_info = await summonerData.getChampionByName(champAPIRiot);

      const statisticsArray = [
        `**Ataque:** ${champ_info.info.attack}.`,
        `**Defensa:** ${champ_info.info.defense}.`,
        `**Daño mágico:** ${champ_info.info.magic}.`,
        `**Dificultad:** ${champ_info.info.difficulty}.`,
        `**Vida:** ${champ_info.stats.hp} (${champ_info.stats.hpperlevel} / Nivel).`,
        `**Regeneración de vida:** ${champ_info.stats.hpregen} (${champ_info.stats.hpregenperlevel} / Nivel).`,
        `**Maná:** ${champ_info.stats.mp} (${champ_info.stats.mpperlevel} / Nivel).`,
        `**Regeneración de maná:** ${champ_info.stats.mpregen} (${champ_info.stats.mpregenperlevel} / Nivel).`,
        `**Recurso:** ${champ_info.partype}.`,
        `**Armadura:** ${champ_info.stats.armor} (${champ_info.stats.armorperlevel} / Nivel).`,
        `**Daño de ataque:** ${champ_info.stats.attackdamage} (${champ_info.stats.attackdamageperlevel} / Nivel).`,
        `**Rango de ataque:** ${champ_info.stats.attackrange}.`,
        `**Daño crítico:** ${champ_info.stats.crit} (${champ_info.stats.critperlevel} / Nivel).`,
        `**Velocidad de ataque:** ${champ_info.stats.attackspeed} (${champ_info.stats.attackspeedperlevel} / Nivel).`,
        `**Velocidad de movimiento:** ${champ_info.stats.movespeed}.`,
        `**Bloqueo de hechizo:** ${champ_info.stats.spellblock} (${champ_info.stats.spellblockperlevel} / Nivel).`,
      ];

      if (champ_info.lore.length > 4096)
        champ_info.lore = `${String(champ_info.lore).substr(0, 4090)}...`;

      const embed_lore = new MessageEmbed()
        .setColor(client._color)
        .setTitle(
          `> ${champ_info.name}, ${client._capitalize(champ_info.title)} `
        )
        .setThumbnail(
          `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ_info.image.full}`
        )
        .setDescription(champ_info.lore)
        .addField(
          'Tags:',
          champ_info.tags.map((x) => `**${tags[`${x}`]}**`).join(', ') + '.' ||
            'No tiene.'
        );

      const embed_skins = new MessageEmbed()
        .setColor(client._color)
        .setTitle('> Skins')
        .setThumbnail(
          `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ_info.image.full}`
        )
        .setDescription(
          champ_info.skins
            .filter((x) => x.name !== 'default')
            .map(
              (x, i) =>
                `**${i + 1}.** [${client._capitalize(
                  x.name
                )}](https://process.filestackapi.com/AhTgLagciQByzXpFGRI0Az/output=format:png/http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champAPIRiot}_${
                  x.num
                }.jpg)`
            )
            .join('.\n') + '.' || 'No tiene.'
        );

      const embed_stats = new MessageEmbed()
        .setTitle('> Estadísticas iniciales')
        .setDescription(statisticsArray.join('\n'))
        .addField(
          'Habilidades:',
          `**Pasiva:** ${champ_info.passive.name}.\n${champ_info.spells
            .map((spell, i) => `**${abilities[i]}:** ${spell.name}`)
            .join('.\n')}.`
        )
        .setColor(client._color)
        .setThumbnail(
          `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ_info.image.full}`
        );

      const arrayTips = [
        `**Aliado:**\n${champ_info.allytips
          .map((x, i) => `**${i + 1}.** ${x}`)
          .join('\n')}`,
        `\n**Enemigo:**\n${champ_info.enemytips
          .map((x, i) => `**${i + 1}.** ${x}`)
          .join('\n')}`,
      ];
      const embed_tips = new MessageEmbed()
        .setTitle('> Sugerencias')
        .setColor(client._color)
        .setDescription(arrayTips.join('\n'))
        .setThumbnail(
          `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ_info.image.full}`
        );

      const btns = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId('skins')
          .setLabel('Skins')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('stats')
          .setLabel('Estadísticas')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId('tips')
          .setLabel('Sugerencias')
          .setStyle('PRIMARY')
      );

      const msg = await message.channel.send({
        embeds: [embed_lore],
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
          case 'skins':
            interaction.reply({
              embeds: [embed_skins],
              ephemeral: true,
            });
            break;

          case 'stats':
            interaction.reply({
              embeds: [embed_stats],
              ephemeral: true,
            });
            break;

          case 'tips':
            interaction.reply({
              embeds: [embed_tips],
              ephemeral: true,
            });
            break;
        }
      });

      collector.on('end', () => {
        if (!msg.deleted) {
          btns.components[0].setDisabled(true);
          btns.components[1].setDisabled(true);
          btns.components[2].setDisabled(true);
          msg.edit({
            components: [btns],
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
