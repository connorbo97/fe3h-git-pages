import { COMBAT_ARTS } from './combatArts';
import { COMBAT_SKILLS } from './combatSkills';
import { Dice } from './dice';
import { PickOnePromptType } from './enums';
import { PLAYER_SKILL, SkillProficiency } from './playerSkills';
import { PLAYER_STAT } from './stats';
import { WEAPONS } from './weapons';
import { WEAPON_TYPE } from './weaponType';

export const CLASS = {
	MYRMIDON: 'MYRMIDON',
	SOLDIER: 'SOLDIER',
	FIGHTER: 'FIGHTER',
	RANGER: 'RANGER',
	MONK: 'MONK',

	MERCENARY: 'MERCENARY',
	THIEF: 'THIEF',
	CAVALIER: 'CAVALIER',
	ARCHER: 'ARCHER',
	BRIGAND: 'BRIGAND',
	ARMORED_KNIGHT: 'ARMORED_KNIGHT',
	BRAWLER: 'BRAWLER',
	MAGE: 'MAGE',
	PRIEST: 'PRIEST',
	
	SWORDMASTER: 'SWORDMASTER',
	ASSASSIN: 'ASSASSIN',
	PALADIN: 'PALADIN',
	WARRIOR: 'WARRIOR',
	FORTRESS_KNIGHT: 'FORTRESS_KNIGHT',
	WYVERN_RIDER: 'WYVERN_RIDER',
	PEGASUS_KNIGHT: 'PEGASUS_KNIGHT',
	SNIPER: 'SNIPER',
	GRAPPLER: 'GRAPPLER',
	WARLOCK: 'WARLOCK',
	BISHOP: 'BISHOP',
};

export const BEGINNER_CLASSES = new Set([
	CLASS.MYRMIDON,
	CLASS.SOLDIER,
	CLASS.FIGHTER,
	CLASS.RANGER,
	CLASS.MONK
]);
export const INTERMEDIATE_CLASSES = new Set([
	CLASS.MERCENARY,
	CLASS.THIEF,
	CLASS.CAVALIER,
	CLASS.ARCHER,
	CLASS.BRIGAND,
	CLASS.ARMORED_KNIGHT,
	CLASS.BRAWLER,
	CLASS.MAGE,
	CLASS.PRIEST
]);
export const ADVANCED_CLASSES = new Set([
	CLASS.SWORDMASTER,
	CLASS.ASSASSIN,
	CLASS.PALADIN,
	CLASS.WARRIOR,
	CLASS.FORTRESS_KNIGHT,
	CLASS.WYVERN_RIDER,
	CLASS.PEGASUS_KNIGHT,
	CLASS.SNIPER,
	CLASS.GRAPPLER,
	CLASS.WARLOCK,
	CLASS.BISHOP
]);

