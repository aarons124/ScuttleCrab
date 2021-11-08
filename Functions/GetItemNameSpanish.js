function getItemNameInEs(item_name) {
  const items = [
    {
      name: 'Boots',
      nameEs: 'Botas de Velocidad',
      itemId: 1001,
    },
    {
      name: 'Faerie Charm',
      nameEs: 'Amuleto de las Hadas',
      itemId: 1004,
    },
    {
      name: 'Rejuvenation Bead',
      nameEs: 'Perla de Rejuvenecimiento',
      itemId: 1006,
    },
    {
      name: "Giant's Belt",
      nameEs: 'Cinturón de Gigante',
      itemId: 1011,
    },
    {
      name: 'Cloak of Agility',
      nameEs: 'Capa de Agilidad',
      itemId: 1018,
    },
    {
      name: 'Blasting Wand',
      nameEs: 'Varita Explosiva',
      itemId: 1026,
    },
    {
      name: 'Sapphire Crystal',
      nameEs: 'Cristal de Zafiro',
      itemId: 1027,
    },
    {
      name: 'Ruby Crystal',
      nameEs: 'Cristal de Rubí',
      itemId: 1028,
    },
    {
      name: 'Cloth Armor',
      nameEs: 'Armadura de Tela',
      itemId: 1029,
    },
    {
      name: 'Chain Vest',
      nameEs: 'Cota de Malla',
      itemId: 1031,
    },
    {
      name: 'Null-Magic Mantle',
      nameEs: 'Manto Anulamagia',
      itemId: 1033,
    },
    {
      name: 'Emberknife',
      nameEs: 'Cuchillo de ascuas',
      itemId: 1035,
    },
    {
      name: 'Long Sword',
      nameEs: 'Espada larga',
      itemId: 1036,
    },
    {
      name: 'Pickaxe',
      nameEs: 'Picacha',
      itemId: 1037,
    },
    {
      name: 'B. F. Sword',
      nameEs: 'Espadón',
      itemId: 1038,
    },
    {
      name: 'Hailblade',
      nameEs: 'Talismán del Cazador',
      itemId: 1039,
    },
    {
      name: 'Dagger',
      nameEs: 'Daga',
      itemId: 1042,
    },
    {
      name: 'Recurve Bow',
      nameEs: 'Arco Recurvado',
      itemId: 1043,
    },
    {
      name: 'Amplifying Tome',
      nameEs: 'Libro Amplificador',
      itemId: 1052,
    },
    {
      name: 'Vampiric Scepter',
      nameEs: 'Cetro Vampírico',
      itemId: 1053,
    },
    {
      name: "Doran's Shield",
      nameEs: 'Escudo de Doran',
      itemId: 1054,
    },
    {
      name: "Doran's Blade",
      nameEs: 'Espada de Doran',
      itemId: 1055,
    },
    {
      name: "Doran's Ring",
      nameEs: 'Sortija de Doran',
      itemId: 1056,
    },
    {
      name: 'Negatron Cloak',
      nameEs: 'Capa de Negatrones',
      itemId: 1057,
    },
    {
      name: 'Needlessly Large Rod',
      nameEs: 'Vara Innecesariamente Grande',
      itemId: 1058,
    },
    {
      name: 'Dark Seal',
      nameEs: 'El Sello de la Oscuridad',
      itemId: 1082,
    },
    {
      name: 'Cull',
      nameEs: 'Sacrificar',
      itemId: 1083,
    },
    {
      name: 'Health Potion',
      nameEs: 'Poción de Vida',
      itemId: 2003,
    },
    {
      name: 'Total Biscuit of Everlasting Will',
      nameEs: 'Galleta de Voluntad',
      itemId: 2010,
    },
    {
      name: 'Kircheis Shard',
      nameEs: 'Fragmento de Kircheis',
      itemId: 2015,
    },
    {
      name: 'Refillable Potion',
      nameEs: 'Poción Reutilizable',
      itemId: 2031,
    },
    {
      name: 'Corrupting Potion',
      nameEs: 'Poción de Corrupción',
      itemId: 2033,
    },
    {
      name: "Guardian's Horn",
      nameEs: 'Cuerno del Guardián',
      itemId: 2051,
    },
    {
      name: 'Poro-Snax',
      nameEs: 'Porogalleta',
      itemId: 2052,
    },
    {
      name: 'Control Ward',
      nameEs: 'Centinela de Contro',
      itemId: 2055,
    },
    {
      name: "Shurelya's Battlesong",
      nameEs: 'Ensueño de Shurelya',
      itemId: 2065,
    },
    {
      name: 'Elixir of Iron',
      nameEs: 'Elixir de Hierro',
      itemId: 2138,
    },
    {
      name: 'Elixir of Sorcery',
      nameEs: 'Elixir de Brujería',
      itemId: 2139,
    },
    {
      name: 'Elixir of Wrath',
      nameEs: 'Elixir de Furia',
      itemId: 2140,
    },
    {
      name: 'Minion Dematerializer',
      nameEs: 'Desmaterializador de súbditos',
      itemId: 2403,
    },
    {
      name: 'Commencing Stopwatch',
      nameEs: 'Cronometro Inicial',
      itemId: 2419,
    },
    {
      name: 'Stopwatch',
      nameEs: 'Cronómetro',
      itemId: 2420,
    },
    {
      name: 'Broken Stopwatch',
      nameEs: 'Cronómetro roto',
      itemId: 2421,
    },
    {
      name: 'Slightly Magical Footwear',
      nameEs: 'Botas Ligeramente Mágicas',
      itemId: 2422,
    },
    {
      name: 'Perfectly Timed Stopwatch',
      nameEs: 'Cronómetro de tiempo perfecto',
      itemId: 2423,
    },
    {
      name: 'Broken Stopwatch',
      nameEs: 'Cronómetro roto',
      itemId: 2424,
    },
    {
      name: 'Abyssal Mask',
      nameEs: 'Máscara Abisal',
      itemId: 3001,
    },
    {
      name: "Archangel's Staff",
      nameEs: 'Báculo del Arcángel',
      itemId: 3003,
    },
    {
      name: 'Manamune',
      nameEs: 'Manamune',
      itemId: 3004,
    },
    {
      name: "Berserker's Greaves",
      nameEs: 'Grebas del Berserker',
      itemId: 3006,
    },
    {
      name: 'Boots of Swiftness',
      nameEs: 'Botas de Rapidez',
      itemId: 3009,
    },
    {
      name: "Sorcerer's Shoes",
      nameEs: 'Botas del Hechicero',
      itemId: 3020,
    },
    {
      name: 'Glacial Buckler',
      nameEs: 'Sudario Glacial',
      itemId: 3024,
    },
    {
      name: 'Guardian Angel',
      nameEs: 'Ángel Guardián',
      itemId: 3026,
    },
    {
      name: 'Infinity Edge',
      nameEs: 'Filo del Infinito',
      itemId: 3031,
    },
    {
      name: 'Mortal Reminder',
      nameEs: 'Recordatorio Mortal',
      itemId: 3033,
    },
    {
      name: 'Last Whisper',
      nameEs: 'Último Suspiro',
      itemId: 3035,
    },
    {
      name: "Lord Dominik's Regards",
      nameEs: 'Recuerdos de Lord Dominik',
      itemId: 3036,
    },
    {
      name: "Seraph's Embrace",
      nameEs: 'Abrazo del Serafín',
      itemId: 3040,
    },
    {
      name: "Mejai's Soulstealer",
      nameEs: 'Robaalmas de Mejai',
      itemId: 3041,
    },
    {
      name: 'Muramana',
      nameEs: 'Muramaná',
      itemId: 3042,
    },
    {
      name: 'Phage',
      nameEs: 'Bacteriófago',
      itemId: 3044,
    },
    {
      name: 'Phantom Dancer',
      nameEs: 'Bailarín Espectral',
      itemId: 3046,
    },
    {
      name: 'Plated Steelcaps',
      nameEs: 'Tabi de Ninja',
      itemId: 3047,
    },
    {
      name: "Zeke's Convergence",
      nameEs: 'Heraldo de Zeke',
      itemId: 3050,
    },
    {
      name: 'Hearthbound Axe',
      nameEs: 'Hacha del corazón',
      itemId: 3051,
    },
    {
      name: "Sterak's Gage",
      nameEs: 'Guantelete de Sterak',
      itemId: 3053,
    },
    {
      name: 'Sheen',
      nameEs: 'Brillo',
      itemId: 3057,
    },
    {
      name: 'Spirit Visage',
      nameEs: 'Apariencia Espiritual',
      itemId: 3065,
    },
    {
      name: 'Winged Moonplate',
      nameEs: 'Armadura Lunar Alada',
      itemId: 3066,
    },
    {
      name: 'Kindlegem',
      nameEs: 'Gemaluz',
      itemId: 3067,
    },
    {
      name: 'Sunfire Aegis',
      nameEs: 'Capa de Fuego Solar',
      itemId: 3068,
    },
    {
      name: 'Tear of the Goddess',
      nameEs: 'Lágrima de la Diosa',
      itemId: 3070,
    },
    {
      name: 'Black Cleaver',
      nameEs: 'La Cuchilla Oscura',
      itemId: 3071,
    },
    {
      name: 'Bloodthirster',
      nameEs: 'La Sanguinaria',
      itemId: 3072,
    },
    {
      name: 'Ravenous Hydra',
      nameEs: 'Hidra Voraz',
      itemId: 3074,
    },
    {
      name: 'Thornmail',
      nameEs: 'Cota de Espinas',
      itemId: 3075,
    },
    {
      name: 'Bramble Vest',
      nameEs: 'Vesta Espinosa',
      itemId: 3076,
    },
    {
      name: 'Tiamat',
      nameEs: 'Tiamat',
      itemId: 3077,
    },
    {
      name: 'Trinity Force',
      nameEs: 'Fuerza de la Trinidad',
      itemId: 3078,
    },
    {
      name: "Warden's Mail",
      nameEs: 'Cota del Guardabosques',
      itemId: 3082,
    },
    {
      name: "Warmog's Armor",
      nameEs: 'Armadura de Warmog',
      itemId: 3083,
    },
    {
      name: "Runaan's Hurricane",
      nameEs: 'Huracán de Runaan',
      itemId: 3085,
    },
    {
      name: 'Zeal',
      nameEs: 'Fervor',
      itemId: 3086,
    },
    {
      name: "Rabadon's Deathcap",
      nameEs: 'Sombrero Mortífero de Rabadon',
      itemId: 3089,
    },
    {
      name: "Wit's End",
      nameEs: 'Al Filo de la Cordura',
      itemId: 3091,
    },
    {
      name: 'Rapid Firecannon',
      nameEs: 'Cañón de Fuego Rápido',
      itemId: 3094,
    },
    {
      name: 'Stormrazor',
      nameEs: 'Filo de la Tormenta',
      itemId: 3095,
    },
    {
      name: 'Lich Bane',
      nameEs: 'Maldición del Liche',
      itemId: 3100,
    },
    {
      name: "Banshee's Veil",
      nameEs: 'Velo de la Banshee',
      itemId: 3102,
    },
    {
      name: 'Aegis of the Legion',
      nameEs: 'Égida de la Legión',
      itemId: 3105,
    },
    {
      name: 'Redemption',
      nameEs: 'Redención',
      itemId: 3107,
    },
    {
      name: 'Fiendish Codex',
      nameEs: 'Códice Diabólico',
      itemId: 3108,
    },
    {
      name: "Knight's Vow",
      nameEs: 'Promesa del Caballero',
      itemId: 3109,
    },
    {
      name: 'Frozen Heart',
      nameEs: 'Corazón de Hielo',
      itemId: 3110,
    },
    {
      name: "Mercury's Treads",
      nameEs: 'Botas de Mercurio',
      itemId: 3111,
    },
    {
      name: "Guardian's Orb",
      nameEs: 'Orbe del Guardián',
      itemId: 3112,
    },
    {
      name: 'Aether Wisp',
      nameEs: 'Brisa de Éter',
      itemId: 3113,
    },
    {
      name: 'Forbidden Idol',
      nameEs: 'Ídolo Prohibido',
      itemId: 3114,
    },
    {
      name: "Nashor's Tooth",
      nameEs: 'Diente de Nashor',
      itemId: 3115,
    },
    {
      name: "Rylai's Crystal Scepter",
      nameEs: 'Cetro de Cristal de Rylai',
      itemId: 3116,
    },
    {
      name: 'Mobility Boots',
      nameEs: 'Botas de Movilidad',
      itemId: 3117,
    },
    {
      name: "Executioner's Calling",
      nameEs: 'El Llamado del Verdugo',
      itemId: 3123,
    },
    {
      name: "Guinsoo's Rageblade",
      nameEs: 'Espadafuria de Guinsoo',
      itemId: 3124,
    },
    {
      name: "Caulfield's Warhammer",
      nameEs: 'Martillo de Guerra de Caulfield',
      itemId: 3133,
    },
    {
      name: 'Serrated Dirk',
      nameEs: 'Puñal Serrado',
      itemId: 3134,
    },
    {
      name: 'Void Staff',
      nameEs: 'Báculo del Vacío',
      itemId: 3135,
    },
    {
      name: 'Mercurial Scimitar',
      nameEs: 'Cimitarra Mercurial',
      itemId: 3139,
    },
    {
      name: 'Quicksilver Sash',
      nameEs: 'Fajín de Mercurio',
      itemId: 3140,
    },
    {
      name: "Youmuu's Ghostblade",
      nameEs: 'Espada Fantasma de Youmuu',
      itemId: 3142,
    },
    {
      name: "Randuin's Omen",
      nameEs: 'Presagio de Randuin',
      itemId: 3143,
    },
    {
      name: 'Hextech Alternator',
      nameEs: 'Revólver Hextech',
      itemId: 3145,
    },
    {
      name: 'Hextech Rocketbelt',
      nameEs: 'Cinturón Cohete Hextech',
      itemId: 3152,
    },
    {
      name: 'Blade of the Ruined King',
      nameEs: 'Espada del Rey Arruinado',
      itemId: 3153,
    },
    {
      name: 'Hexdrinker',
      nameEs: 'Sorbechizos',
      itemId: 3155,
    },
    {
      name: 'Maw of Malmortius',
      nameEs: 'Fauces de Malmortiu',
      itemId: 3156,
    },
    {
      name: "Zhonya's Hourglass",
      nameEs: 'Reloj de Arena de Zhonya',
      itemId: 3157,
    },
    {
      name: 'Ionian Boots of Lucidity',
      nameEs: 'Botas Jonias de la Lucidez',
      itemId: 3158,
    },
    {
      name: 'Morellonomicon',
      nameEs: 'Morellonomicón',
      itemId: 3165,
    },
    {
      name: "Guardian's Blade",
      nameEs: 'Espada del Guardián',
      itemId: 3177,
    },
    {
      name: 'Umbral Glaive',
      nameEs: 'Guja Sombría',
      itemId: 3179,
    },
    {
      name: 'Hullbreaker',
      nameEs: 'Hoja Carmesí',
      itemId: 3181,
    },
    {
      name: "Guardian's Hammer",
      nameEs: 'Martillo del Guardián',
      itemId: 3184,
    },
    {
      name: 'Locket of the Iron Solari',
      nameEs: 'Relicario de los Solari de Hierro',
      itemId: 3190,
    },
    {
      name: "Seeker's Armguard",
      nameEs: 'Guardabrazo del Buscador',
      itemId: 3191,
    },
    {
      name: 'Gargoyle Stoneplate',
      nameEs: 'Armadura Pétrea',
      itemId: 3193,
    },
    {
      name: "Spectre's Cowl",
      nameEs: 'Hábito del Espectro',
      itemId: 3211,
    },
    {
      name: "Mikael's Blessing",
      nameEs: 'Crisol de Mikael',
      itemId: 3222,
    },
    {
      name: 'Scarecrow Effigy',
      nameEs: 'Efigie de espantapájaros',
      itemId: 3330,
    },
    {
      name: 'Stealth Ward',
      nameEs: 'Sala de sigilo',
      itemId: 3340,
    },
    {
      name: 'Farsight Alteration',
      nameEs: 'Orbe de Visión del Futuro',
      itemId: 3363,
    },
    {
      name: 'Oracle Lens',
      nameEs: 'Lente del Oráculo',
      itemId: 3364,
    },
    {
      name: 'Your Cut',
      nameEs: 'Tu parte',
      itemId: 3400,
    },
    {
      name: 'Ardent Censer',
      nameEs: 'Pebetero Ardiente',
      itemId: 3504,
    },
    {
      name: 'Essence Reaver',
      nameEs: 'Saqueador de Esencias',
      itemId: 3508,
    },
    {
      name: 'Eye of the Herald',
      nameEs: 'El ojo del Heraldo',
      itemId: 3513,
    },
    {
      name: "Kalista's Black Spear",
      nameEs: 'Lanza negra de Kalista',
      itemId: 3599,
    },
    {
      name: "Kalista's Black Spear",
      nameEs: 'Lanza negra de Kalista',
      itemId: 3600,
    },
    {
      name: "Dead Man's Plate",
      nameEs: 'Placa del Hombre Muerto',
      itemId: 3742,
    },
    {
      name: 'Titanic Hydra',
      nameEs: 'Hidra Titánica',
      itemId: 3748,
    },
    {
      name: 'Crystalline Bracer',
      nameEs: 'Brazal Cristalino',
      itemId: 3801,
    },
    {
      name: 'Lost Chapter',
      nameEs: 'Capítulo Perdido',
      itemId: 3802,
    },
    {
      name: 'Edge of Night',
      nameEs: 'Filo de la Noche',
      itemId: 3814,
    },
    {
      name: "Spellthief's Edge",
      nameEs: 'Daga del Hechicero',
      itemId: 3850,
    },
    {
      name: 'Frostfang',
      nameEs: 'Colmillo de Escarcha',
      itemId: 3851,
    },
    {
      name: 'Shard of True Ice',
      nameEs: 'Fragmento de Hielo Puro',
      itemId: 3853,
    },
    {
      name: 'Steel Shoulderguards',
      nameEs: 'Hombreras de acero',
      itemId: 3854,
    },
    {
      name: 'Runesteel Spaulders',
      nameEs: 'Hombreras de acero',
      itemId: 3855,
    },
    {
      name: 'Pauldrons of Whiterock',
      nameEs: 'Hombreras de acero',
      itemId: 3857,
    },
    {
      name: 'Relic Shield',
      nameEs: 'Escudo reliquia',
      itemId: 3858,
    },
    {
      name: "Targon's Buckler",
      nameEs: 'Escudo de Targón',
      itemId: 3859,
    },
    {
      name: 'Bulwark of the Mountain',
      nameEs: 'Baluarte de la Montaña',
      itemId: 3860,
    },
    {
      name: 'Spectral Sickle',
      nameEs: 'Hoz Espectral',
      itemId: 3862,
    },
    {
      name: 'Harrowing Crescent',
      nameEs: 'Creciente de Sombras',
      itemId: 3863,
    },
    {
      name: 'Black Mist Scythe',
      nameEs: 'Guadaña de Niebla Oscura',
      itemId: 3864,
    },
    {
      name: 'Oblivion Orb',
      nameEs: 'Orbe del Olvido',
      itemId: 3916,
    },
    {
      name: 'Imperial Mandate',
      nameEs: 'Mandato Imperial',
      itemId: 4005,
    },
    {
      name: 'Force of Nature',
      nameEs: 'Fuerza de la Naturaleza',
      itemId: 4401,
    },
    {
      name: 'The Golden Spatula',
      nameEs: 'Vara de Estadísticas del Estoicismo',
      itemId: 4403,
    },
    {
      name: 'Horizon Focus',
      nameEs: 'Enfoque al Horizonte',
      itemId: 4628,
    },
    {
      name: 'Cosmic Drive',
      nameEs: 'Impulso Cósmico',
      itemId: 4629,
    },
    {
      name: 'Blighting Jewel',
      nameEs: 'Joya Maldita',
      itemId: 4630,
    },
    {
      name: 'Verdant Barrier',
      nameEs: 'Barrera Esmeralda',
      itemId: 4632,
    },
    {
      name: 'Riftmaker',
      nameEs: 'Agrietador',
      itemId: 4633,
    },
    {
      name: 'Leeching Leer',
      nameEs: 'Mirada Absorbente',
      itemId: 4635,
    },
    {
      name: 'Night Harvester',
      nameEs: 'Cosechador Nocturno',
      itemId: 4636,
    },
    {
      name: 'Demonic Embrace',
      nameEs: 'Abrazo Demoniaco',
      itemId: 4637,
    },
    {
      name: 'Watchful Wardstone',
      nameEs: 'Piedra de visión',
      itemId: 4638,
    },
    {
      name: 'Bandleglass Mirror',
      nameEs: 'Espejo de cristal de Bandle',
      itemId: 4642,
    },
    {
      name: 'Vigilant Wardstone',
      nameEs: 'Piedra de visión',
      itemId: 4643,
    },
    {
      name: 'Ironspike Whip',
      nameEs: 'Látigo Férreo',
      itemId: 6029,
    },
    {
      name: 'Silvermere Dawn',
      nameEs: 'Amanecer Plateadp',
      itemId: 6035,
    },
    {
      name: "Death's Dance",
      nameEs: 'Danza de la Muerte',
      itemId: 6333,
    },
    {
      name: 'Chempunk Chainsword',
      nameEs: 'Sierraespada Quimopunk',
      itemId: 6609,
    },
    {
      name: 'Staff of Flowing Water',
      nameEs: 'Báculo de Agua Fluyente',
      itemId: 6616,
    },
    {
      name: 'Moonstone Renewer',
      nameEs: 'Renovador de Piedra Lunar',
      itemId: 6617,
    },
    {
      name: 'Goredrinker',
      nameEs: 'Bebedor de sangre',
      itemId: 6630,
    },
    {
      name: 'Stridebreaker',
      nameEs: 'Rompeavances',
      itemId: 6631,
    },
    {
      name: 'Divine Sunderer',
      nameEs: 'Cercenador Divino',
      itemId: 6632,
    },
    {
      name: "Liandry's Anguish",
      nameEs: 'Angustia de Liandry',
      itemId: 6653,
    },
    {
      name: "Luden's Tempest",
      nameEs: 'Tempestad de Luden',
      itemId: 6655,
    },
    {
      name: 'Everfrost',
      nameEs: 'Hielo Eterno',
      itemId: 6656,
    },
    {
      name: "Bami's Cinder",
      nameEs: 'Ceniza de Bami',
      itemId: 6660,
    },
    {
      name: 'Frostfire Gauntlet',
      nameEs: 'Guantelete de Fuego Escarchado',
      itemId: 6662,
    },
    {
      name: 'Turbo Chemtank',
      nameEs: 'Quimotanque Turbo',
      itemId: 6664,
    },
    {
      name: 'Noonquiver',
      nameEs: 'Carcaj de Mediodía',
      itemId: 6670,
    },
    {
      name: 'Galeforce',
      nameEs: 'Fuerza del Viento',
      itemId: 6671,
    },
    {
      name: 'Kraken Slayer',
      nameEs: 'Matakrakens',
      itemId: 6672,
    },
    {
      name: 'Immortal Shieldbow',
      nameEs: 'Arcoescudo Inmortal',
      itemId: 6673,
    },
    {
      name: 'Navori Quickblades',
      nameEs: 'Cuchillas Raudas de Navori',
      itemId: 6675,
    },
    {
      name: 'The Collector',
      nameEs: 'El Coleccionista',
      itemId: 6676,
    },
    {
      name: 'Rageknife',
      nameEs: 'Cuchillo de Furia',
      itemId: 6677,
    },
    {
      name: 'Duskblade of Draktharr',
      nameEs: 'Hoja Crepuscular de Draktharr',
      itemId: 6691,
    },
    {
      name: 'Eclipse',
      nameEs: 'Eclipse',
      itemId: 6692,
    },
    {
      name: "Prowler's Claw",
      nameEs: 'Garra del Merodeador',
      itemId: 6693,
    },
    {
      name: "Serylda's Grudge",
      nameEs: 'Rencor de Serylda',
      itemId: 6694,
    },
    {
      name: "Serpent's Fang",
      nameEs: 'Comillo de Serpiente',
      itemId: 6695,
    },
    {
      name: "Anathema's Chains",
      nameEs: 'Cadenas de Anatema',
      itemId: 8001,
    },
  ];
  return items.find((x) => x.name == item_name)?.nameEs || item_name;
}

module.exports = getItemNameInEs;
