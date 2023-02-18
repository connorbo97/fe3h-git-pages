import { Dice } from './dice';
import { WEAPONS } from './weapons';
import { MARTIAL_WEAPON_TYPES, WEAPON_TYPE } from './weaponType';

// Combat Skills
export const COMBAT_SKILLS = {
	// Mastery Skills
	MYRMIDON_MASTER: 'MYRMIDON_MASTER',
	SOLDIER_MASTER: 'SOLDIER_MASTER',
	FIGHTER_MASTER: 'FIGHTER_MASTER',
	RANGER_MASTER: 'RANGER_MASTER',
	MONK_MASTER: 'MONK_MASTER',

	MERCENARY_THIEF_SKILL: 'MERCENARY_THIEF_SKILL',
	VANTAGE: 'VANTAGE',
	ANIMAL_WHISPERER: 'ANIMAL_WHISPERER',
	BULLSEYE: 'BULLSEYE',
	DEATH_BLOW: 'DEATH_BLOW',
	ARMORED_COMBAT: 'ARMORED_COMBAT',
	GRAPPLER: 'GRAPPLER',

	FIENDISH_BLOW: 'FIENDISH_BLOW',
	HEAL_PLUS: 'HEAL_PLUS',

	// XP Skills
	SWORD_PROWESS_1: 'SWORD_PROWESS_1',
	SWORD_PROWESS_2: 'SWORD_PROWESS_2',
	SWORD_PROWESS_3: 'SWORD_PROWESS_3',
	SWORD_PROWESS_4: 'SWORD_PROWESS_4',
	SWORD_PROWESS_5: 'SWORD_PROWESS_5',

	AXE_PROWESS_1: 'AXE_PROWESS_1',
	AXE_PROWESS_2: 'AXE_PROWESS_2',
	AXE_PROWESS_3: 'AXE_PROWESS_3',
	AXE_PROWESS_4: 'AXE_PROWESS_4',
	AXE_PROWESS_5: 'AXE_PROWESS_5',

	LANCE_PROWESS_1: 'LANCE_PROWESS_1',
	LANCE_PROWESS_2: 'LANCE_PROWESS_2',
	LANCE_PROWESS_3: 'LANCE_PROWESS_3',
	LANCE_PROWESS_4: 'LANCE_PROWESS_4',
	LANCE_PROWESS_5: 'LANCE_PROWESS_5',

	BOW_PROWESS_1: 'BOW_PROWESS_1',
	CLOSE_COUNTER: 'CLOSE_COUNTER',
	BOW_PROWESS_2: 'BOW_PROWESS_2',
	BOW_PROWESS_3: 'BOW_PROWESS_3',
	BOW_PROWESS_4: 'BOW_PROWESS_4',
	BOW_PROWESS_5: 'BOW_PROWESS_5',

	FISTS_PROWESS_1: 'FISTS_PROWESS_1',
	FISTS_PROWESS_2: 'FISTS_PROWESS_2',
	FISTS_PROWESS_3: 'FISTS_PROWESS_3',
	FISTS_PROWESS_4: 'FISTS_PROWESS_4',
	FISTS_PROWESS_5: 'FISTS_PROWESS_5',

	REASON_PROWESS_1: 'REASON_PROWESS_1',
	REASON_PROWESS_2: 'REASON_PROWESS_2',
	REASON_PROWESS_3: 'REASON_PROWESS_3',
	REASON_PROWESS_4: 'REASON_PROWESS_4',
	REASON_PROWESS_5: 'REASON_PROWESS_5',

	FAITH_PROWESS_1: 'FAITH_PROWESS_1',
	FAITH_PROWESS_2: 'FAITH_PROWESS_2',
	FAITH_PROWESS_3: 'FAITH_PROWESS_3',
	FAITH_PROWESS_4: 'FAITH_PROWESS_4',
	FAITH_PROWESS_5: 'FAITH_PROWESS_5',

	LEADERSHIP_PROWESS_1: 'LEADERSHIP_PROWESS_1',
	LEADERSHIP_PROWESS_2: 'LEADERSHIP_PROWESS_2',
	LEADERSHIP_PROWESS_3: 'LEADERSHIP_PROWESS_3',
	LEADERSHIP_PROWESS_4: 'LEADERSHIP_PROWESS_4',
	LEADERSHIP_PROWESS_5: 'LEADERSHIP_PROWESS_5',

	WEIGHT_MINUS_3: 'WEIGHT_MINUS_3',

	AGILE_RIDER: 'AGILE_RIDER',

	// Starter Skills
	OFFICERS_DUTY: 'OFFICERS_DUTY',
	SONGSTRESS: 'SONGSTRESS',
	CONFIDENCE: 'CONFIDENCE',
	PERSECUTION_COMPLEX: 'PERSECUTION_COMPLEX',
	BORN_FIGHTER: 'BORN_FIGHTER',
	CATNAP: 'CATNAP',
	HUNTERS_BOON: 'HUNTERS_BOON',
	LIVE_TO_SERVE: 'LIVE_TO_SERVE',
	STAUNCH_SHIELD: 'STAUNCH_SHIELD',
	LONE_WOLF: 'LONE_WOLF',
	PERSEVERANCE: 'PERSEVERANCE',
	PHILANDER: 'PHILANDER',
	LADY_KNIGHT: 'LADY_KNIGHT',
	DISTINGUISHED_HOUSE: 'DISTINGUISHED_HOUSE',
	ADVOCATE: 'ADVOCATE',
	GOODY_BASKET: 'GOODY_BASKET',
	WATCHFUL_EYE: 'WATCHFUL_EYE',
	ANIMAL_FRIEND: 'ANIMAL_FRIEND',
	RIVALRY: 'RIVALRY',
	INFIRMARY_MASTER: 'INFIRMARY_MASTER',
	CREST_SCHOLAR: 'CREST_SCHOLAR',
	FIGHTING_SPIRIT: 'FIGHTING_SPIRIT',
	COMPASSION: 'COMPASSION',
	GUARDIAN: 'GUARDIAN',
	LILYS_POISE: 'LILYS_POISE',
	VETERAN_KNIGHT: 'VETERAN_KNIGHT',
	SURVIVAL_INSTINCT: 'SURVIVAL_INSTINCT'
};
export const COMBAT_SKILLS_TO_FEATURES: { [s: string]: SkillFeatures } = {
	MYRMIDON_MASTER: {
		label: 'Myrmidon Master',
		description: '+1 AC',
		acBonus: 1
	},
	SOLDIER_MASTER: {
		label: 'Soldier Master',
		description: '+1 protection',
		protectionBonus: 1
	},
	FIGHTER_MASTER: {
		label: 'Fighter Master',
		description: '+1 crit range if the weapon does not have an innate crit chance'
	},
	RANGER_MASTER: {
		label: 'Ranger Master',
		description: '+1 to attack when shooting from cover',
		queries: [
			{
				prompt: 'ranged attack from cover?',
				compatibleWeapons: MARTIAL_WEAPON_TYPES,
				options: [
					{
						label: 'No'
					},
					{
						label: 'Yes',
						attackBonus: [1],
						description: '+1 attack'
					}
				]
			}
		]
	},
	MONK_MASTER: {
		label: 'Monk Master',
		description: '+1 resilience',
		resilienceBonus: 1
	},

	MERCENARY_THIEF_SKILL: {
		label: 'Swift',
		description: '+1 AC',
		acBonus: 1
	},
	VANTAGE: {
		label: 'Vantage',
		description: 'If foe initiates combat, and if HP is ≤ 50%, unit still attacks first'
	},
	ANIMAL_WHISPERER: {
		label: 'Animal Whisperer',
		description: 'You and adjacent allies may roll saves from being dismounted with advantage'
	},
	BULLSEYE: {
		label: 'Bullseye',
		description: '+4 to hit',
		attackBonus: {
			ANY: [4]
		}
	},
	DEATH_BLOW: {
		label: 'Death Blow',
		description: '+2 damage when initiating an attack on already damaged targets',
		queries: [
			{
				prompt: 'is target damaged?',
				compatibleWeapons: [
					WEAPON_TYPE.SWORD,
					WEAPON_TYPE.AXE,
					WEAPON_TYPE.LANCE,
					WEAPON_TYPE.FISTS,
					WEAPON_TYPE.BOW
				],
				options: [
					{
						label: 'No'
					},
					{
						label: 'Yes',
						damageBonus: [2],
						description: '+2 damage'
					}
				]
			}
		]
	},
	ARMORED_COMBAT: {
		label: 'Armored Combat',
		description: '+1 protection when initiating combat',
		queries: [
			{
				prompt: 'are you initiating combat?',
				compatibleWeapons: [
					WEAPON_TYPE.SWORD,
					WEAPON_TYPE.AXE,
					WEAPON_TYPE.LANCE,
					WEAPON_TYPE.FISTS,
					WEAPON_TYPE.BOW
				],
				options: [
					{
						label: 'No'
					},
					{
						label: 'Yes',
						protectionBonus: 1,
						description: '+1 protection'
					}
				]
			}
		]
	},
	GRAPPLER: {
		label: 'Grappler',
		description:
			'Gain the Reposition, Pull back, and Shove combat arts. These do not take up combat art slots'
	},

	FIENDISH_BLOW: {
		label: 'Fiendish Blow',
		description: '+2 damage when attacking an undamaged unit',
		queries: [
			{
				prompt: 'is target at full hp?',
				compatibleWeapons: [WEAPON_TYPE.REASON, WEAPON_TYPE.FAITH],
				options: [
					{
						label: 'No'
					},
					{
						label: 'Yes',
						damageBonus: [2],
						description: '+2 damage'
					}
				]
			}
		]
	},
	HEAL_PLUS: {
		label: 'Heal Plus',
		description:
			'Doubles number of usages of Heal and increases the HP healed by 1d2. Does not stack with Priest class',
		bonusCharges: {
			[WEAPONS.HEAL]: 8
		},
		attackBonus: {
			[WEAPONS.HEAL]: [Dice.d2]
		}
	},
	[COMBAT_SKILLS.SWORD_PROWESS_1]: {
		label: 'Sword Prowess 1',
		description: '+1 attack, +1 AC when wielding a sword',
		attackBonus: {
			[WEAPON_TYPE.SWORD]: [1]
		},
		acBonus: 1,
		acBonusCompatibility: [WEAPON_TYPE.SWORD]
	},
	[COMBAT_SKILLS.SWORD_PROWESS_2]: {
		label: 'Sword Prowess 2',
		description: '+1 attack, +2 AC when wielding a sword',
		attackBonus: {
			[WEAPON_TYPE.SWORD]: [1]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.SWORD]
	},
	[COMBAT_SKILLS.SWORD_PROWESS_3]: {
		label: 'Sword Prowess 3',
		description: '+2 attack, +2 AC when wielding a sword',
		attackBonus: {
			[WEAPON_TYPE.SWORD]: [2]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.SWORD]
	},
	[COMBAT_SKILLS.SWORD_PROWESS_4]: {
		label: 'Sword Prowess 4',
		description: '+2 attack, +3 AC when wielding a sword',
		attackBonus: {
			[WEAPON_TYPE.SWORD]: [2]
		},
		acBonus: 3,
		acBonusCompatibility: [WEAPON_TYPE.SWORD]
	},
	[COMBAT_SKILLS.SWORD_PROWESS_5]: {
		label: 'Sword Prowess 5',
		description: '+2 attack, +4 AC when wielding a sword',
		attackBonus: {
			[WEAPON_TYPE.SWORD]: [2]
		},
		acBonus: 4,
		acBonusCompatibility: [WEAPON_TYPE.SWORD]
	},
	[COMBAT_SKILLS.AXE_PROWESS_1]: {
		label: 'Axe Prowess 1',
		description: '+1 attack, +1 AC when wielding an axe',
		attackBonus: {
			[WEAPON_TYPE.AXE]: [1]
		},
		acBonus: 1,
		acBonusCompatibility: [WEAPON_TYPE.AXE]
	},
	[COMBAT_SKILLS.AXE_PROWESS_2]: {
		label: 'Axe Prowess 2',
		description: '+1 attack, +2 AC when wielding an axe',
		attackBonus: {
			[WEAPON_TYPE.AXE]: [1]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.AXE]
	},
	[COMBAT_SKILLS.AXE_PROWESS_3]: {
		label: 'Axe Prowess 3',
		description: '+2 attack, +2 AC when wielding an axe',
		attackBonus: {
			[WEAPON_TYPE.AXE]: [2]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.AXE]
	},
	[COMBAT_SKILLS.AXE_PROWESS_4]: {
		label: 'Axe Prowess 4',
		description: '+2 attack, +3 AC when wielding an axe',
		attackBonus: {
			[WEAPON_TYPE.AXE]: [2]
		},
		acBonus: 3,
		acBonusCompatibility: [WEAPON_TYPE.AXE]
	},
	[COMBAT_SKILLS.AXE_PROWESS_5]: {
		label: 'Axe Prowess 5',
		description: '+2 attack, +4 AC when wielding an axe',
		attackBonus: {
			[WEAPON_TYPE.AXE]: [2]
		},
		acBonus: 4,
		acBonusCompatibility: [WEAPON_TYPE.AXE]
	},
	[COMBAT_SKILLS.LANCE_PROWESS_1]: {
		label: 'Lance Prowess 1',
		description: '+1 attack, +1 AC when wielding a lance',
		attackBonus: {
			[WEAPON_TYPE.LANCE]: [1]
		},
		acBonus: 1,
		acBonusCompatibility: [WEAPON_TYPE.LANCE]
	},
	[COMBAT_SKILLS.LANCE_PROWESS_2]: {
		label: 'Lance Prowess 2',
		description: '+1 attack, +2 AC when wielding a lance',
		attackBonus: {
			[WEAPON_TYPE.LANCE]: [1]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.LANCE]
	},
	[COMBAT_SKILLS.LANCE_PROWESS_3]: {
		label: 'Lance Prowess 3',
		description: '+2 attack, +2 AC when wielding a lance',
		attackBonus: {
			[WEAPON_TYPE.LANCE]: [2]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.LANCE]
	},
	[COMBAT_SKILLS.LANCE_PROWESS_4]: {
		label: 'Lance Prowess 4',
		description: '+2 attack, +3 AC when wielding a lance',
		attackBonus: {
			[WEAPON_TYPE.LANCE]: [2]
		},
		acBonus: 3,
		acBonusCompatibility: [WEAPON_TYPE.LANCE]
	},
	[COMBAT_SKILLS.LANCE_PROWESS_5]: {
		label: 'Lance Prowess 5',
		description: '+2 attack, +4 AC when wielding a lance',
		attackBonus: {
			[WEAPON_TYPE.LANCE]: [2]
		},
		acBonus: 4,
		acBonusCompatibility: [WEAPON_TYPE.LANCE]
	},
	[COMBAT_SKILLS.BOW_PROWESS_1]: {
		label: 'Bow Prowess 1',
		description: '+1 attack, +1 AC when wielding a bow',
		attackBonus: {
			[WEAPON_TYPE.BOW]: [1]
		},
		acBonus: 1,
		acBonusCompatibility: [WEAPON_TYPE.BOW]
	},
	[COMBAT_SKILLS.CLOSE_COUNTER]: {
		label: 'Close Counter',
		description: 'Enables unit to retaliate against adjacent attackers'
	},
	[COMBAT_SKILLS.BOW_PROWESS_2]: {
		label: 'Bow Prowess 2',
		description: '+1 attack, +2 AC when wielding a bow',
		attackBonus: {
			[WEAPON_TYPE.BOW]: [1]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.BOW]
	},
	[COMBAT_SKILLS.BOW_PROWESS_3]: {
		label: 'Bow Prowess 3',
		description: '+2 attack, +2 AC when wielding a bow',
		attackBonus: {
			[WEAPON_TYPE.BOW]: [2]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.BOW]
	},
	[COMBAT_SKILLS.BOW_PROWESS_4]: {
		label: 'Bow Prowess 4',
		description: '+2 attack, +3 AC when wielding a bow',
		attackBonus: {
			[WEAPON_TYPE.BOW]: [2]
		},
		acBonus: 3,
		acBonusCompatibility: [WEAPON_TYPE.BOW]
	},
	[COMBAT_SKILLS.BOW_PROWESS_5]: {
		label: 'Bow Prowess 5',
		description: '+2 attack, +4 AC when wielding a bow',
		attackBonus: {
			[WEAPON_TYPE.BOW]: [2]
		},
		acBonus: 4,
		acBonusCompatibility: [WEAPON_TYPE.BOW]
	},
	[COMBAT_SKILLS.FISTS_PROWESS_1]: {
		label: 'Fists Prowess 1',
		description: '+1 attack, +1 AC when wielding fist weapons',
		attackBonus: {
			[WEAPON_TYPE.FISTS]: [1]
		},
		acBonus: 1,
		acBonusCompatibility: [WEAPON_TYPE.FISTS]
	},
	[COMBAT_SKILLS.FISTS_PROWESS_2]: {
		label: 'Fists Prowess 2',
		description: '+1 attack, +2 AC when wielding fist weapons',
		attackBonus: {
			[WEAPON_TYPE.FISTS]: [1]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.FISTS]
	},
	[COMBAT_SKILLS.FISTS_PROWESS_3]: {
		label: 'Fists Prowess 3',
		description: '+2 attack, +2 AC when wielding fist weapons',
		attackBonus: {
			[WEAPON_TYPE.FISTS]: [2]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.FISTS]
	},
	[COMBAT_SKILLS.FISTS_PROWESS_4]: {
		label: 'Fists Prowess 4',
		description: '+2 attack, +3 AC when wielding fist weapons',
		attackBonus: {
			[WEAPON_TYPE.FISTS]: [2]
		},
		acBonus: 3,
		acBonusCompatibility: [WEAPON_TYPE.FISTS]
	},
	[COMBAT_SKILLS.FISTS_PROWESS_5]: {
		label: 'Fists Prowess 5',
		description: '+2 attack, +4 AC when wielding fist weapons',
		attackBonus: {
			[WEAPON_TYPE.FISTS]: [2]
		},
		acBonus: 4,
		acBonusCompatibility: [WEAPON_TYPE.FISTS]
	},
	[COMBAT_SKILLS.REASON_PROWESS_1]: {
		label: 'Reason Prowess 1',
		description: '+1 attack, +1 AC when attacking with reason magic',
		attackBonus: {
			[WEAPON_TYPE.REASON]: [1]
		},
		acBonus: 1,
		acBonusCompatibility: [WEAPON_TYPE.REASON]
	},
	[COMBAT_SKILLS.REASON_PROWESS_2]: {
		label: 'Reason Prowess 2',
		description: '+1 attack, +2 AC when attacking with reason magic',
		attackBonus: {
			[WEAPON_TYPE.REASON]: [1]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.REASON]
	},
	[COMBAT_SKILLS.REASON_PROWESS_3]: {
		label: 'Reason Prowess 3',
		description: '+2 attack, +2 AC when attacking with reason magic',
		attackBonus: {
			[WEAPON_TYPE.REASON]: [2]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.REASON]
	},
	[COMBAT_SKILLS.REASON_PROWESS_4]: {
		label: 'Reason Prowess 4',
		description: '+2 attack, +3 AC when attacking with reason magic',
		attackBonus: {
			[WEAPON_TYPE.REASON]: [2]
		},
		acBonus: 3,
		acBonusCompatibility: [WEAPON_TYPE.REASON]
	},
	[COMBAT_SKILLS.REASON_PROWESS_5]: {
		label: 'Reason Prowess 5',
		description: '+2 attack, +4 AC when attacking with reason magic',
		attackBonus: {
			[WEAPON_TYPE.REASON]: [2]
		},
		acBonus: 4,
		acBonusCompatibility: [WEAPON_TYPE.REASON]
	},
	[COMBAT_SKILLS.FAITH_PROWESS_1]: {
		label: 'Faith Prowess 1',
		description: '+1 attack, +1 AC when attacking with faith magic',
		attackBonus: {
			[WEAPON_TYPE.FAITH]: [1]
		},
		acBonus: 1,
		acBonusCompatibility: [WEAPON_TYPE.REASON]
	},
	[COMBAT_SKILLS.FAITH_PROWESS_2]: {
		label: 'Faith Prowess 2',
		description: '+1 attack, +2 AC when attacking with faith magic',
		attackBonus: {
			[WEAPON_TYPE.FAITH]: [1]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.REASON]
	},
	[COMBAT_SKILLS.FAITH_PROWESS_3]: {
		label: 'Faith Prowess 3',
		description: '+2 attack, +2 AC when attacking with faith magic',
		attackBonus: {
			[WEAPON_TYPE.FAITH]: [2]
		},
		acBonus: 2,
		acBonusCompatibility: [WEAPON_TYPE.REASON]
	},
	[COMBAT_SKILLS.FAITH_PROWESS_4]: {
		label: 'Faith Prowess 4',
		description: '+2 attack, +3 AC when attacking with faith magic',
		attackBonus: {
			[WEAPON_TYPE.FAITH]: [2]
		},
		acBonus: 3,
		acBonusCompatibility: [WEAPON_TYPE.REASON]
	},
	[COMBAT_SKILLS.FAITH_PROWESS_5]: {
		label: 'Faith Prowess 5',
		description: '+2 attack, +4 AC when attacking with faith magic',
		attackBonus: {
			[WEAPON_TYPE.FAITH]: [2]
		},
		acBonus: 4,
		acBonusCompatibility: [WEAPON_TYPE.REASON]
	},
	[COMBAT_SKILLS.LEADERSHIP_PROWESS_1]: {
		label: 'Leadership Prowess 1',
		description: '+1 damage on gambits',
		damageBonus: {
			[WEAPON_TYPE.LEADERSHIP]: [1]
		}
	},
	[COMBAT_SKILLS.LEADERSHIP_PROWESS_2]: {
		label: 'Leadership Prowess 2',
		description: '+1 attack, +1 damage on gambits',
		attackBonus: {
			[WEAPON_TYPE.LEADERSHIP]: [1]
		},
		damageBonus: {
			[WEAPON_TYPE.LEADERSHIP]: [1]
		}
	},
	[COMBAT_SKILLS.LEADERSHIP_PROWESS_3]: {
		label: 'Leadership Prowess 3',
		description: '+2 attack, +1 damage on gambits',
		attackBonus: {
			[WEAPON_TYPE.LEADERSHIP]: [2]
		},
		damageBonus: {
			[WEAPON_TYPE.LEADERSHIP]: [1]
		}
	},
	[COMBAT_SKILLS.LEADERSHIP_PROWESS_4]: {
		label: 'Leadership Prowess 4',
		description: '+2 attack, +2 damage on gambits',
		attackBonus: {
			[WEAPON_TYPE.LEADERSHIP]: [2]
		},
		damageBonus: {
			[WEAPON_TYPE.LEADERSHIP]: [2]
		}
	},
	[COMBAT_SKILLS.LEADERSHIP_PROWESS_5]: {
		label: 'Leadership Prowess 5',
		description: '+3 attack, +2 damage on gambits',
		attackBonus: {
			[WEAPON_TYPE.LEADERSHIP]: [3]
		},
		damageBonus: {
			[WEAPON_TYPE.LEADERSHIP]: [2]
		}
	},
	[COMBAT_SKILLS.WEIGHT_MINUS_3]: {
		label: 'Heavy Lifter',
		description: '+2 attack speed',
		followUpBonus: 2
	},
	[COMBAT_SKILLS.AGILE_RIDER]: {
		label: 'Agile Rider',
		description: '+1 to attack, +1 AC while mounted',
		acBonus: 1,
		attackBonus: {
			ANY: [1]
		}
	},
	// BORN_FIGHTER: 'BORN_FIGHTER',
	// CATNAP: 'CATNAP',
	// HUNTERS_BOON: 'HUNTERS_BOON',
	// LIVE_TO_SERVE: 'LIVE_TO_SERVE',
	// STAUNCH_SHIELD: 'STAUNCH_SHIELD',
	// LONE_WOLF: 'LONE_WOLF',
	// PERSEVERANCE: 'PERSEVERANCE',
	// PHILANDER: 'PHILANDER',
	// LADY_KNIGHT: 'LADY_KNIGHT',
	// DISTINGUISHED_HOUSE: 'DISTINGUISHED_HOUSE',
	// ADVOCATE: 'ADVOCATE',
	// GOODY_BASKET: 'GOODY_BASKET',
	// WATCHFUL_EYE: 'WATCHFUL_EYE',
	// ANIMAL_FRIEND: 'ANIMAL_FRIEND',
	// RIVALRY: 'RIVALRY',
	// INFIRMARY_MASTER: 'INFIRMARY_MASTER',
	// CREST_SCHOLAR: 'CREST_SCHOLAR',
	// FIGHTING_SPIRIT: 'FIGHTING_SPIRIT',
	// COMPASSION: 'COMPASSION',
	// GUARDIAN: 'GUARDIAN',
	// LILYS_POISE: 'LILYS_POISE',
	// VETERAN_KNIGHT: 'VETERAN_KNIGHT',
	// SURVIVAL_INSTINCT: 'SURVIVAL_INSTINCT'
	[COMBAT_SKILLS.OFFICERS_DUTY]: {
		label: "Officer's Duty",
		description: '+1d2 damage on Gambits'
	},
	[COMBAT_SKILLS.SONGSTRESS]: {
		label: 'Songstress',
		description: 'Adjacent allies recover up to 10% of max HP at the start of each turn.'
	},
	[COMBAT_SKILLS.CONFIDENCE]: {
		label: 'Confidence',
		description: 'Grants +3 to Hit and +3 AC when unit is at full HP.'
	},
	[COMBAT_SKILLS.PERSECUTION_COMPLEX]: {
		label: 'Persecution Complex',
		description: 'Grants +1d2 damage when unit is not at full HP.'
	},
	[COMBAT_SKILLS.BORN_FIGHTER]: {
		label: 'Born Fighter',
		description: 'Adjacent foes suffer -2 AC during combat.'
	},
	[COMBAT_SKILLS.CATNAP]: {
		label: 'Catnap',
		description: 'If unit takes no action except Wait, recovers up to 10% of max HP.'
	},
	[COMBAT_SKILLS.HUNTERS_BOON]: {
		label: "Hunter's Boon",
		description: "Grants Crit +4 when foe's HP is ≤ 50%."
	},
	[COMBAT_SKILLS.LIVE_TO_SERVE]: {
		label: 'Live to Serve',
		description: 'When healing an ally with white magic, unit recovers the same amount of HP.'
	},
	[COMBAT_SKILLS.STAUNCH_SHIELD]: {
		label: 'Staunch Shield',
		description: 'If unit takes no action except Wait, grants Protection +1 until your next turn.'
	},
	[COMBAT_SKILLS.LONE_WOLF]: {
		label: 'Lone Wolf',
		description:
			'Unit deals 1d2 extra damage when no battalion is assigned or when battalion endurance is 0.'
	},
	[COMBAT_SKILLS.PERSEVERANCE]: {
		label: 'Perseverance',
		description: 'Use Rally to grant +1 damage to an ally until your next turn.'
	},
	[COMBAT_SKILLS.PHILANDER]: {
		label: 'Philander',
		description: 'If a female ally is adjacent, unit deals 1 extra damage'
	},
	[COMBAT_SKILLS.LADY_KNIGHT]: {
		label: 'Lady Knight',
		description: 'Grants +1 damage and Hit +5 with gambits.'
	},
	[COMBAT_SKILLS.DISTINGUISHED_HOUSE]: {
		label: 'Distinguished House',
		description: 'Unit deals 1 extra damage while in formation with a battalion.'
	},
	[COMBAT_SKILLS.ADVOCATE]: {
		label: 'Advocate',
		description: 'Adjacent male allies deal 1 extra damage during combat.'
	},
	[COMBAT_SKILLS.GOODY_BASKET]: {
		label: 'Goody Basket',
		description: 'Chance to recover up to 10% of max HP at the start of each turn. DC 18'
	},
	[COMBAT_SKILLS.WATCHFUL_EYE]: {
		label: 'Watchful Eye',
		description: 'Grants Hit +20.'
	},
	[COMBAT_SKILLS.ANIMAL_FRIEND]: {
		label: 'Animal Friend',
		description:
			'	Unit recovers up to 20% of max HP at the start of each turn when adjacent to a cavalry or flying ally.'
	},
	[COMBAT_SKILLS.RIVALRY]: {
		label: 'Rivalry',
		description: 'If a male ally is adjacent, unit deals 1 extra damage'
	},
	[COMBAT_SKILLS.INFIRMARY_MASTER]: {
		label: 'Infirmary Master',
		description: 'Adjacent allies gain Crit Avo +10 during combat.'
	},
	[COMBAT_SKILLS.CREST_SCHOLAR]: {
		label: 'Crest Scholar',
		description:
			'Use Rally to grant 1d2 damage to an ally until your next turn (only applies to magic attacks)'
	},
	[COMBAT_SKILLS.FIGHTING_SPIRIT]: {
		label: 'Fighting Spirit',
		description:
			'Unit gains +1 Protection when no battalion is assigned or when battalion endurance is 0.'
	},
	[COMBAT_SKILLS.COMPASSION]: {
		label: 'Compassion',
		description: 'Use Rally to grant +1 Crit Range to an ally.'
	},
	[COMBAT_SKILLS.GUARDIAN]: {
		label: 'Guardian',
		description: 'Adjacent female allies deal 1d2 extra damage during combat'
	},
	[COMBAT_SKILLS.LILYS_POISE]: {
		label: "Lily's Poise",
		description: 'Adjacent allies gain +1 Protection during combat.'
	},
	[COMBAT_SKILLS.VETERAN_KNIGHT]: {
		label: 'Veteran Knight',
		description: 'Unit gains +1 Protection while in formation with a battalion.'
	},
	[COMBAT_SKILLS.SURVIVAL_INSTINCT]: {
		label: 'Survival Instinct',
		description:
			'If unit initiates combat and defeats foe, grants +1 damage, +1 AC, +1 AS, +5 to hit'
	}
};
