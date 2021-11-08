const Command = require('../../Class/ClassCommand.js');
const {
  Message,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  version,
} = require('discord.js');
const Axios = require('axios').default;
const fabricio = require('@fabricio-191/ms');

module.exports = class MeCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'aboutme',
      commandAliases: ['stats', 'botinfo', 'bot'],
      commandDescription: 'Muestra datos sobre mí.',
      commandUsage: 'me',
      commandUsageExample: 'me',
      commandCategory: 'utility',
      commandCooldown: 8,
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
      const { data } = await Axios.get(
        `https://api.statcord.com/v3/${client.user.id}/aggregate`
      );

      const buttons = new MessageActionRow().addComponents(
        new MessageButton()
          // .setEmoji('😳')
          .setStyle('LINK')
          .setLabel('Invitación')
          .setURL('https://invite.scuttlecrab.ml/'),
        new MessageButton()
          // .setEmoji(client._emojis.face_with_monocle)
          .setStyle('LINK')
          .setLabel('Soporte')
          .setURL('https://discord.gg/pE6efwjXYJ')
      );

      const array_stats = [
        `**Comandos:** ${client._commands.size}.`,
        `**Comandos usados:** ${data.data.totalCommands}.`,
        `**Conexiones a voz:** ${client._manager.players.size}.`,
        `**Servidores:** ${client.guilds.cache.size}.`,
        `**Usuarios:** ${client.guilds.cache
          .reduce((c, v) => c + v.memberCount, 0)
          .toLocaleString()}.`,
        `**Ping:** ${client.ws.ping}ms.`,
      ];
      const array_system = [
        `**Devs:** Fabrizio 🌸#1663 y Kirzu~#3444.`,
        // `**Lenguaje:** JavaScript.`,
        `**Librería:** Discord.js ${version}.`,
        `**Tiempo de actividad:** ${fabricio(client.uptime, {
          long: false,
          language: 'es',
          length: 4,
        })}.`,
        `**Memoria usada:** ${formatBytes(
          process.memoryUsage().heapUsed
        )} / ${formatBytes(process.memoryUsage().heapTotal)}.`,
      ];

      const embed_success = new MessageEmbed()
        .setColor(client._color)
        .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
        // .setTitle(`> ${client.user.username}`)
        .addField(
          '> Información pública:',
          array_stats.join('\n')
          // `\`\`\`\n${array_stats.join('\n')}\n\`\`\``
        )
        .addField(
          '> Sistema:',
          array_system.join('\n')
          // `\`\`\`\n${array_system.join('\n')}\n\`\`\``
        );

      message.channel.send({
        // content: '> Mis estadísticas.',
        embeds: [embed_success],
        components: [buttons],
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

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}
