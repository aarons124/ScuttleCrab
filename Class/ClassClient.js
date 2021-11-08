const { Client, Collection } = require('discord.js');
const { config } = require('dotenv');
const Statcord = require('statcord.js');
const CommandHandler = require('../Handler/CommandHandler');
const EventHandler = require('../Handler/EventHandler');
const MusicHandler = require('../Handler/MusicHandler');
const SchemaPrefix = require('../Database/Schema/CustomPrefix');

config();
class ScuttleClient extends Client {
  constructor() {
    super({ intents: 1665 });
    this._devs = ['221399196480045056', '686766483350880351'];
    this.sep = require('path').sep;
    this._commands = new Collection();
    this._cooldowns = new Collection();
    this._skipvote = new Map();
    this._color = '#9126d0';
    this._colors = require('../Json/Colores.json');
    this._emojis = require('../Json/Emojis.json');
    this._statCord = new Statcord.Client({
      client: this,
      key: process.env.STATCORD_KEY,
      postCpuStatistics: false,
      postMemStatistics: false,
      postNetworkStatistics: false,
    });
  }

  async _loader(route, name) {
    try {
      const cmds = new (require(`.${route}${require('path').sep}${name}`))(
        this
      );
      cmds._information._direction = route;
      if (cmds.init) cmds.init(this);
      this._commands.set(cmds._information.commandName, cmds);
    } catch (error) {
      console.error(`[CLIENT] ${error.message}`);
    }
  }

  async _guildPrefix(message) {
    if (!message.guild) return;
    return (
      (
        await SchemaPrefix.findOne({
          guildID: message.guild.id,
        }).catch(console.error)
      )?.prefix || 'sc!'
    );
  }

  _currentTime() {
    const date = new Date();
    const hour = date.toLocaleString('en-US', {
      timeZone: 'America/Mexico_City',
    });
    return hour;
  }

  _capitalize(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }
  _markdown(str, lang) {
    return `\`\`\`${lang}\n${str}\n\`\`\``;
  }

  _startBot() {
    require('../Database/index');
    CommandHandler(this);
    EventHandler(this);
    MusicHandler(this);
    this.login(process.env.DISCORD_TOKEN);
  }
}

module.exports = ScuttleClient;
