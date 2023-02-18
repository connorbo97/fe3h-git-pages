import {
	CLASS_TO_FEATURES,
	COMBAT_ARTS,
	COMBAT_SKILLS,
	TRAINING_WEAPONS_SET,
	COMBAT_ARTS_TO_FEATURES,
	COMBAT_SKILLS_TO_FEATURES,
	WEAPON_TYPE,
	WEAPON_TYPES_TO_LEVEL_FEATURES,
	LEVEL_UP_ORDER,
	WEAPON_LEVEL,
	WEAPONS_TO_FEATURES
} from './constants';
import memoize from 'memoize-one';

export const calculateAllWeapons = (fullSheet: CharacterSheet, equippedClass: string) =>
	calculateAllWeaponsMemoized(
		fullSheet.unlockedClasses,
		fullSheet.customWeapons,
		fullSheet.classXP,
		fullSheet.weaponXP,
		equippedClass
	);
const calculateAllWeaponsMemoized = memoize(
	(
		unlockedClasses: Array<string>,
		customWeapons: object,
		classXP: XPMap,
		weaponXP: XPMap,
		equippedClass: string
	): AllWeapons => {
		const baseSet = Array.from(TRAINING_WEAPONS_SET);
		const customSet: Set<string> = new Set(Object.keys(customWeapons));
		const equippedClassSet: Set<string> = new Set(
			Object.keys(CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.weapons || {})
		);
		const classUnlockSet: Set<string> = new Set();

		// weapons from unlocked and mastered classes
		unlockedClasses.forEach((curClass: string) => {
			Object.keys(CLASS_TO_FEATURES[curClass]?.unlocks?.weapons || {}).forEach((w) =>
				classUnlockSet.add(w)
			);
			const masteredWeapons = CLASS_TO_FEATURES[curClass]?.whenMastered?.weapons;

			if (masteredWeapons && classXP?.[curClass]?.mastered) {
				Object.keys(masteredWeapons).forEach((w) => classUnlockSet.add(w));
			}
		});

		//remove pick one
		customSet.delete('pickOne');
		equippedClassSet.delete('pickOne');
		classUnlockSet.delete('pickOne');

		// skills from weapon XP
		const weaponXPLevelWeaponSet = Object.keys(weaponXP).reduce(
			(acc: Set<string>, weaponType: string) => {
				const { level: originalLevel } = weaponXP[weaponType] || {};
				const levelFeatures = WEAPON_TYPES_TO_LEVEL_FEATURES[weaponType];
				const level = originalLevel || WEAPON_LEVEL.E;

				if (!level) {
					return acc;
				}

				let end = Infinity;
				const levelsToCheck = LEVEL_UP_ORDER.filter((curLvl, index) => {
					if (level === curLvl) {
						end = index;
					}

					return index <= end;
				});

				levelsToCheck.forEach((curLvl) => {
					const curFeatures = levelFeatures[curLvl];

					if (curFeatures.removes?.weapons) {
						Object.keys(curFeatures.removes.weapons).forEach((skill) => acc.delete(skill));
					}

					if (curFeatures.unlocks?.weapons) {
						Object.keys(curFeatures.unlocks.weapons).forEach((skill) => acc.add(skill));
					}
				});

				return acc;
			},
			new Set()
		);

		const fullSet = new Set([
			...baseSet,
			...customSet,
			...equippedClassSet,
			...classUnlockSet,
			...weaponXPLevelWeaponSet
		]);
		const customWeaponFeatures = Object.keys(customWeapons).reduce(
			(acc: any, cur: any) => {
				acc[cur] = { ...WEAPONS_TO_FEATURES[cur], ...acc[cur] };
				return acc;
			},
			{ ...customWeapons }
		);
		const fullFeatures = { ...WEAPONS_TO_FEATURES, ...customWeaponFeatures };
		const weaponsToLabel = Object.keys(fullFeatures).reduce(
			(acc: { [s: string]: string }, key: string) => {
				acc[key] = fullFeatures[key].label;
				return acc;
			},
			{}
		);
		const weaponsToType = Object.keys(fullFeatures).reduce(
			(acc: { [s: string]: string }, key: string) => {
				acc[key] = fullFeatures[key].type;
				return acc;
			},
			{}
		);

		return {
			customSet,
			equippedClassSet,
			classUnlockSet,
			fullSet,
			fullArray: Array.from(fullSet),
			fullFeatures,
			weaponsToLabel,
			weaponsToType
		};
	}
);

