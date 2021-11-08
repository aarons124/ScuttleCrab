const { MessageEmbed } = require('discord.js');

function _errorEmbed(
  message,
  embedColor,
  embedTitle,
  embedDescription,
  field = false,
  embedFieldTitle,
  embedFieldValue
) {
  const embedReady = new MessageEmbed()
    .setTitle(embedTitle)
    .setDescription(embedDescription)
    .setColor(embedColor);
  if (field === true) {
    embedReady.addField(embedFieldTitle, embedFieldValue);
  }

  return message.channel.send({ embeds: [embedReady] });
}

module.exports = _errorEmbed;
