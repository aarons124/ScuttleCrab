function getMapName(id) {
  const maps = [
    {
      mapId: 1,
      mapName: 'Grieta del Invocador',
      notes: 'Original Summer variant',
    },
    {
      mapId: 2,
      mapName: 'Grieta del Invocador',
      notes: 'Original Autumn variant',
    },
    {
      mapId: 3,
      mapName: 'El campo de pruebas',
      notes: 'Tutorial Map',
    },
    {
      mapId: 4,
      mapName: 'El Bosque Retorcido',
      notes: 'Original Version',
    },
    {
      mapId: 8,
      mapName: 'La Cicatriz de Cristal',
      notes: 'Dominion map',
    },
    {
      mapId: 10,
      mapName: 'El Bosque Retorcido',
      notes: 'Last TT map',
    },
    {
      mapId: 11,
      mapName: 'Grieta del Invocador',
      notes: 'Current Version',
    },
    {
      mapId: 12,
      mapName: 'Abismo de los Lamentos',
      notes: 'ARAM map',
    },
    {
      mapId: 14,
      mapName: 'Puente del Carnicero',
      notes: 'Alternate ARAM map',
    },
    {
      mapId: 16,
      mapName: 'Ruinas cósmicas',
      notes: 'Dark Star: Singularity map',
    },
    {
      mapId: 18,
      mapName: 'Parque de la ciudad de Valoran',
      notes: 'Star Guardian Invasion map',
    },
    {
      mapId: 19,
      mapName: 'Infraestructura 43',
      notes: 'PROJECT: Hunters map',
    },
    {
      mapId: 20,
      mapName: 'Lugar de la colisión',
      notes: 'Odyssey: Extraction map',
    },
    {
      mapId: 20,
      mapName: 'Convergencia',
      notes: 'Teamfight Tactics map',
    },
    {
      mapId: 21,
      mapName: 'Nexus Blitz',
      notes: 'Nexus Blitz map',
    },
  ];
  return maps.find((x) => x.mapId == id).mapName;
}

module.exports = getMapName;
