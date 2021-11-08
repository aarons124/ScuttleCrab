const Command = require('../../Class/ClassCommand.js');
const {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require('discord.js');

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      commandName: 'help',
      commandAliases: ['h'],
      commandDescription:
        'Muestra los comandos del bot y también puede proporcionar información acerca de un comando.',
      commandUsage: 'help',
      commandUsageExample: 'help',
      commandCategory: 'utility',
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
      const prefix = await client._guildPrefix(message);
      const directories = [
        ...new Set(
          client._commands
            .filter((x) => x._information.commandCategory !== 'private')
            .map((x) => x._information.commandCategory)
        ),
      ];

      const categories = directories.map((x) => {
        const getCommands = client._commands
          .filter((cmd) => cmd._information.commandCategory === x)
          .map((x) => {
            return {
              usage: `${prefix}${x._information.commandUsage}`,
              description: String(
                x._information.commandDescription ||
                  'No hay descripción para este comando.'
              ),
            };
          });

        return {
          category: x,
          commands: getCommands,
        };
      });

      const embed_mainPage = new MessageEmbed()
        .setTitle('> Comando de ayuda')
        .setColor(client._color)
        .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
        .setDescription(
          'Hey, bienvenid@ a la sección de ayuda el bot.\nSelecciona la categoría para ver sus comandos.'
        )
        .addField(
          '📚 Lista de categorias:',
          ['League Of Legends.', 'Música.', 'Utilidad.', 'Ajustes.'].join('\n')
        )
        .addField(
          '🔍 Simbología:',
          [
            '`[]` Significa que el argumento es obligatorio.',
            '`()` Significa que el argumento es opcional.',
            '__Recuerda no ingresar los signos al momento de ejecutar el comando__.',
          ].join('\n')
        )
        .addField(
          '🔗 Enlaces',
          [
            '[Invitación](https://invite.scuttlecrab.ml)',
            '[Soporte](https://discord.gg/pE6efwjXYJ)',
            '[Top.gg](https://top.gg/bot/855554329897336852/vote)',
          ].join(' | ')
        );

      const component = (boolean, placeHolder) => [
        new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setPlaceholder(placeHolder)
            .setDisabled(boolean)
            .setCustomId('help_menú')
            .addOptions(
              categories.map((cmd) => {
                return {
                  value: cmd.category?.toLowerCase(),
                  label: getInfo(cmd.category?.toLowerCase())['name'],
                  description: getInfo(cmd.category?.toLowerCase())['desc'],
                  emoji: getInfo(cmd.category?.toLowerCase())['emoji'],
                };
              })
            )
        ),
      ];

      const msg = await message.channel.send({
        embeds: [embed_mainPage],
        components: component(false, 'Estás en la página principal'),
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
        componentType: 'SELECT_MENU',
        time: 50000,
      });

      collector.on('collect', async (i) => {
        const [x] = i.values;

        const find = categories.find((c) => c.category.toLowerCase() === x);

        const embed_category = new MessageEmbed()
          .setColor(client._colors.deepskyblue)
          .setTitle(
            `> Comandos de ${getInfo(find.category?.toLowerCase())['name']}`
          )
          .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
          .setDescription(
            find.commands
              .map((x) => `\`${x.usage}\` : ${x.description.split('.')[0]}.`)
              .join('\n')
          );

        await i.update({
          embeds: [embed_category],
          components: component(false, 'Selecciona otra categoría'),
        });
      });

      collector.on('end', async (i) => {
        await msg.edit({
          components: component(true, 'El tiempo útil del menú expiró'),
        });
      });
    } catch (error) {
      console.error(error);
      message.channel.send({
        content: `Ha ocurrido un error. Aquí el debug:\n${client._markdown(
          error.message,
          'js'
        )}`,
      });
    }
  }
};

function getInfo(str) {
  let name;
  let emoji;
  let desc;

  switch (str) {
    case 'lol':
      name = 'League of Legends';
      emoji = '🎮';
      desc = 'Obtén información de como mejorar en LoL.';
      break;
    case 'music':
      name = 'Música';
      emoji = '🎵';
      desc = 'Disfruta de buena música con tus amigos.';
      break;
    case 'utility':
      name = 'Utilidad';
      emoji = '🌐';
      desc = 'Obtén información acerca de tus miembros del servidor.';
      break;
    case 'settings':
      name = 'Ajustes';
      emoji = '🧾';
      desc = 'Configúrame a tu gusto.';
      break;
    case 'private':
      name = 'Desarrolladores';
      emoji = '🔒';
      desc = 'Genial! Eres mi desarrollador.';
      break;

    default:
      name = 'Desconocido';
      emoji = '❌';
      desc = 'Sin información.';
  }

  return { name, emoji, desc };
}

