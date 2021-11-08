function getMapNameEs(mapName_1) {
  const maps_2 = [
    {
      mapEs: 'Grieta del Invocador',
      mapName: "Summoner's Rift",
      notes: 'Original Summer variant',
    },
    {
      mapEs: 'Grieta del Invocador',
      mapName: "Summoner's Rift",
      notes: 'Original Autumn variant',
    },
    {
      mapEs: 'El campo de pruebas',
      mapName: 'The Proving Grounds',
      notes: 'Tutorial Map',
    },
    {
      mapEs: 'El Bosque Retorcido',
      mapName: 'Twisted Treeline',
      notes: 'Original Version',
    },
    {
      mapEs: 'La Cicatriz de Cristal',
      mapName: 'The Crystal Scar',
      notes: 'Dominion map',
    },
    {
      mapEs: 'El Bosque Retorcido',
      mapName: 'Twisted Treeline',
      notes: 'Last TT map',
    },
    {
      mapEs: 'Grieta del Invocador',
      mapName: "Summoner's Rift",
      notes: 'Current Version',
    },
    {
      mapEs: 'Abismo de los Lamentos',
      mapName: 'Howling Abyss',
      notes: 'ARAM map',
    },
    {
      mapEs: 'Puente del Carnicero',
      mapName: "Butcher's Bridge",
      notes: 'Alternate ARAM map',
    },
    {
      mapEs: 'Ruinas cósmicas',
      mapName: 'Cosmic Ruins',
      notes: 'Dark Star: Singularity map',
    },
    {
      mapEs: 'Parque de la ciudad de Valoran',
      mapName: 'Valoran City Park',
      notes: 'Star Guardian Invasion map',
    },
    {
      mapEs: 'Infraestructura 43',
      mapName: 'Substructure 43',
      notes: 'PROJECT: Hunters map',
    },
    {
      mapEs: 'Lugar de la colisión',
      mapName: 'Crash Site',
      notes: 'Odyssey: Extraction map',
    },
    {
      mapEs: 'Convergencia',
      mapName: 'Convergence',
      notes: 'Teamfight Tactics map',
    },
    {
      mapEs: 'Nexus Blitz',
      mapName: 'Nexus Blitz',
      notes: 'Nexus Blitz map',
    },
  ];
  return maps_2.find((x) => x.mapName == mapName_1).mapEs;
}

module.exports = getMapNameEs;
