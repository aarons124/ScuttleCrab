const Command = require('../../Class/ClassCommand.js');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class ReloadCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'reload',
      commandAliases: ['cmd'],
      commandDescription: 'Recarga un comando.',
      commandUsage: 'reload [comando]',
      commandUsageExample: 'reload ping',
      commandCategory: 'private',
      commandCooldown: 0,
      commandPermissionsBot: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],
      commandPermissionsUser: [],
      onlyNsfwChat: false,
      argsReq: true,
      voteReq: false,
      onlyDevs: true,
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
      if (!args[0])
        return message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor(client._colors.red)
              .setTitle('> ¡Ups!')
              .setDescription(
                `${client._emojis.no_entry_sign} Debes ingresar un comando.`
              ),
          ],
        });

      const cmd =
        client._commands.get(args[0]) ||
        client._commands.find((c) =>
          c._information.commandAliases.includes(args[0])
        );
      if (!cmd)
        return message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor(client._colors.red)
              .setTitle('> ¡Ups!')
              .setDescription(
                `${client._emojis.no_entry_sign} El comando ingresado no es válido.`
              ),
          ],
        });

      const arrayCommand = Array();
      arrayCommand.push(
        cmd._information.commandCategory,
        cmd._information.commandName
      );

      client._commands.delete(arrayCommand[1]);
      delete require.cache[
        require.resolve(
          `../../Commands/${client._capitalize(arrayCommand[0])}/${
            arrayCommand[1]
          }.js`
        )
      ];
      const command = require(`../../Commands/${client._capitalize(
        arrayCommand[0]
      )}/${arrayCommand[1]}.js`);
      client._commands.set(arrayCommand[1], new command(client));
      const embed = new MessageEmbed()
        .setTitle('> ¡Enhorabuena!')
        .setColor(client._color)
        .setDescription(
          `El comando **${arrayCommand[1]}** ha sido recargado correctamente.`
        );
      message.channel.send({ embeds: [embed] });
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
