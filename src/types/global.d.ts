import type diceBoxEs from '@3d-dice/dice-box';
import type { CrestTrigger, PickOnePromptType } from 'src/constants';
import type { Dice } from 'src/constants/dice';

declare global {
	interface Window {
		diceBox: diceBoxEs;
		diceBoxContainer: any;
	}
	type XPBlock = {
		total: number;
		level: string;
		mastered: boolean;
	};
	type XPMap = { [s: string]: XPBlock };
	type PlayerCrest = {
		type: string;
		isMajor: boolean;
	};
	type CharacterSheet = {
		playerStats: any;
		playerName: any;
		playerSkills: any;
		skillBonuses: any;
		unlockedClasses: any;
		customWeapons: any;
		customCombatArts: any;
		customCombatSkills: any;
		classXP: XPMap;
		weaponXP: XPMap;
		crest: PlayerCrest;

		equippedClass: string;
		equippedWeapons: Array<any>;
		equippedCombatSkills: Array<any>;
		equippedCombatArts: Array<any>;
	};

	type AllWeapons = {
		customSet: Set<string>;
		equippedClassSet: Set<string>;
		classUnlockSet: Set<string>;
		fullSet: Set<string>;
		fullArray: Array<string>;
		fullFeatures: { [s: string]: WeaponFeatures };
		weaponsToType: { [s: string]: string };
		weaponsToLabel: { [s: string]: string };
	};
	type AllCombatSkills = {
		customSet: Set<string>;
		equippedClassSet: Set<string>;
		classUnlockSet: Set<string>;
		weaponXPLevelSkillSet: Set<string>;
		fullSet: Set<string>;
		fullArray: Array<string>;
		fullFeatures: { [s: string]: SkillFeatures };
	};
	type AllCombatArts = {
		customSet: Set<string>;
		equippedClassSet: Set<string>;
		classUnlockSet: Set<string>;
		fullSet: Set<string>;
		fullArray: Array<string>;
		fullFeatures: { [s: string]: ArtFeatures };
	};
	//crests
	type CrestFeatures = {
		label: string;
		description: string;
		damageBonus?: Array<CalcEntry>;
		image: any;
		activationDC: { [s in CrestType]: number };
		triggersOn: Array<CrestTrigger>;

		damageBonus?: Array<CalcEntry>;
		combatArtDamageMultiplier?: number;
		hpRecoveryPercent?: number;
		conservesResource?: boolean;
	};

	//types
	type CalcEntry = '-' | number | Dice;
	declare type BasicStat = {
		[s: string]: number | Array<any> | undefined;
	};

	declare type XPLevelFeatures = {
		unlocks?: StatBlock;
		removes?: StatBlock;
	};
	declare type WeaponLevelFeatures = {
		[s: string]: XPLevelFeatures;
	};
	declare type ClassFeatures = {
		label: string;
		canUseMagic?: boolean;
		unlocks: StatBlock;
		whenEquipped: StatBlock;
		whenMastered: StatBlock;
	};

	declare type ClassToFeatures = { [s: string]: ClassFeatures };

	declare type StatBlock = {
		playerStats?: BasicStat;
		playerSkills?: { [s: string]: number };
		combatArts?: BasicStat;
		weapons?: BasicStat;

		xpMods?: BasicStat;
		xpMooch?: { [s: string]: number };

		combatSkills?: BasicStat;

		// comes from unlock classes
		pickOne?: Array<PickOnePrompt>;

		hpBonus?: number;
		msBonus?: number;
		bonusRange?: { [s: string]: number };
		followUpBonus?: number;
		protectionBonus?: number;
		resilienceBonus?: number;
	};

	type Query = {
		prompt: string;
		compatibleWeapons: Array<string>;
		options: Array<QueryOption>;
		key?: string;
	};
	type QueryOption = {
		label: string;
		description?: string;
		acBonus?: number;
		attackBonus?: Array<CalcEntry>;
		damageBonus?: Array<CalcEntry>;
		protectionBonus?: number;
		critBonus?: number;
	};

	interface SkillFeatures {
		label: string;
		description: string;
		acBonus?: number;
		acBonusCompatibility?: Array<string>;
		msBonus?: number;
		hpBonus?: number;
		bonusRange?: { [s: string]: number };
		damageBonus?: { [s: string]: Array<CalcEntry> };
		attackBonus?: { [s: string]: Array<CalcEntry> };
		followUpBonus?: number;
		protectionBonus?: number;
		resilienceBonus?: number;
		bonusCharges?: { [s: string]: number };
		queries?: Array<Query>;
		reason?: string;
	}
	interface ArtFeatures {
		label: string;
		description: string;
		compatibleWeapons?: Array<string>;
		damageBonus?: Array<CalcEntry>;
		attackNote?: string;
		attackBonus?: Array<CalcEntry>;
		rangeBonus?: number;
		range?: Array<number, number>;
		critBonus?: Array<CalcEntry>;
		dieCost?: { roll: number | Dice; target: number; mod?: number };
		reason?: string;
	}
	type WeaponFeatures = {
		label: string;
		description: string;
		type: string;
		isHealing?: boolean;
		damage: Array<number | Dice>;
		damageType?: Array<string>;
		range: Array<number | string>;
		attackBonus?: number;
		followUpBonus?: number;
		acBonus?: number;
		critBonus?: number;
		uses?: number;
		reason?: string;
		dieCost?: { roll: CalcEntry; target: number; mult?: number };
	};
	type PickOnePromptOption = string | { stat: string; value: number };
	type PickOnePrompt = {
		type: PickOnePromptType;
		description?: string;
		disableRandom?: boolean;
		options: Array<PickOnePromptOption>;
	};

	// Chat Stuff
	interface BasicEntry {
		playerName: string;
		type?: string;
		rollName?: string;
		rollBonus?: number;
		roll?: string;
		rollTooltip?: string;
	}

	interface AttackEntry extends BasicEntry {
		attackName: string;
		attackRoll?: string;
		critRoll?: string;
		crestRoll?: string;
		crestName?: string;
		damageRoll?: string;
		isHealWeapon?: boolean;
	};

}
