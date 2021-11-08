const axios = require('axios').default;
const fabricio = require('@fabricio-191/ms');
const SpellEmoji = require('../Json/Spells.json');

class SummonerData {
  constructor(region, username) {
    this.base_url = `https://${SummonerData.Region(
      region
    )}.api.riotgames.com/lol`;
    this.matches_url = SummonerData.twoRegion(region);
    this.username = username;
  }
  static Region(region) {
    region = region.toLowerCase();
    switch (region) {
      case 'ru':
      case 'kr':
        return region;
      case 'lan':
        return 'la1';
      case 'las':
        return 'la2';
      case 'oce':
        return 'oc1';
      case 'eune':
        return 'eun1';
      default:
        return `${region}1`;
    }
  }
  static twoRegion(region) {
    region = region.toLowerCase();
    switch (region) {
      case 'kr':
      case 'tr':
        return 'https://asia.api.riotgames.com/lol';

      case 'ru':
      case 'eune':
      case 'euw':
        return 'https://europe.api.riotgames.com/lol';

      case 'lan':
      case 'las':
      case 'oce':
      case 'na':
        return 'https://americas.api.riotgames.com/lol';
    }
  }

  async profileBasicData() {
    try {
      const url = `${
        this.base_url
      }/summoner/v4/summoners/by-name/${encodeURIComponent(
        this.username
      )}?api_key=${process.env.RIOT_API_TOKEN}`;
      const { data: basicData } = await axios.get(url);
      return basicData;
    } catch (err) {
      if (err.response.status == 401) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la `Development API Key` proporcionada por Riot Games ha expirado.'
        );
      }
      if (err.response.status == 404) {
        throw new Error('Este usuario no existe en la región actual.');
      }
      if (err.response.status == 400) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la petición o solicitud fue incorrecta.'
        );
      } else {
        throw new Error(
          'Se ha producido un error al intentar recuperar los datos del usuario.'
        );
      }
    }
  }
  async profileBasicDataBySummonerId(summonerId) {
    try {
      const url = `${this.base_url}/summoner/v4/summoners/${summonerId}?api_key=${process.env.RIOT_API_TOKEN}`;
      const { data: basicData } = await axios.get(url);
      return basicData;
    } catch (err) {
      if (err.response.status == 401) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la `Development API Key` proporcionada por Riot Games ha expirado.'
        );
      }
      if (err.response.status == 404) {
        throw new Error('Este usuario no existe en la región actual.');
      }
      if (err.response.status == 400) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la petición o solicitud fue incorrecta.'
        );
      } else {
        console.error(`[SUMMONERDATA] ${err.message}`);
        throw new Error(
          'Se ha producido un error al intentar recuperar los datos del usuario.'
        );
      }
    }
  }
  async getCurrentPatch() {
    const url = `https://ddragon.leagueoflegends.com/api/versions.json`;
    const { data } = await axios.get(url);
    return data[0];
  }
  async getChampionById(id) {
    const patch = await this.getCurrentPatch();
    const url = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/es_MX/champion.json`;
    const { data: response } = await axios.get(url);
    let champion = [];
    var champId;
    const champions = Object.keys(response.data);
    champions.forEach((champ) => {
      if (response.data[champ].key == id) {
        champId = response.data[champ].id;
      }
    });
    const url_2 = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/es_MX/champion/${champId}.json`;
    const { data: response_2 } = await axios.get(url_2);
    champion.push(response_2.data[`${champId}`]);
    return champion[0];
  }
  async getChampionByName(name) {
    const patch = await this.getCurrentPatch();
    const championName = name;
    const url = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/es_MX/champion/${championName}.json`;
    const { data } = await axios.get(url);
    return data.data[`${championName}`];
  }
  async advencedMatchInfo(gameId) {
    const url = `${this.matches_url}/match/v5/matches/${gameId}?api_key=${process.env.RIOT_API_TOKEN}`;
    const { data: match } = await axios.get(url);
    return match;
  }
  async mostPlayedChampions(summonerId) {
    try {
      const url_mostPlayedChampions = `${this.base_url}/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${process.env.RIOT_API_TOKEN}`;
      const { data } = await axios.get(url_mostPlayedChampions);
      const mostPlayedChampions = data.slice(0, 3);
      const mostPlayedChampionsArray = [];
      for await (const champion of mostPlayedChampions) {
        const {
          championId,
          championLevel: level,
          championPoints: points,
        } = champion;
        const { name } = await this.getChampionById(championId);
        mostPlayedChampionsArray.push({ name, points, level });
      }
      return mostPlayedChampionsArray;
    } catch (err) {
      if (err.response.status == 401) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la `Development API Key` proporcionada por Riot Games ha expirado.'
        );
      }
      if (err.response.status == 400) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la petición o solicitud fue incorrecta.'
        );
      }
      console.error(`[SUMMONERDATA] ${err.message}`);
      throw new Error(
        'Se ha producido un error al intentar recuperar los campeones más jugados por el invocador.'
      );
    }
  }
  async most20PlayedChampions(summonerId) {
    try {
      const url_mostPlayedChampions = `${this.base_url}/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${process.env.RIOT_API_TOKEN}`;
      const { data } = await axios.get(url_mostPlayedChampions);
      const mostPlayedChampions = data.slice(0, 20);
      const mostPlayedChampionsArray = [];
      for await (const champion of mostPlayedChampions) {
        const {
          championId,
          championLevel: level,
          championPoints: points,
        } = champion;
        const { name } = await this.getChampionById(championId);
        mostPlayedChampionsArray.push({ name, points, level });
      }
      return mostPlayedChampionsArray;
    } catch (err) {
      if (err.response.status == 401) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la `Development API Key` proporcionada por Riot Games ha expirado.'
        );
      }
      if (err.response.status == 400) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la petición o solicitud fue incorrecta.'
        );
      }
      console.error(`[SUMMONERDATA] ${err.message}`);
      throw new Error(
        'Se ha producido un error al intentar recuperar los campeones más jugados por el invocador.'
      );
    }
  }
  async mostAllPlayedChampions(summonerId) {
    try {
      const url_mostPlayedChampions = `${this.base_url}/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${process.env.RIOT_API_TOKEN}`;
      const { data } = await axios.get(url_mostPlayedChampions);
      const mostPlayedChampions = data.slice(0, data.length);
      const mostPlayedChampionsArray = [];
      for await (const champion of mostPlayedChampions) {
        const { championPoints: points } = champion;
        mostPlayedChampionsArray.push({ points });
      }
      return mostPlayedChampionsArray;
    } catch (err) {
      if (err.response.status == 401) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la `Development API Key` proporcionada por Riot Games ha expirado.'
        );
      }
      if (err.response.status == 400) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la petición o solicitud fue incorrecta.'
        );
      }
      console.error(`[SUMMONERDATA] ${err.message}`);
      throw new Error(
        'Se ha producido un error al intentar recuperar los campeones más jugados por el invocador.'
      );
    }
  }
  async getMatchesBySummoner(puuid) {
    const url = `${this.matches_url}/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${process.env.RIOT_API_TOKEN}`;
    const { data } = await axios.get(url);
    return data;
  }
  async rankedInfo(summonerId) {
    try {
      const urlRanked = `${this.base_url}/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.RIOT_API_TOKEN}`;
      const { data: rankedData } = await axios.get(urlRanked);
      let data = [];
      rankedData.forEach((item) => {
        if (item.queueType == 'RANKED_SOLO_5x5') {
          data.solo = [];
          const { tier, rank, leaguePoints, wins, losses, queueType } = item;
          data.solo.push({ tier, rank, leaguePoints, wins, losses, queueType });
        } else if (item.queueType == 'RANKED_FLEX_SR') {
          data.flex = [];
          const { tier, rank, leaguePoints, wins, losses, queueType } = item;
          data.flex.push({ tier, rank, leaguePoints, wins, losses, queueType });
        }
      });
      return data;
    } catch (err) {
      if (err.response.status == 401) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la `Development API Key` proporcionada por Riot Games ha expirado.'
        );
      }
      if (err.response.status == 400) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la petición o solicitud fue incorrecta.'
        );
      }
      throw new Error(
        'Se ha producido un error al intentar obtener los datos de clasificación.'
      );
    }
  }
  async getQueueById(queueId) {
    const urlQueues =
      'http://static.developer.riotgames.com/docs/lol/queues.json';
    const { data } = await axios.get(urlQueues);
    const queue = data.filter((q) => q.queueId == queueId);
    return queue[0];
  }
  async getCurrentMatch(id) {
    try {
      const urlCurrentMatch = `${this.base_url}/spectator/v4/active-games/by-summoner/${id}?api_key=${process.env.RIOT_API_TOKEN}`;
      const { data: match } = await axios.get(urlCurrentMatch);
      const data = [];
      data.userTeam = [];
      data.enemyTeam = [];
      data.gameId = match.gameId;
      data.mapId = match.mapId;
      data.bans = match.bannedChampions;
      data.startTimeGame = match.gameStartTime;
      data.gameMode = match.gameMode;
      data.gameQueueConfigId = match.gameQueueConfigId;
      for (let i = 0; i < match.participants.length; i++) {
        const user = match.participants[i];
        if (user.teamId == 100) {
          const { summonerName, championId, spell1Id, spell2Id } = user;
          const champion = await this.getChampionById(championId);
          data.userTeam.push({
            summonerName,
            championName: champion.name,
            spells: {
              one: SpellEmoji[`${spell1Id}`],
              two: SpellEmoji[`${spell2Id}`],
            },
            bans: match.bannedChampions.filter((x) => x.teamId == 100),
          });
        }
        if (user.teamId == 200) {
          const { summonerName, championId, spell1Id, spell2Id } = user;
          const champion = await this.getChampionById(championId);
          data.enemyTeam.push({
            summonerName,
            championName: champion.name,
            spells: {
              one: SpellEmoji[`${spell1Id}`],
              two: SpellEmoji[`${spell2Id}`],
            },
            bans: match.bannedChampions.filter((x) => x.teamId == 200),
          });
        }
      }
      return data;
    } catch (err) {
      if (err.response.status == 401) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la `Development API Key` proporcionada por Riot Games ha expirado.'
        );
      }
      if (err.response.status == 404) {
        return false;
      }
      if (err.response.status == 400) {
        throw new Error(
          'No ha sido posible obtener la información debido a que la petición o solicitud fue incorrecta.'
        );
      } else {
        console.error(`[SUMMONERDATA] ${err.message}`);
      }
    }
  }
  async lastMatch() {
    try {
      const { puuid } = await this.profileBasicData();
      const url_lastMatch = `${this.matches_url}/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1&api_key=${process.env.RIOT_API_TOKEN}`;
      const { data: lastPlayedMatch } = await axios.get(url_lastMatch);
      const gameIdzero = lastPlayedMatch[0];

      const data = await this.advencedMatchInfo(gameIdzero);
      const { participants: participantIdentities } = data.metadata;
      const { gameCreation, gameDuration, gameMode, participants, queueId } =
        data.info;
      const time = [
        `<t:${Math.round(gameCreation / 1000)}:R>`,
        `${fabricio(gameDuration * 1000, {
          long: false,
          language: 'en',
          length: 2,
        })}`,
      ];
      let { map, description: mode } = await this.getQueueById(queueId);

      let currentPlayerId = null;
      const currentPlayerSum = [];
      const dataArray = [];
      participantIdentities.forEach((participant, position) => {
        if (participant === puuid) {
          currentPlayerId = position + 1;
        }
      });
      participants.forEach((participant) => {
        if (participant.participantId === currentPlayerId) {
          currentPlayerSum.push(participant);
        }
      });
      const {
        win,
        kills,
        deaths,
        assists,
        totalMinionsKilled,
        neutralMinionsKilled,
        summoner1Id,
        summoner2Id,
        championId,
      } = currentPlayerSum[0];
      const champ = await this.getChampionById(championId);
      const { role, lane } = currentPlayerSum[0];
      dataArray.push({
        time,
        map,
        mode,
        spells: {
          summoner1Id,
          summoner2Id,
        },
        stats: {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
          role,
          lane,
          gameMode,
          champion: { name: champ.name },
        },
      });
      return dataArray;
    } catch (err) {
      console.error(`[SUMMONERDATA] ${err.message}`);
      return null;
    }
  }
  async lastPlayedMatch() {
    try {
      const { puuid } = await this.profileBasicData();
      const url_lastMatch = `${this.matches_url}/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${process.env.RIOT_API_TOKEN}`;
      const { data: lastPlayedMatch } = await axios.get(url_lastMatch);
      const dataArray = new Array();
      if (lastPlayedMatch[0]) {
        const data = await this.advencedMatchInfo(lastPlayedMatch[0]);
        const { participants: participantIdentities } = data.metadata;
        const { gameCreation, gameDuration, gameMode, participants, queueId } =
          data.info;
        const time = [
          `<t:${Math.round(gameCreation / 1000)}:R>`,
          `${fabricio(gameDuration * 1000, {
            long: false,
            language: 'en',
            length: 2,
          })}`,
        ];
        let { map, description: mode } = await this.getQueueById(queueId);

        let currentPlayerId = null;
        const currentPlayerSum = [];
        participantIdentities.forEach((participant, position) => {
          if (participant === puuid) {
            currentPlayerId = position + 1;
          }
        });
        participants.forEach((participant) => {
          if (participant.participantId === currentPlayerId) {
            currentPlayerSum.push(participant);
          }
        });
        const {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
          summoner1Id,
          summoner2Id,
          championId,
        } = currentPlayerSum[0];
        const champ = await this.getChampionById(championId);
        const { role, lane } = currentPlayerSum[0];
        dataArray.push({
          time,
          map,
          mode,
          spells: {
            summoner1Id,
            summoner2Id,
          },
          stats: {
            win,
            kills,
            deaths,
            assists,
            totalMinionsKilled,
            neutralMinionsKilled,
            role,
            lane,
            gameMode,
            champion: { name: champ.name },
          },
        });
      }
      if (lastPlayedMatch[1]) {
        const data = await this.advencedMatchInfo(lastPlayedMatch[1]);
        const { participants: participantIdentities } = data.metadata;
        const { gameCreation, gameDuration, gameMode, participants, queueId } =
          data.info;
        const time = [
          `<t:${Math.round(gameCreation / 1000)}:R>`,
          `${fabricio(gameDuration * 1000, {
            long: false,
            language: 'en',
            length: 2,
          })}`,
        ];
        let { map, description: mode } = await this.getQueueById(queueId);

        let currentPlayerId = null;
        const currentPlayerSum = [];
        participantIdentities.forEach((participant, position) => {
          if (participant === puuid) {
            currentPlayerId = position + 1;
          }
        });
        participants.forEach((participant) => {
          if (participant.participantId === currentPlayerId) {
            currentPlayerSum.push(participant);
          }
        });
        const {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
          summoner1Id,
          summoner2Id,
          championId,
        } = currentPlayerSum[0];
        const champ = await this.getChampionById(championId);
        const { role, lane } = currentPlayerSum[0];
        dataArray.push({
          time,
          map,
          mode,
          spells: {
            summoner1Id,
            summoner2Id,
          },
          stats: {
            win,
            kills,
            deaths,
            assists,
            totalMinionsKilled,
            neutralMinionsKilled,
            role,
            lane,
            gameMode,
            champion: { name: champ.name },
          },
        });
      }
      if (lastPlayedMatch[2]) {
        const data = await this.advencedMatchInfo(lastPlayedMatch[2]);
        const { participants: participantIdentities } = data.metadata;
        const { gameCreation, gameDuration, gameMode, participants, queueId } =
          data.info;
        const time = [
          `<t:${Math.round(gameCreation / 1000)}:R>`,
          `${fabricio(gameDuration * 1000, {
            long: false,
            language: 'en',
            length: 2,
          })}`,
        ];
        let { map, description: mode } = await this.getQueueById(queueId);

        let currentPlayerId = null;
        const currentPlayerSum = [];
        participantIdentities.forEach((participant, position) => {
          if (participant === puuid) {
            currentPlayerId = position + 1;
          }
        });
        participants.forEach((participant) => {
          if (participant.participantId === currentPlayerId) {
            currentPlayerSum.push(participant);
          }
        });
        const {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
          summoner1Id,
          summoner2Id,
          championId,
        } = currentPlayerSum[0];
        const champ = await this.getChampionById(championId);
        const { role, lane } = currentPlayerSum[0];
        dataArray.push({
          time,
          map,
          mode,
          spells: {
            summoner1Id,
            summoner2Id,
          },
          stats: {
            win,
            kills,
            deaths,
            assists,
            totalMinionsKilled,
            neutralMinionsKilled,
            role,
            lane,
            gameMode,
            champion: { name: champ.name },
          },
        });
      }
      if (lastPlayedMatch[3]) {
        const data = await this.advencedMatchInfo(lastPlayedMatch[3]);
        const { participants: participantIdentities } = data.metadata;
        const { gameCreation, gameDuration, gameMode, participants, queueId } =
          data.info;
        const time = [
          `<t:${Math.round(gameCreation / 1000)}:R>`,
          `${fabricio(gameDuration * 1000, {
            long: false,
            language: 'en',
            length: 2,
          })}`,
        ];
        let { map, description: mode } = await this.getQueueById(queueId);

        let currentPlayerId = null;
        const currentPlayerSum = [];
        participantIdentities.forEach((participant, position) => {
          if (participant === puuid) {
            currentPlayerId = position + 1;
          }
        });
        participants.forEach((participant) => {
          if (participant.participantId === currentPlayerId) {
            currentPlayerSum.push(participant);
          }
        });
        const {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
          summoner1Id,
          summoner2Id,
          championId,
        } = currentPlayerSum[0];
        const champ = await this.getChampionById(championId);
        const { role, lane } = currentPlayerSum[0];
        dataArray.push({
          time,
          map,
          mode,
          spells: {
            summoner1Id,
            summoner2Id,
          },
          stats: {
            win,
            kills,
            deaths,
            assists,
            totalMinionsKilled,
            neutralMinionsKilled,
            role,
            lane,
            gameMode,
            champion: { name: champ.name },
          },
        });
      }
      if (lastPlayedMatch[4]) {
        const data = await this.advencedMatchInfo(lastPlayedMatch[4]);
        const { participants: participantIdentities } = data.metadata;
        const { gameCreation, gameDuration, gameMode, participants, queueId } =
          data.info;
        const time = [
          `<t:${Math.round(gameCreation / 1000)}:R>`,
          `${fabricio(gameDuration * 1000, {
            long: false,
            language: 'en',
            length: 2,
          })}`,
        ];
        let { map, description: mode } = await this.getQueueById(queueId);

        let currentPlayerId = null;
        const currentPlayerSum = [];
        participantIdentities.forEach((participant, position) => {
          if (participant === puuid) {
            currentPlayerId = position + 1;
          }
        });
        participants.forEach((participant) => {
          if (participant.participantId === currentPlayerId) {
            currentPlayerSum.push(participant);
          }
        });
        const {
          win,
          kills,
          deaths,
          assists,
          totalMinionsKilled,
          neutralMinionsKilled,
          summoner1Id,
          summoner2Id,
          championId,
        } = currentPlayerSum[0];
        const champ = await this.getChampionById(championId);
        const { role, lane } = currentPlayerSum[0];
        dataArray.push({
          time,
          map,
          mode,
          spells: {
            summoner1Id,
            summoner2Id,
          },
          stats: {
            win,
            kills,
            deaths,
            assists,
            totalMinionsKilled,
            neutralMinionsKilled,
            role,
            lane,
            gameMode,
            champion: { name: champ.name },
          },
        });
      }
      return dataArray;
    } catch (err) {
      console.error(`[SUMMONERDATA] ${err.message}`);
      return null;
    }
  }
}

module.exports = SummonerData;

function _currentTime() {
  const date = new Date();
  const hour = date
    .toLocaleString('en-US', { timeZone: 'America/Mexico_City' })
    .split(',')[1];
  return hour;
}
