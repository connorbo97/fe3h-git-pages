import { COMBAT_SKILLS, CLASS, CrestType } from './constants';
import { Dice } from './constants/dice';

export * from './rollUtils';
export * from './textUtils';

export const setEquality = (as: Set<any>, bs: Set<any>) => {
	if (as.size !== bs.size) return false;
	for (var a of as) if (!bs.has(a)) return false;
	return true;
};

export const getModifierByPlayerStat = (stat: number) => {
	if (stat === undefined) {
		return 0;
	}
	return Math.floor((stat - 10) / 2);
};

export const getCrestStrength = (bool: any) => (bool ? CrestType.MAJOR : CrestType.MINOR);

export const checkHealPlus = (equippedClass: string, equippedCombatSkills: Array<string>) =>
	equippedCombatSkills.includes(COMBAT_SKILLS.HEAL_PLUS) || equippedClass === CLASS.PRIEST;

// download utils

export const download = (content: any, fileName: any, contentType: any) => {
	var a = document.createElement('a');
	var file = new Blob([content], { type: contentType });
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
};

export const onExportSheet = (fullSheet: CharacterSheet, prefix = '') => {
	try {
		download(JSON.stringify(fullSheet), `${prefix}${fullSheet.playerName}-fe3h.json`, 'text/plain');
	} catch (err) {
		alert('Failed to export sheet, see console');
		console.error(err);
	}
};

export const copyToClipboard = (text: any) => {
	navigator.clipboard.writeText(text);
};

export const sleep = (ts = 1000) => {
	return new Promise((res) => {
		setTimeout(() => res(true), ts);
	});
};
