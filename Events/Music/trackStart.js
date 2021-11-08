const { removeMarkdown } = require('../../Functions/RemoveMarkdown');
const { MessageEmbed } = require('discord.js');

module.exports = class TrackStart {
  constructor(client) {
    this.client = client;
  }
  async run(player, track) {
    /**
     * @type {import('../../Class/ClassClient')}
     */

    const client = this.client;

    try {
      if (client._skipvote.has(player.guild)) {
        return client._skipvote.delete(player.guild);
      }

      const channel = client.channels.cache.get(player.textChannel);
      const embed_playing = new MessageEmbed()
        .setDescription(
          `Reproduciendo __**[${removeMarkdown(track.title)}](${
            track.uri
          })**__ pedida por <@!${track.requester.id}>.`
        )
        .setColor(client._color);
      const lastMessage = await channel
        .send({ embeds: [embed_playing] })
        .catch((error) => {
          console.error(`[TRACKSTART] ${error.message}.`);
        });
      player.lastMessage = lastMessage?.id;
    } catch (error) {
      console.error(`[TRACKSTART] ${error.message}.`);
    }
  }
};
