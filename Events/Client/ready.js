// const express = require('express');
// const app = express();

const topgg = require('@top-gg/sdk');
// const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
// const webhook = new topgg.Webhook('scuttlecrabbot');
const { AutoPoster } = require('topgg-autoposter');
// const axios = require('axios').default;

module.exports = class Ready {
  constructor(client) {
    this.client = client;
  }
  async run() {
    /**
     * @type {import('../../Class/ClassClient')}
     */
    const client = this.client;
    client._manager.init(client.user.id);

    client.user.setPresence({
      activities: [
        {
          name: 'La Grieta Del Invocador',
          type: 'WATCHING',
        },
      ],
      status: 'dnd',
    });

    await client._statCord.autopost();

    console.log(`[READY] ${client.user.tag} is ready.`);

    const ap = AutoPoster(process.env.TOP_GG, client);

    ap.on('posted', () => {
      console.log('Estadisticas del bot posteadas');
    });

    /*
    app.post(
      '/dblwebhook',
      webhook.listener(async (vote) => {
        const user = await client.api.users(vote.user);
        const array = [
          `**Usuario:** \`${user.tag}\`.`,
          `**Votos totales:** \`${
            vote.isWeekend ? data.points + 2 : data.points + 1
          }\`.`,
          `**Votos del mes:** \`${
            vote.isWeekend ? data.monthlyPoints + 2 : data.monthlyPoints + 1
          }\`.`,
          `**Voto doble:** \`${vote.isWeekend ? 'Sí' : 'No'}\`.`,
        ];

        client.guilds.cache
          .get('903135230125281320')
          .channels.cache.get('903718595052322847')
          .send({
            embeds: [
              new MessageEmbed()
                .setColor(client._color)
                .setTitle(
                  '<:cathappy:879085863294877800> `|` Un usuario ha votado'
                )
                .setDescription(array.join('\n'))
                .setFooter(
                  '¡Muchas gracias por votar! Puedes hacerlo cada 12 horas.'
                )
                .setThumbnail(user.displayAvatarURL({ dynamic: true })),
            ],
            components: [
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setLabel('Vote por mí')
                  .setEmoji(client._emojis.sparkles)
                  .setStyle('LINK')
                  .setURL('https:top.gg/bot/855554329897336852/vote')
              ),
            ],
          });
      })
    );
    app.listen(3000, () => {
      console.log('Escuchando el puerto: 3000.');
    });
*/
  }
};
