import { addNumberPrefix, printCalc } from 'src/utils';
import { Dice } from './dice';
import { WEAPON_TYPE } from './weaponType';

export const COMBAT_ARTS = {
	WRATH_STRIKE: 'WRATH_STRIKE',
	GROUNDER: 'GROUNDER',
	HAZE_SLICE: 'HAZE_SLICE',
	SUNDER: 'SUNDER',
	BANE_OF_MONSTERS: 'BANE_OF_MONSTERS',
	WINDSWEEP: 'WINDSWEEP',

	TEMPEST_LANCE: 'TEMPEST_LANCE',
	KNIGHT_KNEELER: 'KNIGHT_KNEELER',
	SHATTER_SLASH: 'SHATTER_SLASH',
	HIT_AND_RUN: 'HIT_AND_RUN',
	MONSTER_PIERCER: 'MONSTER_PIERCER',
	SWIFT_STRIKES: 'SWIFT_STRIKES',

	SMASH: 'SMASH',
	HELM_SPLITTER: 'HELM_SPLITTER',
	FOCUSED_STRIKE: 'FOCUSED_STRIKE',
	SPIKE: 'SPIKE',
	WILD_ABANDON: 'WILD_ABANDON',
	DIAMOND_AXE: 'DIAMOND_AXE',
	MONSTER_BREAKER: 'MONSTER_BREAKER',

	CURVED_SHOT: 'CURVED_SHOT',
	DEADEYE: 'DEADEYE',
	HEAVY_DRAW: 'HEAVY_DRAW',
	WANING_SHOT: 'WANING_SHOT',
	BREAK_SHOT: 'BREAK_SHOT',
	SCHISM_SHOT: 'SCHISM_SHOT',
	MONSTER_BLAST: 'MONSTER_BLAST',
	POINT_BLANK_VOLLEY: 'POINT_BLANK_VOLLEY',
	ENCLOSER: 'ENCLOSER',
	WARD_ARROW: 'WARD_ARROW',

	FADING_BLOW: 'FADING_BLOW',
	RUSHING_BLOW: 'RUSHING_BLOW',
	DRAINING_BLOW: 'DRAINING_BLOW',
	NIMBLE_COMBO: 'NIMBLE_COMBO',
	BOMBARD: 'BOMBARD',
	ONE_TWO_PUNCH: 'ONE_TWO_PUNCH',
	MONSTER_CRUSHER: 'MONSTER_CRUSHER',
	MIGHTY_BLOW: 'MIGHTY_BLOW',

	SWAP: 'SWAP',
	SHOVE: 'SHOVE',
	REPOSITION: 'REPOSITION',
	HEALING_FOCUS: 'HEALING_FOCUS',
	PULL_BACK: 'PULL_BACK'
};

