import {
	PLAYER_SKILL_TO_LABEL,
	PLAYER_STAT_TO_SHORT_LABEL,
	COMBAT_SKILLS_TO_FEATURES,
	COMBAT_ARTS_TO_FEATURES,
	WEAPON_TYPE_TO_LABEL,
	WEAPONS_TO_FEATURES,
	PickOnePromptType
} from './constants';
import { addNumberPrefix } from './textUtils';

export const getXPMoochText = (xpMooch, options: any = {}) => {
	const { prefix = 'Extra XP from Combat:' } = options;
	return (
		prefix +
		' (' +
		Object.keys(xpMooch)
			.map((k) => {
				return (
					(WEAPON_TYPE_TO_LABEL[k] || k) +
					': +' +
					// @ts-ignore
					Math.round(xpMooch[k] * 100) +
					'% of combat XP'
				);
			})
			.join(', ') +
		')'
	);
};

export const getStatBlockDescription = (
	block: StatBlock = {},
	{ disablePickOne }: { disablePickOne?: boolean } = {}
) => {
	const {
		playerStats,
		combatSkills,
		playerSkills,
		combatArts,
		weapons,
		hpBonus,
		xpMods,
		bonusDamage,
		bonusCrit,
		xpMooch,
		protectionBonus,
		msBonus,
		bonusRange,
		followUpBonus,
		pickOne,
		resilienceBonus
	} = block;

	const finalStringArr: Array<string> = [];

	if (playerStats) {
		finalStringArr.push(
			'Min Stats (' +
				Object.entries(playerStats)
					.map(([stat, value]) => `${PLAYER_STAT_TO_SHORT_LABEL[stat]} ${value}`)
					.join(', ') +
				')'
		);
	}

	if (playerSkills) {
		finalStringArr.push(
			'Skills (' +
				Object.keys(playerSkills)
					.map((k) => PLAYER_SKILL_TO_LABEL[k])
					.join(', ') +
				')'
		);
	}

	if (combatSkills) {
		finalStringArr.push(
			'Combat Skills (' +
				Object.keys(combatSkills)
					.map((k) => COMBAT_SKILLS_TO_FEATURES[k].label)
					.join(', ') +
				')'
		);
	}

	if (combatArts) {
		finalStringArr.push(
			'Combat Arts (' +
				Object.keys(combatArts)
					.map((k) => COMBAT_ARTS_TO_FEATURES[k].label)
					.join(', ') +
				')'
		);
	}

	if (weapons) {
		finalStringArr.push(
			'Weapons (' +
				Object.keys(weapons)
					.map((k) => WEAPONS_TO_FEATURES[k].label)
					.join(', ') +
				')'
		);
	}

	if (hpBonus) {
		finalStringArr.push('HP Bonus (' + hpBonus + ')');
	}

	if (bonusRange) {
		finalStringArr.push(
			'Bonus Range by Weapon Type: (' +
				Object.keys(bonusRange)
					.map((k) => {
						return (WEAPON_TYPE_TO_LABEL[k] || k) + ': ' + bonusRange[k];
					})
					.join(', ') +
				')'
		);
	}

	if (followUpBonus) {
		finalStringArr.push('AS Modifier (' + followUpBonus + ')');
	}
	if (protectionBonus) {
		finalStringArr.push('Prt Bonus (' + protectionBonus + ')');
	}
	if (resilienceBonus) {
		finalStringArr.push('Re Bonus (' + resilienceBonus + ')');
	}
	if (msBonus) {
		finalStringArr.push('MS Bonus (' + msBonus + ')');
	}
	if (bonusDamage) {
		let str = 'Bonus damage by weapon type: (';

		const buffs = Object.keys(bonusDamage).map((key) => {
			return `${WEAPON_TYPE_TO_LABEL[key]}: ${bonusDamage[key]}`;
		})

		finalStringArr.push(str + buffs.join(', ') + ')')
	}
	if (bonusCrit) {
		let str = 'Bonus crit by weapon type: (';

		const buffs = Object.keys(bonusCrit).map((key) => {
			return `${WEAPON_TYPE_TO_LABEL[key]}: ${addNumberPrefix(bonusCrit[key])}`;
		})

		finalStringArr.push(str + buffs.join(', ') + ')')
	}

	if (xpMods) {
		finalStringArr.push(
			'XP from Combat: (' +
				Object.keys(xpMods)
					.map((k) => {
						return (WEAPON_TYPE_TO_LABEL[k] || k) + ': x' + xpMods[k];
					})
					.join(', ') +
				')'
		);
	}

	if (xpMooch) {
		finalStringArr.push(getXPMoochText(xpMooch));
	}

	if (!disablePickOne && pickOne) {
		finalStringArr.push(
			'Choose one per category: ' +
				pickOne
					.map(({ type, options }) => {
						const label = type;
						const optionsText = options
							.map((option: any) => {
								if (type === PickOnePromptType.PlayerStat) {
									return 'Min ' + PLAYER_STAT_TO_SHORT_LABEL[option.stat] + ' ' + option.value;
								} else if (type === PickOnePromptType.CombatArt) {
									return COMBAT_ARTS_TO_FEATURES[option].label;
								} else if (type === PickOnePromptType.Weapon) {
									return WEAPONS_TO_FEATURES[option].label;
								} else if (type === PickOnePromptType.CombatSkill) {
									return COMBAT_SKILLS_TO_FEATURES[option].label;
								}

								return 'unmapped';
							})
							.join(', ');

						return '([' + label + ']: ' + optionsText + ')';
					})
					.join(', ') +
				')'
		);
	}

	return finalStringArr.join(', ');
};
export const getClassDescription = (features: ClassFeatures) => {
	const { unlocks, whenEquipped = {} } = features;

	let unlocksString = '';

	if (unlocks) {
		unlocksString = 'Unlocks: ' + getStatBlockDescription(unlocks);
	}

	const whenEquippedString = '';

	if (unlocks) {
		unlocksString = 'Unlocks: ' + getStatBlockDescription(whenEquipped);
	}
	return [unlocksString, whenEquippedString].filter((a) => a).join(', ');
};

export const getLevelUpDescription = (features: XPLevelFeatures = {}, disablePickOne = false) => {
	const { unlocks } = features;

	return getStatBlockDescription(unlocks, { disablePickOne });
};
