// STATS
export const PLAYER_STAT = {
	STR: 'pc_strength',
	DEX: 'pc_dexterity',
	CON: 'pc_constitution',
	INT: 'pc_intelligence',
	WIS: 'pc_wisdom',
	CHA: 'pc_charisma'
};

export const PLAYER_STAT_TO_LABEL = {
	[PLAYER_STAT.STR]: 'Strength',
	[PLAYER_STAT.DEX]: 'Dexterity',
	[PLAYER_STAT.CON]: 'Constitution',
	[PLAYER_STAT.INT]: 'Intelligence',
	[PLAYER_STAT.WIS]: 'Wisdom',
	[PLAYER_STAT.CHA]: 'Charisma'
};
export const PLAYER_STAT_TO_SHORT_LABEL = {
	[PLAYER_STAT.STR]: 'Str',
	[PLAYER_STAT.DEX]: 'Dex',
	[PLAYER_STAT.CON]: 'Con',
	[PLAYER_STAT.INT]: 'Int',
	[PLAYER_STAT.WIS]: 'Wis',
	[PLAYER_STAT.CHA]: 'Cha',
	// added b/c of XP rolling riding
	ANIMAL_HANDLING: 'AnHan'
};
