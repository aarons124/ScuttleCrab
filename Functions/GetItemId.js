function getItemId(item_name) {
  const items = [
    {
      name: 'Boots',
      itemId: 1001,
    },
    {
      name: 'Faerie Charm',
      itemId: 1004,
    },
    {
      name: 'Rejuvenation Bead',
      itemId: 1006,
    },
    {
      name: "Giant's Belt",
      itemId: 1011,
    },
    {
      name: 'Cloak of Agility',
      itemId: 1018,
    },
    {
      name: 'Blasting Wand',
      itemId: 1026,
    },
    {
      name: 'Sapphire Crystal',
      itemId: 1027,
    },
    {
      name: 'Ruby Crystal',
      itemId: 1028,
    },
    {
      name: 'Cloth Armor',
      itemId: 1029,
    },
    {
      name: 'Chain Vest',
      itemId: 1031,
    },
    {
      name: 'Null-Magic Mantle',
      itemId: 1033,
    },
    {
      name: 'Emberknife',
      itemId: 1035,
    },
    {
      name: 'Long Sword',
      itemId: 1036,
    },
    {
      name: 'Pickaxe',
      itemId: 1037,
    },
    {
      name: 'B. F. Sword',
      itemId: 1038,
    },
    {
      name: 'Hailblade',
      itemId: 1039,
    },
    {
      name: 'Dagger',
      itemId: 1042,
    },
    {
      name: 'Recurve Bow',
      itemId: 1043,
    },
    {
      name: 'Amplifying Tome',
      itemId: 1052,
    },
    {
      name: 'Vampiric Scepter',
      itemId: 1053,
    },
    {
      name: "Doran's Shield",
      itemId: 1054,
    },
    {
      name: "Doran's Blade",
      itemId: 1055,
    },
    {
      name: "Doran's Ring",
      itemId: 1056,
    },
    {
      name: 'Negatron Cloak',
      itemId: 1057,
    },
    {
      name: 'Needlessly Large Rod',
      itemId: 1058,
    },
    {
      name: 'Dark Seal',
      itemId: 1082,
    },
    {
      name: 'Cull',
      itemId: 1083,
    },
    {
      name: 'Health Potion',
      itemId: 2003,
    },
    {
      name: 'Total Biscuit of Everlasting Will',
      itemId: 2010,
    },
    {
      name: 'Kircheis Shard',
      itemId: 2015,
    },
    {
      name: 'Refillable Potion',
      itemId: 2031,
    },
    {
      name: 'Corrupting Potion',
      itemId: 2033,
    },
    {
      name: "Guardian's Horn",
      itemId: 2051,
    },
    {
      name: 'Poro-Snax',
      itemId: 2052,
    },
    {
      name: 'Control Ward',
      itemId: 2055,
    },
    {
      name: "Shurelya's Battlesong",
      itemId: 2065,
    },
    {
      name: 'Elixir of Iron',
      itemId: 2138,
    },
    {
      name: 'Elixir of Sorcery',
      itemId: 2139,
    },
    {
      name: 'Elixir of Wrath',
      itemId: 2140,
    },
    {
      name: 'Minion Dematerializer',
      itemId: 2403,
    },
    {
      name: 'Commencing Stopwatch',
      itemId: 2419,
    },
    {
      name: 'Stopwatch',
      itemId: 2420,
    },
    {
      name: 'Broken Stopwatch',
      itemId: 2421,
    },
    {
      name: 'Slightly Magical Footwear',
      itemId: 2422,
    },
    {
      name: 'Perfectly Timed Stopwatch',
      itemId: 2423,
    },
    {
      name: 'Broken Stopwatch',
      itemId: 2424,
    },
    {
      name: 'Abyssal Mask',
      itemId: 3001,
    },
    {
      name: "Archangel's Staff",
      itemId: 3003,
    },
    {
      name: 'Manamune',
      itemId: 3004,
    },
    {
      name: "Berserker's Greaves",
      itemId: 3006,
    },
    {
      name: 'Boots of Swiftness',
      itemId: 3009,
    },
    {
      name: "Sorcerer's Shoes",
      itemId: 3020,
    },
    {
      name: 'Glacial Buckler',
      itemId: 3024,
    },
    {
      name: 'Guardian Angel',
      itemId: 3026,
    },
    {
      name: 'Infinity Edge',
      itemId: 3031,
    },
    {
      name: 'Mortal Reminder',
      itemId: 3033,
    },
    {
      name: 'Last Whisper',
      itemId: 3035,
    },
    {
      name: "Lord Dominik's Regards",
      itemId: 3036,
    },
    {
      name: "Seraph's Embrace",
      itemId: 3040,
    },
    {
      name: "Mejai's Soulstealer",
      itemId: 3041,
    },
    {
      name: 'Muramana',
      itemId: 3042,
    },
    {
      name: 'Phage',
      itemId: 3044,
    },
    {
      name: 'Phantom Dancer',
      itemId: 3046,
    },
    {
      name: 'Plated Steelcaps',
      itemId: 3047,
    },
    {
      name: "Zeke's Convergence",
      itemId: 3050,
    },
    {
      name: 'Hearthbound Axe',
      itemId: 3051,
    },
    {
      name: "Sterak's Gage",
      itemId: 3053,
    },
    {
      name: 'Sheen',
      itemId: 3057,
    },
    {
      name: 'Spirit Visage',
      itemId: 3065,
    },
    {
      name: 'Winged Moonplate',
      itemId: 3066,
    },
    {
      name: 'Kindlegem',
      itemId: 3067,
    },
    {
      name: 'Sunfire Aegis',
      itemId: 3068,
    },
    {
      name: 'Tear of the Goddess',
      itemId: 3070,
    },
    {
      name: 'Black Cleaver',
      itemId: 3071,
    },
    {
      name: 'Bloodthirster',
      itemId: 3072,
    },
    {
      name: 'Ravenous Hydra',
      itemId: 3074,
    },
    {
      name: 'Thornmail',
      itemId: 3075,
    },
    {
      name: 'Bramble Vest',
      itemId: 3076,
    },
    {
      name: 'Tiamat',
      itemId: 3077,
    },
    {
      name: 'Trinity Force',
      itemId: 3078,
    },
    {
      name: "Warden's Mail",
      itemId: 3082,
    },
    {
      name: "Warmog's Armor",
      itemId: 3083,
    },
    {
      name: "Runaan's Hurricane",
      itemId: 3085,
    },
    {
      name: 'Zeal',
      itemId: 3086,
    },
    {
      name: "Rabadon's Deathcap",
      itemId: 3089,
    },
    {
      name: "Wit's End",
      itemId: 3091,
    },
    {
      name: 'Rapid Firecannon',
      itemId: 3094,
    },
    {
      name: 'Stormrazor',
      itemId: 3095,
    },
    {
      name: 'Lich Bane',
      itemId: 3100,
    },
    {
      name: "Banshee's Veil",
      itemId: 3102,
    },
    {
      name: 'Aegis of the Legion',
      itemId: 3105,
    },
    {
      name: 'Redemption',
      itemId: 3107,
    },
    {
      name: 'Fiendish Codex',
      itemId: 3108,
    },
    {
      name: "Knight's Vow",
      itemId: 3109,
    },
    {
      name: 'Frozen Heart',
      itemId: 3110,
    },
    {
      name: "Mercury's Treads",
      itemId: 3111,
    },
    {
      name: "Guardian's Orb",
      itemId: 3112,
    },
    {
      name: 'Aether Wisp',
      itemId: 3113,
    },
    {
      name: 'Forbidden Idol',
      itemId: 3114,
    },
    {
      name: "Nashor's Tooth",
      itemId: 3115,
    },
    {
      name: "Rylai's Crystal Scepter",
      itemId: 3116,
    },
    {
      name: 'Mobility Boots',
      itemId: 3117,
    },
    {
      name: "Executioner's Calling",
      itemId: 3123,
    },
    {
      name: "Guinsoo's Rageblade",
      itemId: 3124,
    },
    {
      name: "Caulfield's Warhammer",
      itemId: 3133,
    },
    {
      name: 'Serrated Dirk',
      itemId: 3134,
    },
    {
      name: 'Void Staff',
      itemId: 3135,
    },
    {
      name: 'Mercurial Scimitar',
      itemId: 3139,
    },
    {
      name: 'Quicksilver Sash',
      itemId: 3140,
    },
    {
      name: "Youmuu's Ghostblade",
      itemId: 3142,
    },
    {
      name: "Randuin's Omen",
      itemId: 3143,
    },
    {
      name: 'Hextech Alternator',
      itemId: 3145,
    },
    {
      name: 'Hextech Rocketbelt',
      itemId: 3152,
    },
    {
      name: 'Blade of the Ruined King',
      itemId: 3153,
    },
    {
      name: 'Hexdrinker',
      itemId: 3155,
    },
    {
      name: 'Maw of Malmortius',
      itemId: 3156,
    },
    {
      name: "Zhonya's Hourglass",
      itemId: 3157,
    },
    {
      name: 'Ionian Boots of Lucidity',
      itemId: 3158,
    },
    {
      name: 'Morellonomicon',
      itemId: 3165,
    },
    {
      name: "Guardian's Blade",
      itemId: 3177,
    },
    {
      name: 'Umbral Glaive',
      itemId: 3179,
    },
    {
      name: 'Hullbreaker',
      itemId: 3181,
    },
    {
      name: "Guardian's Hammer",
      itemId: 3184,
    },
    {
      name: 'Locket of the Iron Solari',
      itemId: 3190,
    },
    {
      name: "Seeker's Armguard",
      itemId: 3191,
    },
    {
      name: 'Gargoyle Stoneplate',
      itemId: 3193,
    },
    {
      name: "Spectre's Cowl",
      itemId: 3211,
    },
    {
      name: "Mikael's Blessing",
      itemId: 3222,
    },
    {
      name: 'Scarecrow Effigy',
      itemId: 3330,
    },
    {
      name: 'Stealth Ward',
      itemId: 3340,
    },
    {
      name: 'Farsight Alteration',
      itemId: 3363,
    },
    {
      name: 'Oracle Lens',
      itemId: 3364,
    },
    {
      name: 'Your Cut',
      itemId: 3400,
    },
    {
      name: 'Ardent Censer',
      itemId: 3504,
    },
    {
      name: 'Essence Reaver',
      itemId: 3508,
    },
    {
      name: 'Eye of the Herald',
      itemId: 3513,
    },
    {
      name: "Kalista's Black Spear",
      itemId: 3599,
    },
    {
      name: "Kalista's Black Spear",
      itemId: 3600,
    },
    {
      name: "Dead Man's Plate",
      itemId: 3742,
    },
    {
      name: 'Titanic Hydra',
      itemId: 3748,
    },
    {
      name: 'Crystalline Bracer',
      itemId: 3801,
    },
    {
      name: 'Lost Chapter',
      itemId: 3802,
    },
    {
      name: 'Edge of Night',
      itemId: 3814,
    },
    {
      name: "Spellthief's Edge",
      itemId: 3850,
    },
    {
      name: 'Frostfang',
      itemId: 3851,
    },
    {
      name: 'Shard of True Ice',
      itemId: 3853,
    },
    {
      name: 'Steel Shoulderguards',
      itemId: 3854,
    },
    {
      name: 'Runesteel Spaulders',
      itemId: 3855,
    },
    {
      name: 'Pauldrons of Whiterock',
      itemId: 3857,
    },
    {
      name: 'Relic Shield',
      itemId: 3858,
    },
    {
      name: "Targon's Buckler",
      itemId: 3859,
    },
    {
      name: 'Bulwark of the Mountain',
      itemId: 3860,
    },
    {
      name: 'Spectral Sickle',
      itemId: 3862,
    },
    {
      name: 'Harrowing Crescent',
      itemId: 3863,
    },
    {
      name: 'Black Mist Scythe',
      itemId: 3864,
    },
    {
      name: 'Oblivion Orb',
      itemId: 3916,
    },
    {
      name: 'Imperial Mandate',
      itemId: 4005,
    },
    {
      name: 'Force of Nature',
      itemId: 4401,
    },
    {
      name: 'The Golden Spatula',
      itemId: 4403,
    },
    {
      name: 'Horizon Focus',
      itemId: 4628,
    },
    {
      name: 'Cosmic Drive',
      itemId: 4629,
    },
    {
      name: 'Blighting Jewel',
      itemId: 4630,
    },
    {
      name: 'Verdant Barrier',
      itemId: 4632,
    },
    {
      name: 'Riftmaker',
      itemId: 4633,
    },
    {
      name: 'Leeching Leer',
      itemId: 4635,
    },
    {
      name: 'Night Harvester',
      itemId: 4636,
    },
    {
      name: 'Demonic Embrace',
      itemId: 4637,
    },
    {
      name: 'Watchful Wardstone',
      itemId: 4638,
    },
    {
      name: 'Bandleglass Mirror',
      itemId: 4642,
    },
    {
      name: 'Vigilant Wardstone',
      itemId: 4643,
    },
    {
      name: 'Ironspike Whip',
      itemId: 6029,
    },
    {
      name: 'Silvermere Dawn',
      itemId: 6035,
    },
    {
      name: "Death's Dance",
      itemId: 6333,
    },
    {
      name: 'Chempunk Chainsword',
      itemId: 6609,
    },
    {
      name: 'Staff of Flowing Water',
      itemId: 6616,
    },
    {
      name: 'Moonstone Renewer',
      itemId: 6617,
    },
    {
      name: 'Goredrinker',
      itemId: 6630,
    },
    {
      name: 'Stridebreaker',
      itemId: 6631,
    },
    {
      name: 'Divine Sunderer',
      itemId: 6632,
    },
    {
      name: "Liandry's Anguish",
      itemId: 6653,
    },
    {
      name: "Luden's Tempest",
      itemId: 6655,
    },
    {
      name: 'Everfrost',
      itemId: 6656,
    },
    {
      name: "Bami's Cinder",
      itemId: 6660,
    },
    {
      name: 'Frostfire Gauntlet',
      itemId: 6662,
    },
    {
      name: 'Turbo Chemtank',
      itemId: 6664,
    },
    {
      name: 'Noonquiver',
      itemId: 6670,
    },
    {
      name: 'Galeforce',
      itemId: 6671,
    },
    {
      name: 'Kraken Slayer',
      itemId: 6672,
    },
    {
      name: 'Immortal Shieldbow',
      itemId: 6673,
    },
    {
      name: 'Navori Quickblades',
      itemId: 6675,
    },
    {
      name: 'The Collector',
      itemId: 6676,
    },
    {
      name: 'Rageknife',
      itemId: 6677,
    },
    {
      name: 'Duskblade of Draktharr',
      itemId: 6691,
    },
    {
      name: 'Eclipse',
      itemId: 6692,
    },
    {
      name: "Prowler's Claw",
      itemId: 6693,
    },
    {
      name: "Serylda's Grudge",
      itemId: 6694,
    },
    {
      name: "Serpent's Fang",
      itemId: 6695,
    },
    {
      name: "Anathema's Chains",
      itemId: 8001,
    },
  ];
  return (
    items.find((x) => x.name == item_name)?.itemId ||
    '<:F5141416:898207145378603019>'
  );
}

module.exports = getItemId;
