// weapons

import { PLAYER_SKILL } from './playerSkills';
import { PLAYER_STAT } from './stats';

import SwordImg from '../images/weapons/sword-removebg-preview.png';
import LanceImg from '../images/weapons/lance-removebg-preview.png';
import AxeImg from '../images/weapons/axe-removebg-preview.png';
import BowImg from '../images/weapons/bow-removebg-preview.png';
import FistsImg from '../images/weapons/fists-removebg-preview.png';

export const WEAPON_TYPE = {
	SWORD: 'SWORD',
	LANCE: 'LANCE',
	AXE: 'AXE',
	BOW: 'BOW',
	FISTS: 'FISTS',
	HEAVY_ARMOR: 'HEAVY_ARMOR',
	RIDING: 'RIDING',
	REASON: 'REASON',
	FAITH: 'FAITH',
	LEADERSHIP: 'LEADERSHIP'
};

export const WEAPON_TYPE_TO_LABEL = {
	[WEAPON_TYPE.SWORD]: 'Sword',
	[WEAPON_TYPE.LANCE]: 'Lance',
	[WEAPON_TYPE.AXE]: 'Axe',
	[WEAPON_TYPE.BOW]: 'Bow',
	[WEAPON_TYPE.FISTS]: 'Fists',
	[WEAPON_TYPE.HEAVY_ARMOR]: 'Heavy Armor',
	[WEAPON_TYPE.RIDING]: 'Riding',
	[WEAPON_TYPE.REASON]: 'Reason',
	[WEAPON_TYPE.FAITH]: 'Faith',
	[WEAPON_TYPE.LEADERSHIP]: 'Leadership'
};

export const WEAPON_TYPE_TO_STAT = {
	[WEAPON_TYPE.SWORD]: [PLAYER_STAT.STR, PLAYER_STAT.DEX],
	[WEAPON_TYPE.LANCE]: [PLAYER_STAT.STR, PLAYER_STAT.DEX],
	[WEAPON_TYPE.AXE]: [PLAYER_STAT.STR],
	[WEAPON_TYPE.BOW]: [PLAYER_STAT.DEX],
	[WEAPON_TYPE.FISTS]: [PLAYER_STAT.STR, PLAYER_STAT.DEX],
	[WEAPON_TYPE.HEAVY_ARMOR]: [PLAYER_STAT.CON],
	[WEAPON_TYPE.RIDING]: [PLAYER_SKILL.ANIMAL_HANDLING],
	[WEAPON_TYPE.REASON]: [PLAYER_STAT.INT],
	[WEAPON_TYPE.FAITH]: [PLAYER_STAT.INT],
	[WEAPON_TYPE.LEADERSHIP]: [PLAYER_STAT.WIS, PLAYER_STAT.CHA]
};

export const MARTIAL_WEAPON_TYPES = [
	WEAPON_TYPE.SWORD,
	WEAPON_TYPE.LANCE,
	WEAPON_TYPE.AXE,
	WEAPON_TYPE.BOW,
	WEAPON_TYPE.FISTS
];
export const MAGIC_WEAPON_TYPES = [WEAPON_TYPE.REASON, WEAPON_TYPE.FAITH];

export const COMBAT_XP_OPTIONS = [...MARTIAL_WEAPON_TYPES, ...MAGIC_WEAPON_TYPES];

export const WEAPON_TYPE_TO_IMAGE = {
	[WEAPON_TYPE.SWORD]: SwordImg,
	[WEAPON_TYPE.LANCE]: LanceImg,
	[WEAPON_TYPE.AXE]: AxeImg,
	[WEAPON_TYPE.BOW]: BowImg,
	[WEAPON_TYPE.FISTS]: FistsImg,
	[WEAPON_TYPE.HEAVY_ARMOR]: null,
	[WEAPON_TYPE.RIDING]: null,
	[WEAPON_TYPE.REASON]: null,
	[WEAPON_TYPE.FAITH]: null,
	[WEAPON_TYPE.LEADERSHIP]: null
};
