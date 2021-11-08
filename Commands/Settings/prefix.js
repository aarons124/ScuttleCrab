const Command = require('../../Class/ClassCommand.js');
const SchemaPrefix = require('../../Database/Schema/CustomPrefix.js');
const _errorEmbed = require('../../Functions/ErrorEmbed');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class PrefixCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'prefix',
      commandAliases: [],
      commandDescription:
        'Cambia o elimina un prefijo personalizado en el servidor.',
      commandUsage: 'prefix [set / delete] (nuevo prefijo)',
      commandUsageExample: 'prefix set !!',
      commandCategory: 'settings',
      commandCooldown: 5,
      commandPermissionsBot: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'],
      commandPermissionsUser: ['MANAGE_GUILD'],
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
      if (!message.member.permissions.has('MANAGE_GUILD')) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted no tiene el permiso requerido para la ejecución del comando.`,
          true,
          'Permiso requerido:',
          `Manage guild.`
        );
      }

      if (!args[0]) {
        return _errorEmbed(
          message,
          client._colors.red,
          `> Comando __${client._capitalize(this._information.commandName)}__`,
          `${client._emojis.no_entry_sign} Usted debe ingresar la acción que quiere realizar.`,
          true,
          'Uso correcto:',
          `${await client._guildPrefix(message)}${
            this._information.commandName
          } [set / delete]`
        );
      }

      switch (args[0]) {
        case 'set':
          if (!args[1]) {
            return _errorEmbed(
              message,
              client._colors.red,
              `> Comando __${client._capitalize(
                this._information.commandName
              )}__`,
              `${client._emojis.no_entry_sign} Usted debe ingresar el nuevo prefijo para el servidor.`,
              true,
              'Uso correcto:',
              `${await client._guildPrefix(message)}${
                this._information.commandName
              } set [nuevo prefijo]`
            );
          }

          if (args[1].length > 4) {
            return _errorEmbed(
              message,
              client._colors.red,
              `> Comando __${client._capitalize(
                this._information.commandName
              )}__`,
              `${client._emojis.no_entry_sign} Usted debe ingresar un prefijo que no supere los 3 caracteres.`,
              false
            );
          }

          const findOnePrefix = await SchemaPrefix.findOne({
            guildID: message.guild.id,
          });

          const ServerPrefix = new SchemaPrefix({
            guildID: message.guild.id,
            prefix: args[1],
          });

          findOnePrefix
            ? await SchemaPrefix.updateOne(
                { guildID: message.guild.id },
                { prefix: args[1] }
              )
            : await ServerPrefix.save();
          message.channel.send({
            embeds: [
              new MessageEmbed()
                .setColor(client._color)
                .setTitle('> ¡Enhorabuena!')
                .setDescription(
                  `El prefijo ha sido establecido exitosamente, mi nuevo prefijo en el servidor es **${args[1]}**.`
                ),
            ],
          });
          break;

        case 'delete':
          const Borrar_Prefix = await SchemaPrefix.findOneAndDelete({
            guildID: message.guild.id,
          });
          if (!Borrar_Prefix) {
            return _errorEmbed(
              message,
              client._colors.red,
              `> Comando __${client._capitalize(
                this._information.commandName
              )}__`,
              `${client._emojis.no_entry_sign} No hay un prefix personalizado en el servidor.`,
              false
            );
          }

          message.channel.send({
            embeds: [
              new MessageEmbed()
                .setColor(client._color)
                .setTitle('> ¡Enhorabuena!')
                .setDescription(
                  `El prefijo ha sido restablecido, el prefix actual es **${await client._guildPrefix(
                    message
                  )}**.`
                ),
            ],
          });

          break;

        default:
          _errorEmbed(
            message,
            client._colors.red,
            `> Comando __${client._capitalize(
              this._information.commandName
            )}__`,
            `${client._emojis.no_entry_sign} Usted debe ingresar una acción válida.`,
            true,
            'Uso correcto:',
            `${await client._guildPrefix(message)}${
              this._information.commandName
            } [set / delete]`
          );
          break;
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
