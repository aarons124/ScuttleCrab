const { Message, MessageEmbed } = require('discord.js');
/**
 *
 * @param {Message} message
 * @param {import("../Class/ClassClient")} client
 * @param {MessageEmbed[]} embeds
 * @returns
 */

async function _paginationEmbed(client, message, time, embeds) {
  let currentPage = 0;
  if (embeds.length === 1) return message.channel.send({ embeds: [embeds[0]] });
  let msg = await message.channel.send({
    embeds: [embeds[currentPage]],
    content: `**Página actual:** ${currentPage + 1}/${embeds.length}.`,
  });
  let reactionemojis = ['⬅️', '⏹️', '➡️'];
  try {
    for (const emoji of reactionemojis) await msg.react(emoji);
  } catch (error) {
    console.error(`[PAGINATIONEMBED] ${error.message}.`);
  }

  const filter = (reaction, user) =>
    [
      client._emojis.arrow_backward,
      client._emojis.stop_button,
      client._emojis.arrow_forward,
    ].includes(reaction.emoji.name) && message.author.id === user.id;
  const collector = msg.createReactionCollector({
    filter: filter,
    time: time,
  });

  collector.on('collect', async (reaction) => {
    try {
      if (
        reaction.emoji.name === reactionemojis[2] ||
        reaction.emoji.id === reactionemojis[2]
      ) {
        if (currentPage < embeds.length - 1) {
          currentPage++;
          msg.edit({
            content: `**Página actual:** ${currentPage + 1}/${embeds.length}.`,
            embeds: [embeds[currentPage]],
          });
        } else {
          currentPage = 0;
          msg.edit({
            content: `**Página actual:** ${currentPage + 1}/${embeds.length}.`,
            embeds: [embeds[currentPage]],
          });
        }
        if (message.channel.permissionsFor(client.user).has('ADD_REACTIONS')) {
          await reaction.users.remove(message.author.id);
        }
      } else if (
        reaction.emoji.name === reactionemojis[0] ||
        reaction.emoji.id === reactionemojis[0]
      ) {
        if (currentPage !== 0) {
          --currentPage;
          msg.edit({
            content: `**Página actual:** ${currentPage + 1}/${embeds.length}.`,
            embeds: [embeds[currentPage]],
          });
        } else {
          currentPage = embeds.length - 1;
          msg.edit({
            content: `**Página actual:** ${currentPage + 1}/${embeds.length}.`,
            embeds: [embeds[currentPage]],
          });
        }
        if (message.channel.permissionsFor(client.user).has('ADD_REACTIONS')) {
          await reaction.users.remove(message.author.id);
        }
      } else {
        if (message.channel.permissionsFor(client.user).has('ADD_REACTIONS')) {
          await reaction.message.reactions.removeAll();
        }
        collector.stop();
      }
      if (message.channel.permissionsFor(client.user).has('ADD_REACTIONS')) {
        await reaction.users.remove(message.author.id);
      }
    } catch (error) {
      console.error(`[PAGINATIONEMBED] ${error.message}.`);
    }
  });
}

module.exports = _paginationEmbed;
