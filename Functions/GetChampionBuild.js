const axios = require('axios').default;
const cheerio = require('cheerio');

const spellsd = [
  'Heal',
  'Ghost',
  'Barrier',
  'Exhaust',
  'Mark',
  'Dash',
  'Clarity',
  'Flash',
  'Telport',
  'Smite',
  'Cleanse',
  'Ignite',
];

const lanes = {
  top: 'top',
  mid: 'middle',
  middle: 'middle',
  jungle: 'jungle',
  jungler: 'jungle',
  jg: 'jungle',
  bot: 'adc',
  adc: 'adc',
  support: 'support',
  sup: 'support',
  supp: 'support',
  '': '',
};

async function getBuildsAndRunes(champion, lane) {
  try {
    const ArrayData = new Array();
    if (!Object.keys(lanes).includes(lane))
      return new Error('Ingresa una linea válida.');

    const resNew = await axios.get(
      `https://www.leagueofgraphs.com/en/champions/builds/${champion}/${
        lane ? `${lanes[lane]}` : ''
      }`
    );
    const a = cheerio.load(resNew.data);

    const runesPrimary = a('img', 'div[style=""]')
      .toArray()
      .map((rune) => a(rune).attr().alt)
      .slice(0, 4);

    const runesSecondary = a('img', 'div[style=""]')
      .toArray()
      .map((rune) => a(rune).attr().alt)
      .slice(4, 6);

    const runesShard = a('img', 'div[style=""]')
      .toArray()
      .map((rune) => a(rune).attr().alt)
      .slice(6, 9);

    const items = [
      ...new Set(
        a('img[width="48"]', 'div.championSpell')
          .toArray()
          .map((item, index) =>
            index > 5 && index < 13 ? a(item).attr().alt : ''
          )
          .filter((item) => !!item)
      ),
    ];

    const spells = a('img[width="48"]', 'div.championSpell')
      .toArray()
      .map((spell) => a(spell).attr().alt)
      .filter((spell) => spellsd.includes(spell));

    ArrayData.push({
      runesPrimary: runesPrimary,
      runesSecondary: runesSecondary,
      runesShard: runesShard,
      items: items,
      spells: spells,
    });
    return ArrayData;
  } catch (error) {
    console.log(error.message);
  }
}

async function getCounters(champion) {
  try {
    const ArrayData = new Array();
    const res = await axios.get(
      `https://www.leagueofgraphs.com/es/champions/counters/${champion}`
    );
    const $ = cheerio.load(res.data);

    const boxLoseTheRoute = $('.boxContainer').toArray().splice(1, 1);

    const loseTheRoute = $('span', $(boxLoseTheRoute).html())
      .toArray()
      .map((champion) => $(champion).text())
      .splice(0, 5);

    const boxLoseMoreAgainst = $('.boxContainer').last();

    const loseMoreAgainstChampion = $('span', $(boxLoseMoreAgainst).html())
      .toArray()
      .map((champion) => $(champion).text())
      .splice(0, 5);

    const loseMoreAgainstWinRate = $(
      'progressbar',
      $(boxLoseMoreAgainst).html()
    )
      .toArray()
      .map((winrate) =>
        (parseFloat($(winrate).attr('data-value')) * 100).toFixed(1)
      )
      .splice(0, 5);

    ArrayData.push({
      championsLostLanes: loseTheRoute,
      championLostGames: loseMoreAgainstChampion,
      winrateLostGames: loseMoreAgainstWinRate,
    });

    return ArrayData;
  } catch (error) {
    console.log(
      `Se ha producido un error al obtener los counters de ${champion}.`
    );
  }
}

module.exports = {
  getBuildsAndRunes,
  getCounters,
};