export const CLASS_TO_FEATURES: ClassToFeatures = {
	[CLASS.MYRMIDON]: {
		label: 'Myrmidon',
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 12
			},
			combatArts: {
				[COMBAT_ARTS.SWAP]: 1
			},
			weapons: {
				[WEAPONS.IRON_SWORD]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.SWORD]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.MYRMIDON_MASTER]: 1
			}
		}
	},
	[CLASS.SOLDIER]: {
		label: 'Soldier',
		unlocks: {
			pickOne: [
				{
					type: PickOnePromptType.PlayerStat,
					options: [
						{
							stat: PLAYER_STAT.DEX,
							value: 12
						},
						{
							stat: PLAYER_STAT.STR,
							value: 12
						}
					]
				}
			],
			combatArts: {
				[COMBAT_ARTS.REPOSITION]: 1
			},
			weapons: {
				[WEAPONS.IRON_LANCE]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.LANCE]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.SOLDIER_MASTER]: 1
			}
		}
	},
	[CLASS.FIGHTER]: {
		label: 'Fighter',
		unlocks: {
			pickOne: [
				{
					type: PickOnePromptType.PlayerStat,
					options: [
						{
							stat: PLAYER_STAT.DEX,
							value: 12
						},
						{
							stat: PLAYER_STAT.STR,
							value: 12
						}
					]
				}
			],
			combatArts: {
				[COMBAT_ARTS.SHOVE]: 1
			},
			weapons: {
				[WEAPONS.IRON_AXE]: 1,
				[WEAPONS.IRON_GAUNTLETS]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.FISTS]: 1.3,
				[WEAPON_TYPE.AXE]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.FIGHTER_MASTER]: 1
			}
		}
	},
	[CLASS.RANGER]: {
		label: 'Ranger',
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 12
			},
			combatArts: {
				[COMBAT_ARTS.PULL_BACK]: 1
			},
			weapons: {
				[WEAPONS.IRON_BOW]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.BOW]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.RANGER_MASTER]: 1
			}
		}
	},
	[CLASS.MONK]: {
		label: 'Monk',
		canUseMagic: true,
		unlocks: {
			playerStats: {
				[PLAYER_STAT.INT]: 12
			},
			combatArts: {
				[COMBAT_ARTS.PULL_BACK]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.REASON]: 1.3,
				[WEAPON_TYPE.FAITH]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.MONK_MASTER]: 1
			}
		}
	},

	[CLASS.MERCENARY]: {
		label: 'Mercenary',
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 14
			},
			combatSkills: {
				[COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.STEEL_SWORD]: 1,
				[WEAPONS.IRON_AXE]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.SWORD]: 1.6,
				[WEAPON_TYPE.AXE]: 1.3
			},
			msBonus: 1
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.VANTAGE]: 1
			}
		}
	},
	[CLASS.THIEF]: {
		label: 'Thief',
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 14
			},
			combatSkills: {
				[COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.STEEL_SWORD]: 1,
				[WEAPONS.IRON_BOW]: 1
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.SWORD]: 1.6,
				[WEAPON_TYPE.BOW]: 1.3
			},
			playerSkills: {
				[PLAYER_SKILL.LOCKPICKING]: SkillProficiency.PROFICIENT
			},
			msBonus: 1
		},
		whenMastered: {
			playerSkills: {
				[PLAYER_SKILL.LOCKPICKING]: SkillProficiency.PROFICIENT,
				[PLAYER_SKILL.SLEIGHT_OF_HAND]: SkillProficiency.PROFICIENT
			}
		}
	},
	[CLASS.CAVALIER]: {
		label: 'Cavalier',
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 12,
				[PLAYER_STAT.WIS]: 12
			},
			playerSkills: {
				[PLAYER_SKILL.ANIMAL_HANDLING]: SkillProficiency.PROFICIENT
			},
			weapons: {
				[WEAPONS.STEEL_LANCE]: 1,
				[WEAPONS.PIKE]: 1
			},
			pickOne: [
				{
					type: PickOnePromptType.Weapon,
					options: [WEAPONS.IRON_SWORD, WEAPONS.IRON_AXE, WEAPONS.IRON_BOW]
				}
			]
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.LANCE]: 1.6
			},
			xpMooch: {
				[WEAPON_TYPE.RIDING]: 1
			},
			playerSkills: {
				[PLAYER_SKILL.LOCKPICKING]: SkillProficiency.PROFICIENT
			},
			msBonus: 3
		},
		whenMastered: {
			playerSkills: {
				[PLAYER_SKILL.LOCKPICKING]: SkillProficiency.PROFICIENT
			},
			combatSkills: {
				[COMBAT_SKILLS.ANIMAL_WHISPERER]: 1
			}
		}
	},
	[CLASS.ARCHER]: {
		label: 'Archer',
		unlocks: {
			playerStats: {
				[PLAYER_STAT.DEX]: 14
			},
			weapons: {
				[WEAPONS.STEEL_BOW]: 1,
				[WEAPONS.SHORT_BOW]: 1,
				[WEAPONS.IRON_LANCE]: 1
			}
		},
		whenEquipped: {
			bonusRange: {
				[WEAPON_TYPE.BOW]: 1
			},
			msBonus: 1,
			xpMods: {
				[WEAPON_TYPE.BOW]: 1.6,
				[WEAPON_TYPE.SWORD]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.BULLSEYE]: 1
			}
		}
	},
	[CLASS.BRIGAND]: {
		label: 'Brigand',
		unlocks: {
			hpBonus: 1,
			playerStats: {
				[PLAYER_STAT.STR]: 14
			},
			combatSkills: {
				[COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.STEEL_AXE]: 1,
				[WEAPONS.HAND_AXE]: 1,
				[WEAPONS.STEEL_GAUNTLETS]: 1
			}
		},
		whenEquipped: {
			msBonus: 1,
			xpMods: {
				[WEAPON_TYPE.AXE]: 1.6,
				[WEAPON_TYPE.FISTS]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.ARMORED_KNIGHT]: {
		label: 'Armored Knight',
		unlocks: {
			hpBonus: 1,
			playerStats: {
				[PLAYER_STAT.STR]: 12,
				[PLAYER_STAT.CON]: 14
			},
			weapons: {
				[WEAPONS.STEEL_AXE]: 1,
				[WEAPONS.STEEL_LANCE]: 1,
				[WEAPONS.HAMMER]: 1,
				[WEAPONS.IRON_LANCE]: 1,
				[WEAPONS.IRON_AXE]: 1
			}
		},
		whenEquipped: {
			followUpBonus: -2,
			protectionBonus: 2,
			xpMods: {
				[WEAPON_TYPE.AXE]: 1.6,
				[WEAPON_TYPE.LANCE]: 1.6
			},
			xpMooch: {
				[WEAPON_TYPE.HEAVY_ARMOR]: 1
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.ARMORED_COMBAT]: 1
			}
		}
	},
	[CLASS.BRAWLER]: {
		label: 'Brawler',
		unlocks: {
			pickOne: [
				{
					type: PickOnePromptType.PlayerStat,
					description:
						'Pick different stats per dropdown (e.g. if you pick 14 DEX in this dropdown, pick 12 STR in the other)',
					disableRandom: true,
					options: [
						{
							stat: PLAYER_STAT.DEX,
							value: 14
						},
						{
							stat: PLAYER_STAT.STR,
							value: 14
						}
					]
				},
				{
					type: PickOnePromptType.PlayerStat,
					options: [
						{
							stat: PLAYER_STAT.DEX,
							value: 12
						},
						{
							stat: PLAYER_STAT.STR,
							value: 12
						}
					]
				}
			],
			hpBonus: 1,
			combatSkills: {
				[COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.STEEL_GAUNTLETS]: 1,
				[WEAPONS.CLOTH_GAUNTLETS]: 1
			}
		},
		whenEquipped: {
			msBonus: 1,
			xpMods: {
				[WEAPON_TYPE.FISTS]: 1.6,
				[WEAPON_TYPE.AXE]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.GRAPPLER]: 1
			}
		}
	},
	[CLASS.MAGE]: {
		label: 'Mage',
		canUseMagic: true,
		unlocks: {
			playerStats: {
				[PLAYER_STAT.INT]: 14
			},
			pickOne: [
				{
					type: PickOnePromptType.Weapon,
					options: [
						'DOUBLE_BASE_USES',
						WEAPONS.FIRE,
						WEAPONS.WIND,
						WEAPONS.THUNDER,
						WEAPONS.BLIZZARD
					]
				}
			]
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.REASON]: 1.6,
				[WEAPON_TYPE.FAITH]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.FIENDISH_BLOW]: 1
			}
		}
	},
	[CLASS.PRIEST]: {
		label: 'Priest',
		canUseMagic: true,
		unlocks: {
			playerStats: {
				[PLAYER_STAT.INT]: 14
			},
			playerSkills: {
				[PLAYER_SKILL.RELIGION]: SkillProficiency.PROFICIENT
			}
		},
		whenEquipped: {
			xpMods: {
				[WEAPON_TYPE.FAITH]: 1.6,
				[WEAPON_TYPE.REASON]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				[COMBAT_SKILLS.HEAL_PLUS]: 1
			}
		}
	},

	// CLASS.SWORDMASTER,
	// CLASS.ASSASSIN,
	// CLASS.PALADIN,
	// CLASS.WARRIOR,
	// CLASS.FORTRESS_KNIGHT,
	// CLASS.WYVERN_RIDER,
	// CLASS.PEGASUS_KNIGHT,
	// CLASS.SNIPER,
	// CLASS.GRAPPLER,
	// CLASS.WARLOCK,
	// CLASS.BISHOP

	[CLASS.SWORDMASTER]: {
		label: 'Swordmaster',
		unlocks: {
			hpBonus: 2,
			playerStats: {
				[PLAYER_STAT.STR]: 16,
				[PLAYER_STAT.DEX]: 16,
			},
			combatSkills: {
				// [COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.SILVER_SWORD]: 1,
			},
		},
		whenEquipped: {
			msBonus: 1,
			bonusCrit: {
				[WEAPON_TYPE.SWORD]: 2,
			},
			bonusDamage: {
				[WEAPON_TYPE.SWORD]: [Dice.d2],
			},
			xpMods: {
				[WEAPON_TYPE.SWORD]: 1.9,
				[WEAPON_TYPE.LANCE]: 1.3,
				[WEAPON_TYPE.REASON]: 1.3
			}
		},
		whenMastered: {
			combatSkills: {
				// [COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.ASSASSIN]: {
		label: 'Assassin',
		unlocks: {
			hpBonus: 2,
			playerStats: {
				[PLAYER_STAT.STR]: 14,
				[PLAYER_STAT.DEX]: 18,
			},
			combatSkills: {
				// [COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.SILVER_SWORD]: 1,
				[WEAPONS.STEEL_BOW]: 1,
				[WEAPONS.SHORT_BOW]: 1,
			},
		},
		whenEquipped: {
			msBonus: 2,
			bonusDamage: {
				[WEAPON_TYPE.SWORD]: [Dice.d2],
			},
			xpMods: {
				[WEAPON_TYPE.SWORD]: 1.9,
				[WEAPON_TYPE.BOW]: 1.6
			}
		},
		whenMastered: {
			combatSkills: {
				// [COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.PALADIN]: {
		label: 'Paladin',
		unlocks: {
			hpBonus: 3,
			playerStats: {
				[PLAYER_STAT.STR]: 14,
				[PLAYER_STAT.CON]: 12,
				[PLAYER_STAT.WIS]: 14,
			},
			combatSkills: {
				// [COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.SILVER_LANCE]: 1,
			},
		},
		whenEquipped: {
			msBonus: 4,
			bonusDamage: {
				[WEAPON_TYPE.LANCE]: [Dice.d2],
			},
			xpMods: {
				[WEAPON_TYPE.LANCE]: 1.9,
				[WEAPON_TYPE.RIDING]: 1.6,
			}
		},
		whenMastered: {
			combatSkills: {
				// [COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.WARRIOR]: {
		label: 'Warrior',
		unlocks: {
			hpBonus: 3,
			playerStats: {
				[PLAYER_STAT.STR]: 16,
				[PLAYER_STAT.CON]: 12,
			},
			combatSkills: {
				// [COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.SILVER_AXE]: 1,
			},
		},
		whenEquipped: {
			msBonus: 1,
			bonusDamage: {
				[WEAPON_TYPE.AXE]: [Dice.d2],
			},
			bonusCrit: {
				[WEAPON_TYPE.AXE]: 2,
			},
			xpMods: {
				[WEAPON_TYPE.AXE]: 1.9,
				[WEAPON_TYPE.RIDING]: 1.3,
				[WEAPON_TYPE.HEAVY_ARMOR]: 1.3,
			}
		},
		whenMastered: {
			combatSkills: {
				// [COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.FORTRESS_KNIGHT]: {
		label: 'Fortress Knight',
		unlocks: {
			hpBonus: 3,
			playerStats: {
				[PLAYER_STAT.STR]: 16,
				[PLAYER_STAT.CON]: 14,
			},
			combatSkills: {
				// [COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.SILVER_AXE]: 1,
			},
		},
		whenEquipped: {
			protectionBonus: 4,
			bonusDamage: {
				[WEAPON_TYPE.AXE]: [Dice.d2],
			},
			xpMods: {
				[WEAPON_TYPE.AXE]: 1.9,
				[WEAPON_TYPE.RIDING]: 1.3,
				[WEAPON_TYPE.HEAVY_ARMOR]: 1.3,
			}
		},
		whenMastered: {
			combatSkills: {
				// [COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.WYVERN_RIDER]: {
		label: 'Fortress Knight',
		unlocks: {
			hpBonus: 2,
			playerStats: {
				[PLAYER_STAT.STR]: 16,
				[PLAYER_STAT.WIS]: 14,
			},
			combatSkills: {
				// [COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.SILVER_AXE]: 1,
				[WEAPONS.IRON_LANCE]: 1,
				[WEAPONS.STEEL_LANCE]: 1,
			},
		},
		whenEquipped: {
			msBonus: 3,
			bonusDamage: {
				[WEAPON_TYPE.AXE]: [Dice.d2],
			},
			xpMods: {
				[WEAPON_TYPE.AXE]: 1.9,
				[WEAPON_TYPE.RIDING]: 1.6,
				[WEAPON_TYPE.LANCE]: 1.3,
			}
		},
		whenMastered: {
			combatSkills: {
				// [COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.PEGASUS_KNIGHT]: {
		label: 'Pegasus Knight',
		unlocks: {
			hpBonus: 2,
			playerStats: {
				[PLAYER_STAT.STR]: 12,
				[PLAYER_STAT.DEX]: 18,
				[PLAYER_STAT.WIS]: 14,
			},
			combatSkills: {
				// [COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.SILVER_LANCE]: 1,
				[WEAPONS.STEEL_SWORD]: 1,
				[WEAPONS.STEEL_LANCE]: 1,
				[WEAPONS.IRON_SWORD]: 1,
				[WEAPONS.IRON_LANCE]: 1,
			},
		},
		whenEquipped: {
			msBonus: 3,
			bonusDamage: {
				[WEAPON_TYPE.LANCE]: [Dice.d2],
			},
			xpMods: {
				[WEAPON_TYPE.LANCE]: 1.9,
				[WEAPON_TYPE.RIDING]: 1.6,
				[WEAPON_TYPE.SWORD]: 1.6,
			}
		},
		whenMastered: {
			combatSkills: {
				// [COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.SNIPER]: {
		label: 'Sniper',
		unlocks: {
			hpBonus: 2,
			playerStats: {
				[PLAYER_STAT.STR]: 14,
				[PLAYER_STAT.DEX]: 18,
			},
			combatSkills: {
				// [COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.SILVER_BOW]: 1,
				[WEAPONS.IRON_LANCE]: 1,
			},
		},
		whenEquipped: {
			msBonus: 1,
			bonusRange: {
				[WEAPON_TYPE.BOW]: 1,
			},
			bonusDamage: {
				[WEAPON_TYPE.BOW]: [Dice.d2],
			},
			xpMods: {
				[WEAPON_TYPE.BOW]: 1.9,
				[WEAPON_TYPE.RIDING]: 1.3,
				[WEAPON_TYPE.LANCE]: 1.3,
			}
		},
		whenMastered: {
			combatSkills: {
				// [COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.GRAPPLER]: {
		label: 'Grappler',
		unlocks: {
			hpBonus: 3,
			playerStats: {
				[PLAYER_STAT.STR]: 16,
				[PLAYER_STAT.DEX]: 16,
				[PLAYER_STAT.CON]: 12,
			},
			combatSkills: {
				// [COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
			weapons: {
				[WEAPONS.SILVER_GAUNTLETS]: 1,
				[WEAPONS.IRON_AXE]: 1,
				[WEAPONS.STEEL_AXE]: 1,
			},
		},
		whenEquipped: {
			msBonus: 2,
			bonusDamage: {
				[WEAPON_TYPE.FISTS]: [Dice.d2],
			},
			xpMods: {
				[WEAPON_TYPE.FISTS]: 1.9,
				[WEAPON_TYPE.AXE]: 1.6,
			}
		},
		whenMastered: {
			combatSkills: {
				// [COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.WARLOCK]: {
		label: 'Warlock',
		unlocks: {
			hpBonus: 1,
			playerStats: {
				[PLAYER_STAT.INT]: 18,
			},
			combatSkills: {
				// [COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
		},
		whenEquipped: {
			bonusDamage: {
				[WEAPON_TYPE.REASON]: [Dice.d2],
			},
			xpMods: {
				[WEAPON_TYPE.REASON]: 1.9,
				[WEAPON_TYPE.FAITH]: 1.6,
			}
		},
		whenMastered: {
			combatSkills: {
				// [COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
	[CLASS.BISHOP]: {
		label: 'Bishop',
		unlocks: {
			hpBonus: 1,
			playerStats: {
				[PLAYER_STAT.INT]: 16,
				[PLAYER_STAT.CON]: 12,
			},
			combatSkills: {
				// [COMBAT_SKILLS.MERCENARY_THIEF_SKILL]: 1
			},
		},
		whenEquipped: {
			bonusDamage: {
				[WEAPON_TYPE.FAITH]: [Dice.d2],
			},
			xpMods: {
				[WEAPON_TYPE.FAITH]: 1.9,
				[WEAPON_TYPE.REASON]: 1.6,
			}
		},
		whenMastered: {
			combatSkills: {
				// [COMBAT_SKILLS.DEATH_BLOW]: 1
			}
		}
	},
};
export const CLASS_TO_LABEL = Object.keys(CLASS_TO_FEATURES).reduce((acc, f) => {
	acc[f] = CLASS_TO_FEATURES[f].label;

	return acc;
}, {});

export const SUPERIORITY_DIE_TO_CLASSES: { [n: number]: Set<string> } = {
	2: new Set(Object.values(CLASS)),
	4: new Set(BEGINNER_CLASSES),
	6: new Set(INTERMEDIATE_CLASSES)
};

export const getSuperiorityDieFromClasses = (unlockedClasses: Array<any>) => {
	return Object.keys(SUPERIORITY_DIE_TO_CLASSES).reduce((acc: number, die: any) => {
		if (unlockedClasses.some((c: any) => SUPERIORITY_DIE_TO_CLASSES[die].has(c))) {
			return Math.max(parseInt(die), acc);
		}
		return acc;
	}, 2);
};
