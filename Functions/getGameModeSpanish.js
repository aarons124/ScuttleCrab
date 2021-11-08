function getGameModeES(gameModeEN) {
  const gameModes = [
    {
      gameModeEN: 'CLASSIC',
      gameModeES: 'Clásica',
      description: "Classic Summoner's Rift and Twisted Treeline games",
    },
    {
      gameModeEN: 'ODIN',
      gameModeES: 'League of Legends: Dominio',
      description: 'Dominion/Crystal Scar games',
    },
    {
      gameModeEN: 'ARAM',
      gameModeES: 'ARAM',
      description: 'ARAM games',
    },
    {
      gameModeEN: 'TUTORIAL',
      gameModeES: 'Tutorial',
      description: 'Tutorial games',
    },
    {
      gameModeEN: 'URF',
      gameModeES: 'Fuego Ultra Rápido',
      description: 'URF games',
    },
    {
      gameModeEN: 'DOOMBOTSTEEMO',
      gameModeES: 'Doom Bots: Bots malditos',
      description: 'Doom Bot games',
    },
    {
      gameModeEN: 'ONEFORALL',
      gameModeES: 'Uno para Todos',
      description: 'One for All games',
    },
    {
      gameModeEN: 'ASCENSION',
      gameModeES: 'Ascensión',
      description: 'Ascension games',
    },
    {
      gameModeEN: 'FIRSTBLOOD',
      gameModeES: 'Duelo de las Nieves',
      description: 'Snowdown Showdown games',
    },
    {
      gameModeEN: 'KINGPORO',
      gameModeES: 'La leyenda del Rey Poro',
      description: 'Legend of the Poro King games',
    },
    {
      gameModeEN: 'SIEGE',
      gameModeES: 'Asedio al Nexo',
      description: 'Nexus Siege games',
    },
    {
      gameModeEN: 'ASSASSINATE',
      gameModeES: 'La caza de la luna de sangre',
      description: 'Blood Hunt Assassin games',
    },
    {
      gameModeEN: 'ARSR',
      gameModeES: 'Todos Aleatorios en la Grieta del Invocador',
      description: "All Random Summoner's Rift games",
    },
    {
      gameModeEN: 'DARKSTAR',
      gameModeES: 'Estrella Oscura: Singularidad',
      description: 'Dark Star: Singularity games',
    },
    {
      gameModeEN: 'STARGUARDIAN',
      gameModeES: 'Guardianes Estelares: Invasión',
      description: 'Star Guardian Invasion games',
    },
    {
      gameModeEN: 'PROJECT',
      gameModeES: 'PROYECTO: Cazadores',
      description: 'PROJECT: Hunters games',
    },
    {
      gameModeEN: 'GAMEMODEX',
      gameModeES: 'Bombardeo al nexo',
      description: 'Nexus Blitz games',
    },
    {
      gameModeEN: 'ODYSSEY',
      gameModeES: 'Odisea : Extraccion',
      description: 'Odyssey: Extraction games',
    },
    {
      gameModeEN: 'NEXUSBLITZ',
      gameModeES: 'Bombardeo al nexo',
      description: 'Nexus Blitz games',
    },
    {
      gameModeEN: 'ULTBOOK',
      gameModeES: 'Libro de Hechizos Definitivo',
      description: 'Ultimate Spellbook games',
    },
  ];

  return gameModes.find((x) => x.gameModeEN == gameModeEN).gameModeES;
}

module.exports = getGameModeES;