/*
function handleCategory(interaction) {

}

function handleCategories(interaction, mainMenu, categories) {
  const categoryEmbed = (category) => new MessageEmbed()
      .setColor(interaction.client._colors.deepskyblue)
      .setTitle(`> ${category.category.description}`)
      .setDescription(
        category.commands
          .map((cmd) => `\`${cmd._information.commandUsage}\`: ${cmd._information.commandDescription  }`)
          .join('\n')
      )
      .addField(
        `${interaction.client._emojis.mage} Simbología:`,
        [
          '`[]` Significa que el argumento es obligatorio.',
          '`()` Significa que el argumento es opcional.',
          'Recuerda no incluir `[]` o `()` cuando uses el comando',
        ].join('\n')
      )
      .addField(
        `${interaction.client._emojis.sparkles} Tip:`,
        `Únete al servidor de [soporte](https://discord.gg/pE6efwjXYJ) para recibir ayuda extra.`
      )
  const menu = (category) => new MessageActionRow().addComponents(
    new MessageSelectMenu()
        .setOptions(...category.commands.map((x) => ({
          description: x._information.commandDescription.slice(0, 100),
          value: x._information.commandName?.toLowerCase(),
          label: x._information.commandUsage
        })), {
        emoji: '◀️',
        value: 'back',
        label: 'Volver',
        description: 'Regresa al menú principal.'
      })
      .setCustomId('help_category')
  );
  const find = (name) => categories.find((x) => x.category.value === name);
  switch (interaction.values[0]?.toLowerCase()) {
    case 'lol':
      interaction.update({
        embeds: [categoryEmbed(find('lol'))],
        components: [menu(find('lol'))]
      });
      break;
    case 'music':
      interaction.update({
        embeds: [categoryEmbed(find('music'))],
        components: [menu(find('music'))]
      });
      break;
    case 'settings':
      interaction.update({
        embeds: [categoryEmbed(find('settings'))],
        components: [menu(find('settings'))]
      });
      break;
    case 'utility':
      interaction.update({
        embeds: [categoryEmbed(find('utility'))],
        components: [menu(find('utility'))]
      });
      break;
    case 'private':
    default:
      interaction.update({
        embeds: [categoryEmbed(find('private'))],
        components: [menu(find('private'))]
      });
      break;
  }
}

function parseCategory(id) {
  let data = {};
  switch (id) {
    case 'lol':
      data['label'] = 'League of Legends';
      data['emoji'] = '🎮';
      break;
    case 'music':
      data['label'] = 'Música';
      data['emoji'] = '🎵';
      break;
    case 'settings':
      data['label'] = 'Ajustes';
      data['emoji'] = '⚙';
      break;
    case 'utility':
      data['label'] = 'Utilidad';
      data['emoji'] = '📜';
      break;
    case 'private':
    default:
      data['label'] = 'Desarrolladores';
      data['emoji'] = '🔒';
    break;
  }
  data = {
    ...data,
    description: `Comandos de ${data.label}`,
    value: id
  }

  return data;
}


      const dirNames = [
        ...new Set(
          client._commands
          .map((x) => x._information.commandCategory?.toLowerCase())
          .filter((x) => x !== 'private')
        ),
      ];
      const categories = dirNames.map((dir) => ({
        category: parseCategory(dir),
        commands: client._commands.filter((cmd) => cmd._information.commandCategory?.toLowerCase() === dir)
      }));

      const embed_help = new MessageEmbed()
        .setTitle('> Comandos')
        .setColor(client._color)
        .setDescription('Selecciona una categoría del menú de abajo.')
        .addField(
          '¿Necesitas más ayuda?',
          'Puedes unirte al servidor de [soporte](https://discord.gg/pE6efwjXYJ) para obtener más ayuda.'
        );

      const menu = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId('help_menu')
            .setPlaceholder('Selecciona la categoría')
            .addOptions(...categories.map((x) => x.category))
        )

      const helpMessageEmbed = await message.channel.send({
        embeds: [embed_help],
        components: [menu]
      });

      const collector = helpMessageEmbed.createMessageComponentCollector({
        filter: (i) => i.user.id === message.author.id,
        time: 30000
      });

      collector.on('collect', async (interaction) => {
        switch (interaction.customId) {
          case 'help_menu':
            handleCategories(interaction, menu, categories);
            break;
          case 'help_category':
            break;
          default:
            interaction.deferUpdate();
            break;
        }
        return;
      });

      collector.on('end', () => {
        menu.components[0].setDisabled(true)
        helpMessageEmbed.edit({
          components: [menu],
        });
      });
*/
