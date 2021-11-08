const fabricio = require('@fabricio-191/ms');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class MessageCreate {
  constructor(client) {
    this.client = client;
  }
  /**
   *
   * @param {Message} message
   * @returns
   */
  async run(message) {
    /**
     * @type {import('../../Class/ClassClient')}
     */
    const client = this.client;
    if (message.channel.type === 'dm') return;
    if (!message.guild) return;
    if (message.author.bot) return;
    const prefix = await client._guildPrefix(message);

    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(client._color)
            .setTitle(`> ¡Hola ${message.author.username}!`)
            .setDescription(
              `${client._emojis.face_with_monocle} Mi prefijo en el servidor es: **${prefix}**.`
            ),
        ],
      });
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content
      .substring(prefix.length)
      .trimEnd()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd =
      client._commands.get(command) ||
      client._commands.find((c) =>
        c._information.commandAliases.includes(command)
      );
    if (!cmd) return;

    await client._statCord.postCommand(
      cmd._information.commandName,
      message.author.id
    );

    if (!message.guild.me.permissions.has('SEND_MESSAGES')) {
      return message.author
        .send({
          embeds: [
            new MessageEmbed()
              .setColor(client._colors.yellow)
              .setTitle('> ¡Advertencia!')
              .setDescription(
                [
                  `${client._emojis.warning} No tengo el permiso **Send Messages** para mi uso correcto.`,
                  `Servidor: **${message.guild.name}**.`,
                  `Canal: <#${message.channel.id}>.`,
                ].join('\n')
              ),
          ],
        })
        .catch((error) => {
          console.error(`[MESSAGECREATE] ${error.message}.`);
        });
    }

    if (!message.guild.me.permissions.has('EMBED_LINKS')) {
      return message.author
        .send({
          embeds: [
            new MessageEmbed()
              .setColor(client._colors.yellow)
              .setTitle('> ¡Advertencia!')
              .setDescription(
                [
                  `${client._emojis.warning} No tengo el permiso **Embed Links** para mi uso correcto.`,
                  `Servidor: **${message.guild.name}**.`,
                  `Canal: <#${message.channel.id}>.`,
                ].join('\n')
              ),
          ],
        })
        .catch((error) => {
          console.error(`[MESSAGECREATE] ${error.message}.`);
        });
    }

    if (
      cmd._configuration.onlyDevs &&
      !client._devs.includes(message.author.id)
    ) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(client._colors.red)
            .setTitle('> ¡Ups!')
            .setDescription(
              `${client._emojis.lock} Este comando solo está disponible para los desarrolladores.`
            ),
        ],
      });
    }

    if (
      !cmd._configuration.isEnable &&
      !client._devs.includes(message.author.id)
    ) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(client._colors.red)
            .setTitle('> ¡Ups!')
            .setDescription(
              `${client._emojis.tools} Este comando no está disponible para el público ya que se encuentra en mantenimiento.`
            ),
        ],
      });
    }

    const cooldown = client._cooldowns;
    const id =
      message.author.id +
      cmd._information.commandName +
      cmd._information.commandAliases.join(' ');
    const tiempo = cmd._information.commandCooldown * 1000;

    if (!client._devs.includes(message.author.id) && cooldown.has(id)) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle('> Tiempo de espera')
            .setColor(client._colors.yellow)
            .setDescription(
              `${client._emojis.stopwatch} Usted debe esperar **${fabricio(
                cooldown.get(id) - Date.now(),
                {
                  long: true,
                  language: 'es',
                  length: 1,
                }
              )}** para volver a usar ese comando.`
            ),
        ],
      });
    }

    if (cmd) cmd.run(message, args);

    cooldown.set(id, Date.now() + tiempo);
    setTimeout(() => {
      cooldown.delete(id);
    }, tiempo);
  }
};
