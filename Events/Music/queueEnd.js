const { Player } = require('erela.js');
const { MessageEmbed } = require('discord.js');

module.exports = class QueueEnd {
  constructor(client) {
    this.client = client;
  }
  /**
   *
   * @param {Player} player
   */
  async run(player) {
    /**
     * @type {import('../../Class/ClassClient')}
     */
    const client = this.client;

    try {
      const channel = client.channels.cache.get(player.textChannel);
      const msg =
        (await channel.messages.fetch(player.lastMessage).catch(() => {})) ||
        false;
      if (msg) await msg.delete().catch(() => {});
    } catch (error) {
      console.error('[QUEUEEND] No se pudo eliminar el mensaje.');
    }

    try {
      const embed_finish = new MessageEmbed()
        .setColor(client._color)
        .setDescription(
          'Lista de reproducción vacía, dejando el canal de voz.'
        );
      client.channels.cache
        .get(player.textChannel)
        .send({ embeds: [embed_finish] });
      player.destroy();

      if (client._skipvote.has(player.guild)) {
        return client._skipvote.delete(player.guild);
      }
    } catch (error) {
      console.error(`[QUEUEEND] ${error.message}`);
    }
  }
};