const HALF_THE_TIME_PLUS_1 = { roll: Dice.d20, target: 10, mod: 1 };
const HALF_THE_TIME_MINUS_1 = { roll: Dice.d20, target: 10, mod: -1 };
const ALWAYS_2 = { roll: 1, target: 1, mod: 1 };
export const COMBAT_ARTS_TO_FEATURES: { [s: string]: ArtFeatures } = {
	[COMBAT_ARTS.SWAP]: {
		label: 'Swap',
		description:
			'As action, switch places with an adjacent ally. Does not consume a superiority die when used.'
	},
	[COMBAT_ARTS.REPOSITION]: {
		label: 'Reposition',
		description:
			'As an action, move an adjacent ally directly across you. Does not consume a superiority die'
	},
	[COMBAT_ARTS.SHOVE]: {
		label: 'Shove',
		description:
			'As an action, push an adjacent ally 1 space away from you. Does not consume a superiority die'
	},
	[COMBAT_ARTS.PULL_BACK]: {
		label: 'Pull Back',
		description:
			'As an action, pull you and an adjacent ally 1 square back. Does not consume a superiority die.'
	},
	[COMBAT_ARTS.HEALING_FOCUS]: {
		label: 'Healing Focus',
		description:
			'As an action, regain half your HP'
	},
	// SWORDS
	[COMBAT_ARTS.WRATH_STRIKE]: {
		label: 'Wrath Strike',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.SWORD],
		damageBonus: [Dice.d2],
		attackBonus: [2],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.GROUNDER]: {
		label: 'Grounder',
		description: '2x damage against flying units',
		compatibleWeapons: [WEAPON_TYPE.SWORD],
		damageBonus: [1],
		attackBonus: [4]
	},
	[COMBAT_ARTS.BANE_OF_MONSTERS]: {
		label: 'Bane of Monsters',
		description: '2x damage against monsters',
		compatibleWeapons: [WEAPON_TYPE.SWORD],
		damageBonus: [Dice.d2],
		critBonus: [2]
	},
	[COMBAT_ARTS.HAZE_SLICE]: {
		label: 'Haze Slice',
		description: 'Add +6 to AC against retaliatory attack.',
		compatibleWeapons: [WEAPON_TYPE.SWORD],
		damageBonus: [Dice.d2, -1],
		dieCost: HALF_THE_TIME_PLUS_1
	},
	[COMBAT_ARTS.SUNDER]: {
		label: 'Sunder',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.SWORD],
		damageBonus: [1],
		critBonus: [3],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.WINDSWEEP]: {
		label: 'Windsweep',
		description: 'Enemy does not retaliate',
		compatibleWeapons: [WEAPON_TYPE.SWORD],
		damageBonus: [1],
		attackBonus: [4],
		critBonus: [2],
		dieCost: HALF_THE_TIME_PLUS_1,
	},
	// LANCES
	[COMBAT_ARTS.TEMPEST_LANCE]: {
		label: 'Tempest Lance',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.LANCE],
		damageBonus: [2],
		attackBonus: [2],
		dieCost: HALF_THE_TIME_PLUS_1
	},
	[COMBAT_ARTS.KNIGHT_KNEELER]: {
		label: 'Knightkneeler',
		description: '2x damage against cavalry units',
		compatibleWeapons: [WEAPON_TYPE.LANCE],
		damageBonus: [Dice.d2],
		attackBonus: [3]
	},
	[COMBAT_ARTS.SHATTER_SLASH]: {
		label: 'Shatter Slash',
		description: 'Damaged unit takes +1 more damage from martial attacks for 1 round',
		compatibleWeapons: [WEAPON_TYPE.LANCE],
		damageBonus: [1],
		attackBonus: [2],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.HIT_AND_RUN]: {
		label: 'Hit and Run',
		description:
			'Add +4 to AC against retaliatory attack. After combat, move 1 space backwards if possible',
		compatibleWeapons: [WEAPON_TYPE.LANCE],
		damageBonus: [1],
		attackBonus: [2]
	},
	[COMBAT_ARTS.MONSTER_PIERCER]: {
		label: 'Monster Piercer',
		description: '2x damage against monsters',
		compatibleWeapons: [WEAPON_TYPE.LANCE],
		damageBonus: [2]
	},
	[COMBAT_ARTS.SWIFT_STRIKES]: {
		label: 'Swift Strike',
		description: 'Attack twice before the enemy attacks',
		compatibleWeapons: [WEAPON_TYPE.LANCE],
		damageBonus: [1]
	},
	[COMBAT_ARTS.SMASH]: {
		label: 'Smash',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.AXE],
		damageBonus: [1],
		attackBonus: [4],
		critBonus: [4],
		dieCost: HALF_THE_TIME_PLUS_1
	},
	[COMBAT_ARTS.HELM_SPLITTER]: {
		label: 'Helm Splitter',
		description: '2x damage against armored units',
		compatibleWeapons: [WEAPON_TYPE.AXE],
		damageBonus: [2],
		critBonus: [1],
		dieCost: HALF_THE_TIME_PLUS_1
	},
	[COMBAT_ARTS.MONSTER_BREAKER]: {
		label: 'Monster Breaker',
		description: '2x damage against monsters',
		compatibleWeapons: [WEAPON_TYPE.AXE],
		attackBonus: [Dice.d2, 1],
		dieCost: HALF_THE_TIME_PLUS_1
	},
	[COMBAT_ARTS.FOCUSED_STRIKE]: {
		label: 'Focused Strike',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.AXE],
		attackBonus: [6]
	},
	[COMBAT_ARTS.SPIKE]: {
		label: 'Spike',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.AXE],
		damageBonus: [Dice.d2],
		attackBonus: [3],
		critBonus: [2],
		dieCost: HALF_THE_TIME_PLUS_1
	},
	[COMBAT_ARTS.WILD_ABANDON]: {
		label: 'Wild Abandon',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.AXE],
		damageBonus: [Dice.d3, 1],
		attackBonus: [-6],
		critBonus: [2],
		dieCost: HALF_THE_TIME_PLUS_1
	},
	[COMBAT_ARTS.DIAMOND_AXE]: {
		label: 'Diamond Axe',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.AXE],
		damageBonus: [Dice.d2, 3],
		attackBonus: [-4],
		dieCost: ALWAYS_2
	},
	[COMBAT_ARTS.CURVED_SHOT]: {
		label: 'Curved Shot',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		attackBonus: [4],
		range: [2, 3],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.DEADEYE]: {
		label: 'Deadeye',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		damageBonus: [Dice.d2],
		range: [3, 5],
		dieCost: HALF_THE_TIME_PLUS_1
	},
	[COMBAT_ARTS.HEAVY_DRAW]: {
		label: 'Heavy Draw',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		attackBonus: [Dice.d2],
		damageBonus: [2],
		range: [2],
		dieCost: HALF_THE_TIME_PLUS_1
	},
	[COMBAT_ARTS.WANING_SHOT]: {
		label: 'Waning Shot',
		description: 'Damaged units deal -1 damage on attacks for 1 round',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		damageBonus: [1],
		attackBonus: [2],
		range: [2, 3],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.MONSTER_BLAST]: {
		label: 'Monster Blast',
		description: '2x damage against monsters',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		damageBonus: [Dice.d2],
		range: [2]
	},
	[COMBAT_ARTS.BREAK_SHOT]: {
		label: 'Break Shot',
		description: 'Damaged unit takes +1 more damage from martial attacks for 1 round',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		damageBonus: [1],
		attackBonus: [1],
		range: [2, 3],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.SCHISM_SHOT]: {
		label: 'Schism Shot',
		description: 'Damaged unit takes +1 more damage from magic attacks for 1 round',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		attackBonus: [3],
		damageBonus: [1],
		range: [2, 3],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.POINT_BLANK_VOLLEY]: {
		label: 'Point Blank Volley',
		description: '2 consecutive hits; add +2 AC against retaliation',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		attackBonus: [2],
		damageBonus: [1],
		range: [1],
	},
	[COMBAT_ARTS.ENCLOSER]: {
		label: 'Encloser',
		description: 'On hit, target cannot move for 1 turn',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		attackBonus: [3],
		damageBonus: [1],
		range: [2],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.WARD_ARROW]: {
		label: 'Ward Arrow',
		description: 'On hit, target cannot use magic for 1 turn',
		compatibleWeapons: [WEAPON_TYPE.BOW],
		attackBonus: [3],
		damageBonus: [1],
		range: [2],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	
	[COMBAT_ARTS.FADING_BLOW]: {
		label: 'Fading Blow',
		description:
			'Add +6 to AC against retaliatory attack. After combat, move 1 space backwards if possible',
		compatibleWeapons: [WEAPON_TYPE.FISTS],
		attackBonus: [2],
		damageBonus: [2],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.RUSHING_BLOW]: {
		label: 'Rushing Blow',
		description:
			'Add +2 to AC against retaliatory attack. After combat, user moves 1 space in front of the enemy.',
		compatibleWeapons: [WEAPON_TYPE.FISTS],
		attackBonus: [4],
		damageBonus: [2],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.DRAINING_BLOW]: {
		label: 'Draining Blow',
		description: 'Restores HP equal to 50% of the damage inflicted to the enemy.',
		compatibleWeapons: [WEAPON_TYPE.FISTS],
		attackBonus: [4],
		damageBonus: [Dice.d2],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.NIMBLE_COMBO]: {
		label: 'Nimble Combo',
		description: 'Attack twice before retaliation attack. Add +4 to AC against retaliatory attack',
		compatibleWeapons: [WEAPON_TYPE.FISTS],
		damageBonus: [1],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.BOMBARD]: {
		label: 'Bombard',
		description: 'Attack twice before retaliation attack. Add +4 to AC against retaliatory attack',
		compatibleWeapons: [WEAPON_TYPE.FISTS],
		damageBonus: [1],
		critBonus: [2],
		dieCost: HALF_THE_TIME_MINUS_1
	},
	[COMBAT_ARTS.ONE_TWO_PUNCH]: {
		label: 'One-Two Punch',
		description: 'Guaranteed follow up attack.',
		compatibleWeapons: [WEAPON_TYPE.FISTS],
		damageBonus: [2],
		attackBonus: [4]
	},
	[COMBAT_ARTS.MONSTER_CRUSHER]: {
		label: 'Monster Crusher',
		description: '2x damage against monsters',
		compatibleWeapons: [WEAPON_TYPE.FISTS],
		attackBonus: [2],
		critBonus: [2],
		damageBonus: [Dice.d2, 2]
	},
	[COMBAT_ARTS.MIGHTY_BLOW]: {
		label: 'Mighty Blow',
		description: '',
		compatibleWeapons: [WEAPON_TYPE.FISTS],
		attackBonus: [-1],
		damageBonus: [Dice.d2, Dice.d2],
		critBonus: [4],
		dieCost: HALF_THE_TIME_MINUS_1
	}
};
export const getCombatArtsDescription = (
	feature: ArtFeatures,
	options: { disableDescription?: boolean } = {}
) => {
	const { disableDescription } = options;
	const {
		damageBonus,
		attackBonus,
		critBonus,
		rangeBonus,
		range,
		dieCost,
		compatibleWeapons,
		description
	} = feature;
	const { roll, target, mod = 0 } = dieCost || {};
	let dieCostText = '1';

	if (roll == Dice.d20) {
		dieCostText = `1 (${((target || 0) / 20) * 100}% of the time cost ${Math.abs(mod)} ${
			mod > 0 ? 'more' : 'less'
		})`;
		// dieCostText = `1 (cost ${1 + mod} ${((target || 0) / 20) * 100}% of the time)`;
	} else if (target === 1) {
		dieCostText = 1 + mod + '';
	}

	let attackBonusText = printCalc(attackBonus || []);

	if (attackBonusText[0] !== '-') {
		attackBonusText = '+' + attackBonusText;
	}

	const res = [
		attackBonus ? `Attack: ${attackBonusText}` : '',
		damageBonus ? `Damage: ${printCalc(damageBonus)}` : '',
		critBonus ? `Crit Bonus: ${printCalc(critBonus)}` : '',
		rangeBonus ? `Extra Range: ${rangeBonus}` : '',
		range ? `Range: ${range[0]}${range[1] ? '-' + range[1] : ''}` : '',
		compatibleWeapons ? `Cost: ${dieCostText}` : ''
	]
		.filter((a) => a)
		.join(', ');

	return res + (description && !disableDescription ? `. ${description}` : '');
};
