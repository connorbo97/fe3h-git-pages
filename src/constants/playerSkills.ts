import { PLAYER_STAT } from './stats';

export const PLAYER_SKILL = {
	ACROBATICS: 'ACROBATICS',
	ANIMAL_HANDLING: 'ANIMAL_HANDLING',
	ARCANA: 'ARCANA',
	ATHLETICS: 'ATHLETICS',
	BARTERING: 'BARTERING',
	CLEANING: 'CLEANING',
	COOKING: 'COOKING',
	DECEPTION: 'DECEPTION',
	GARDENING: 'GARDENING',
	GUARD_DUTY: 'GUARD_DUTY',
	HISTORY: 'HISTORY',
	HUNTING: 'HUNTING',
	INSIGHT: 'INSIGHT',
	INTIMIDATION: 'INTIMIDATION',
	INVESTIGATION: 'INVESTIGATION',
	LOCKPICKING: 'LOCKPICKING',
	MEDICINE: 'MEDICINE',
	NATURE: 'NATURE',
	PERCEPTION: 'PERCEPTION',
	PERFORMANCE: 'PERFORMANCE',
	PERSUASION: 'PERSUASION',
	RELIGION: 'RELIGION',
	SLEIGHT_OF_HAND: 'SLEIGHT_OF_HAND',
	STEALTH: 'STEALTH',
	SURVIVAL: 'SURVIVAL'
};

export const PLAYER_SKILL_TO_FEATURES = {
	[PLAYER_SKILL.ACROBATICS]: {
		label: 'Acrobatics',
		stat: PLAYER_STAT.DEX
	},
	[PLAYER_SKILL.ANIMAL_HANDLING]: {
		label: 'Animal Handling',
		stat: PLAYER_STAT.WIS
	},
	[PLAYER_SKILL.ARCANA]: {
		label: 'Arcana',
		stat: PLAYER_STAT.INT
	},
	[PLAYER_SKILL.ATHLETICS]: {
		label: 'Athletics',
		stat: PLAYER_STAT.STR
	},
	[PLAYER_SKILL.BARTERING]: {
		label: 'Bartering',
		stat: [PLAYER_STAT.WIS, PLAYER_STAT.CHA]
	},
	[PLAYER_SKILL.CLEANING]: {
		label: 'Cleaning',
		stat: [PLAYER_STAT.CON, PLAYER_STAT.WIS]
	},
	[PLAYER_SKILL.COOKING]: {
		label: 'Cooking',
		stat: [PLAYER_STAT.INT, PLAYER_STAT.WIS]
	},
	[PLAYER_SKILL.DECEPTION]: {
		label: 'Deception',
		stat: PLAYER_STAT.CHA
	},
	[PLAYER_SKILL.GARDENING]: {
		label: 'Gardening',
		stat: [PLAYER_STAT.STR, PLAYER_STAT.CON, PLAYER_STAT.WIS]
	},
	[PLAYER_SKILL.GUARD_DUTY]: {
		label: 'Guard Duty',
		stat: [PLAYER_STAT.CON, PLAYER_STAT.WIS]
	},
	[PLAYER_SKILL.HISTORY]: {
		label: 'History',
		stat: PLAYER_STAT.INT
	},
	[PLAYER_SKILL.HUNTING]: {
		label: 'Hunting',
		stat: [PLAYER_STAT.WIS, PLAYER_STAT.DEX]
	},
	[PLAYER_SKILL.INSIGHT]: {
		label: 'Insight',
		stat: PLAYER_STAT.WIS
	},
	[PLAYER_SKILL.INTIMIDATION]: {
		label: 'Intimidation',
		stat: PLAYER_STAT.CHA
	},
	[PLAYER_SKILL.INVESTIGATION]: {
		label: 'Investigation',
		stat: PLAYER_STAT.INT
	},
	[PLAYER_SKILL.LOCKPICKING]: {
		label: 'Lockpicking',
		stat: PLAYER_STAT.DEX
	},
	[PLAYER_SKILL.MEDICINE]: {
		label: 'Medicine',
		stat: PLAYER_STAT.WIS
	},
	[PLAYER_SKILL.NATURE]: {
		label: 'Nature',
		stat: PLAYER_STAT.INT
	},
	[PLAYER_SKILL.PERCEPTION]: {
		label: 'Perception',
		stat: PLAYER_STAT.WIS
	},
	[PLAYER_SKILL.PERFORMANCE]: {
		label: 'Performance',
		stat: PLAYER_STAT.CHA
	},
	[PLAYER_SKILL.PERSUASION]: {
		label: 'Persuasion',
		stat: PLAYER_STAT.CHA
	},
	[PLAYER_SKILL.RELIGION]: {
		label: 'Religion',
		stat: PLAYER_STAT.INT
	},
	[PLAYER_SKILL.SLEIGHT_OF_HAND]: {
		label: 'Sleight of Hand',
		stat: PLAYER_STAT.DEX
	},
	[PLAYER_SKILL.STEALTH]: {
		label: 'Stealth',
		stat: PLAYER_STAT.DEX
	},
	[PLAYER_SKILL.SURVIVAL]: {
		label: 'Survival',
		stat: PLAYER_STAT.WIS
	}
};

export const PLAYER_SKILL_TO_STAT = Object.keys(PLAYER_SKILL_TO_FEATURES).reduce((acc, k) => {
	acc[k] = PLAYER_SKILL_TO_FEATURES[k].stat;
	return acc;
}, {});

export const PLAYER_SKILL_TO_LABEL = Object.keys(PLAYER_SKILL_TO_FEATURES).reduce((acc, k) => {
	acc[k] = PLAYER_SKILL_TO_FEATURES[k].label;
	return acc;
}, {});

export enum SkillProficiency {
	NONE = 0,
	PROFICIENT = 1,
	EXPERT = 2,
	AWFUL = -2
}
export const getTextFromSkillProficiency = (curVal) => {
	if (curVal === undefined || curVal === SkillProficiency.NONE) {
		return 'none';
	} else if (curVal === SkillProficiency.PROFICIENT) {
		return 'proficient';
	} else if (curVal === SkillProficiency.EXPERT) {
		return 'expert';
	} else {
		return 'awful';
	}
};
