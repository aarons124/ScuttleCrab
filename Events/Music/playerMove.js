const { Message, MessageEmbed } = require('discord.js');
const { Player } = require('erela.js');

module.exports = class PlayerMove {
  constructor(client) {
    this.client = client;
  }
  /**
   *
   * @param {Player} player
   * @param {Message} oldChannel
   * @param {Message} newChannel
   * @returns
   */
  async run(player, oldChannel, newChannel) {
    /**
     * @type {import('../../Class/ClassClient')}
     */
    const client = this.client;
    if (!newChannel) {
      const embed = new MessageEmbed()
        .setColor(client._color)
        .setDescription(
          `Desconectado de <#${player.voiceChannel}> exitosamente.`
        );

      client.channels.cache.get(player.textChannel).send({
        embeds: [embed],
      });
      return player.destroy();
    }

    player.voiceChannel = newChannel;
    player.pause(true);
    setTimeout(async () => {
      player.pause(false);
    }, 3000);
  }
};
