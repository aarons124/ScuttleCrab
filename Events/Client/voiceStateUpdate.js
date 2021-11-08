const { MessageEmbed, VoiceState } = require('discord.js');
const delay = require('delay');

module.exports = class VoiceStateUpdate {
  constructor(client) {
    this.client = client;
  }
  /**
   *
   * @param {VoiceState} oldState
   * @param {VoiceState} newState
   * @returns
   */
  async run(oldState, newState) {
    /**
     * @type {import('../../Class/ClassClient')}
     */
    const client = this.client;
    try {
      const channel = newState.guild.channels.cache.get(
        newState.channel?.id ?? newState.channelId
      );

      const player = client._manager?.players.get(newState.guild.id);

      if (!player) return;
      if (!newState.guild.members.cache.get(client.user.id).voice.channelId) {
        player.destroy();
      }

      if (
        newState.id == client.user.id &&
        channel?.type == 'GUILD_STAGE_VOICE'
      ) {
        if (!oldState.channelId) {
          try {
            await newState.guild.me.voice
              .setSuppressed(false)
              .then(() => console.log(null));
          } catch (err) {
            player.pause(true);

            console.error(`[VOICESTATEUPDATE] ${err.message}`);
          }
        } else if (oldState.suppress !== newState.suppress) {
          player.pause(newState.suppress);
        }
      }

      if (oldState.id === client.user.id) return;
      if (!oldState.guild.members.cache.get(client.user.id).voice.channelId)
        return;

      if (
        oldState.guild.members.cache.get(client.user.id).voice.channelId ===
        oldState.channelId
      ) {
        if (
          oldState.guild.me.voice?.channel &&
          oldState.guild.me.voice.channel.members.filter((m) => !m.user.bot)
            .size === 0
        ) {
          const vcId = oldState.guild.me.voice.channel.id;
          await delay(20000);

          const vcMembers = oldState.guild.me.voice.channel?.members.size;
          if (!vcMembers || vcMembers === 1) {
            const newPlayer = client.manager?.players.get(newState.guild.id);
            newPlayer ? player.destroy() : player.destroy();
            const embed = new MessageEmbed(client, newState.guild)
              .setDescription(
                `Me fui  de <#${vcId}> porque estuve inactivo demasiado tiempo.`
              )
              .setColor(client._color);
            try {
              const c = client.channels.cache.get(player.textChannel);
              if (c)
                c.send({ embeds: [embed] }).then((m) =>
                  setTimeout(() => m.delete(), 30000)
                );
            } catch (err) {
              console.error(`[VOICESTATEUPDATE] ${err.message}`);
            }
          }
        }
      }
    } catch (error) {
      console.error(`[VOICESTATEUPDATE] ${error.message}`);
    }
  }
};