export const calculateAllCombatSkills = (fullSheet: CharacterSheet, equippedClass: string, equippedCombatSkills: Array<any>, onToggleCombatSkill: Function) =>
	calculateAllCombatSkillsMemoized(
		fullSheet.unlockedClasses,
		fullSheet.customCombatSkills,
		fullSheet.classXP,
		fullSheet.weaponXP,
		equippedClass,
		equippedCombatSkills,
		onToggleCombatSkill,
	);
const calculateAllCombatSkillsMemoized = (
	unlockedClasses: Array<string>,
	customCombatSkills: object,
	classXP: XPMap,
	weaponXP: XPMap,
	equippedClass: string,
	equippedCombatSkills: Array<any>,
	onToggleCombatSkill: Function
): AllCombatSkills => {
	const customSet: Set<string> = new Set(Object.keys(customCombatSkills));
	const equippedClassSet: Set<string> = new Set(
		Object.keys(CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.combatSkills || {})
	);
	const classUnlockSet: Set<string> = new Set();

	// skills from unlocked and mastered classes
	unlockedClasses.forEach((curClass: string) => {
		Object.keys(CLASS_TO_FEATURES[curClass]?.unlocks?.combatSkills || {}).forEach((w) =>
			classUnlockSet.add(w)
		);
		const masteredSkills = CLASS_TO_FEATURES[curClass]?.whenMastered?.combatSkills;

		if (masteredSkills && classXP?.[curClass]?.mastered) {
			Object.keys(masteredSkills).forEach((w) => classUnlockSet.add(w));
		}
	});

	// skills from weapon XP
	const weaponXPLevelSkillSet = Object.keys(weaponXP).reduce(
		(acc: Set<string>, weaponType: string) => {
			const { level: originalLevel } = weaponXP[weaponType] || {};
			const levelFeatures = WEAPON_TYPES_TO_LEVEL_FEATURES[weaponType];
			const level = originalLevel || WEAPON_LEVEL.E;

			if (!level) {
				return acc;
			}

			let end = Infinity;
			const levelsToCheck = LEVEL_UP_ORDER.filter((curLvl, index) => {
				if (level === curLvl) {
					end = index;
				}

				return index <= end;
			});

			levelsToCheck.forEach((curLvl) => {
				const curFeatures = levelFeatures[curLvl];

				if (curFeatures.removes?.combatSkills) {
					Object.keys(curFeatures.removes.combatSkills).forEach((skill) => acc.delete(skill));
				}

				if (curFeatures.unlocks?.combatSkills) {
					Object.keys(curFeatures.unlocks.combatSkills).forEach((skill) => acc.add(skill));
				}
			});

			return acc;
		},
		new Set()
	);

	const fullSet = new Set([
		...customSet,
		...equippedClassSet,
		...classUnlockSet,
		...weaponXPLevelSkillSet
	]);

	// filter out any equipped skills you don't have still
	equippedCombatSkills.forEach((skill) => {
		if (!fullSet.has(skill)) {
			onToggleCombatSkill(skill);
		}
	})

	const customCombatSkillFeatures = Object.keys(customCombatSkills).reduce(
		(acc: any, cur: any) => {
			acc[cur] = { ...COMBAT_SKILLS_TO_FEATURES[cur], ...acc[cur] };
			return acc;
		},
		{ ...customCombatSkills }
	);
	return {
		customSet,
		equippedClassSet,
		classUnlockSet,
		weaponXPLevelSkillSet,
		fullSet,
		fullArray: Array.from(fullSet).sort(),
		fullFeatures: { ...COMBAT_SKILLS_TO_FEATURES, ...customCombatSkillFeatures }
	};
};

