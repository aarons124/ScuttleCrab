const { model, Schema } = require('mongoose');

const SummonerSchema = new Schema({
  userId: { type: String },
  summonerRegion: { type: String },
  summonerName: { type: String },
});

module.exports = model('summoner', SummonerSchema);
