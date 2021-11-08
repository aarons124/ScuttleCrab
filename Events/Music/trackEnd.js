const { Player } = require('erela.js');

module.exports = class TrackEnd {
  constructor(client) {
    this.client = client;
  }
  /**
   *
   * @param {Player} player
   */
  async run(player, track, payload) {
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

    if (client._skipvote.has(player.guild)) {
      return client._skipvote.delete(player.guild);
    }
  }
};