export const calculateAllCombatArts = (
	fullSheet: CharacterSheet,
	equippedClass: string,
	allCombatSkillsSet: Set<string>
) =>
	calculateAllCombatArtsMemoized(
		fullSheet.unlockedClasses,
		fullSheet.customCombatArts,
		fullSheet.classXP,
		fullSheet.weaponXP,
		equippedClass,
		allCombatSkillsSet
	);
const calculateAllCombatArtsMemoized = (
	unlockedClasses: Array<string>,
	customCombatArts: object,
	classXP: XPMap,
	weaponXP: XPMap,
	equippedClass: string,
	allCombatSkillsSet: Set<string>
): AllCombatArts => {
	const baseCombatArts = [
		// COMBAT_ARTS.TEMPEST_LANCE,
		// COMBAT_ARTS.WRATH_STRIKE,
		// COMBAT_ARTS.SMASH,
		// COMBAT_ARTS.CURVED_SHOT,
		// COMBAT_ARTS.FADING_BLOW
	];
	const customSet: Set<string> = new Set(Object.keys(customCombatArts));
	const equippedClassSet: Set<string> = new Set(
		Object.keys(CLASS_TO_FEATURES[equippedClass]?.whenEquipped?.combatArts || {})
	);
	const classUnlockSet: Set<string> = new Set();

	// combat arts from unlocked and mastered classes
	unlockedClasses.forEach((curClass: string) => {
		Object.keys(CLASS_TO_FEATURES[curClass]?.unlocks?.combatArts || {}).forEach((w) =>
			classUnlockSet.add(w)
		);
		const masteredSkills = CLASS_TO_FEATURES[curClass]?.whenMastered?.combatArts;

		if (masteredSkills && classXP?.[curClass]?.mastered) {
			Object.keys(masteredSkills).forEach((w) => classUnlockSet.add(w));
		}
	});

	// combat arts from weapon XP
	const weaponXPLevelCombatArtsSet = Object.keys(weaponXP).reduce(
		(acc: Set<string>, weaponType: string) => {
			const { level: originalLevel } = weaponXP[weaponType] || {};
			const levelFeatures = WEAPON_TYPES_TO_LEVEL_FEATURES[weaponType];
			const level = originalLevel || WEAPON_LEVEL.E;

			if (!level) {
				return acc;
			}

			let end = Infinity;
			const levelsToCheck = LEVEL_UP_ORDER.filter((curLvl, index) => {
				if (level === curLvl) {
					end = index;
				}

				return index <= end;
			});

			levelsToCheck.forEach((curLvl) => {
				const curFeatures = levelFeatures[curLvl];

				if (curFeatures.unlocks?.combatArts) {
					Object.keys(curFeatures.unlocks.combatArts).forEach((skill) => acc.add(skill));
				}
			});

			return acc;
		},
		new Set()
	);

	const fullSet = new Set([
		...baseCombatArts,
		...customSet,
		...equippedClassSet,
		...classUnlockSet,
		...weaponXPLevelCombatArtsSet,
		// if grappler, add the corresponding combat arts
		...(allCombatSkillsSet.has(COMBAT_SKILLS.GRAPPLER)
			? [COMBAT_ARTS.REPOSITION, COMBAT_ARTS.SWAP, COMBAT_ARTS.PULL_BACK, COMBAT_ARTS.SHOVE]
			: [])
	]);
	const customCombatArtFeatures = Object.keys(customCombatArts).reduce(
		(acc: any, cur: any) => {
			acc[cur] = { ...COMBAT_ARTS_TO_FEATURES[cur], ...acc[cur] };
			return acc;
		},
		{ ...customCombatArts }
	);

	const fullFeatures = { ...COMBAT_ARTS_TO_FEATURES, ...customCombatArtFeatures };

	const combatArtOrder = Object.keys(COMBAT_ARTS);
	const fullArray = Array.from(fullSet).sort((a, b) => {
		const aI = combatArtOrder.indexOf(a);
		const bI = combatArtOrder.indexOf(b);
		return aI <= bI ? -1 : 1;
	});

	return {
		customSet,
		equippedClassSet,
		classUnlockSet,
		fullSet,
		fullArray,
		fullFeatures
	};
};
