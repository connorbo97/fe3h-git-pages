import blaiddydImage from 'src/images/crests/blaiddyd.png';
import cethleannImage from 'src/images/crests/cethleann.png';
import cicholImage from 'src/images/crests/cichol.png';
import charonImage from 'src/images/crests/charon.png';
import daphnelImage from 'src/images/crests/daphnel.png';
import dominicImage from 'src/images/crests/dominic.png';
import flamesImage from 'src/images/crests/flames.png';
import fraldariusImage from 'src/images/crests/fraldarius.png';
import gautierImage from 'src/images/crests/gautier.png';
import gloucesterImage from 'src/images/crests/gloucester.png';
import gonerilImage from 'src/images/crests/goneril.png';
import indechImage from 'src/images/crests/indech.png';
import lamineImage from 'src/images/crests/lamine.png';
import rieganImage from 'src/images/crests/riegan.png';
import macuilImage from 'src/images/crests/macuil.png';
import seirosImage from 'src/images/crests/seiros.png';
import theBeastImage from 'src/images/crests/the_beast.png';

export const CRESTS = {
	BLAIDDYD: 'BLAIDDYD',
	CETHLEANN: 'CETHLEANN',
	CICHOL: 'CICHOL',
	CHARON: 'CHARON',
	DAPHNEL: 'DAPHNEL',
	DOMINIC: 'DOMINIC',
	FLAMES: 'FLAMES',
	FRALDARIUS: 'FRALDARIUS',
	GAUTIER: 'GAUTIER',
	GLOUCESTER: 'GLOUCESTER',
	GONERIL: 'GONERIL',
	INDECH: 'INDECH',
	LAMINE: 'LAMINE',
	MACUIL: 'MACUIL',
	RIEGAN: 'RIEGAN',
	SEIROS: 'SEIROS',
	THE_BEAST: 'THE_BEAST'
};
export const CRESTS_TO_LABELS = {
	[CRESTS.BLAIDDYD]: 'Blaiddyd',
	[CRESTS.CETHLEANN]: 'Cethleann',
	[CRESTS.CICHOL]: 'Cichol',
	[CRESTS.CHARON]: 'Charon',
	[CRESTS.DAPHNEL]: 'Daphnel',
	[CRESTS.DOMINIC]: 'Dominic',
	[CRESTS.FLAMES]: 'Mystery Crest A',
	[CRESTS.FRALDARIUS]: 'Fraldarius',
	[CRESTS.GAUTIER]: 'Gautier',
	[CRESTS.GLOUCESTER]: 'Gloucester',
	[CRESTS.GONERIL]: 'Goneril',
	[CRESTS.INDECH]: 'Indech',
	[CRESTS.LAMINE]: 'Lamine',
	[CRESTS.MACUIL]: 'Macuil',
	[CRESTS.RIEGAN]: 'Riegan',
	[CRESTS.SEIROS]: 'Seiros',
	[CRESTS.THE_BEAST]: 'Mystery Crest B'
};

export enum CrestType {
	MAJOR = 'MAJOR',
	MINOR = 'MINOR'
}
export const ActivationRates = {
	omega: {
		[CrestType.MAJOR]: 17,
		[CrestType.MINOR]: 19
	},
	gamma: {
		[CrestType.MAJOR]: 13,
		[CrestType.MINOR]: 17
	},
	beta: {
		[CrestType.MAJOR]: 11,
		[CrestType.MINOR]: 15
	},
	alpha: {
		[CrestType.MAJOR]: 7,
		[CrestType.MINOR]: 13
	}
};
export enum CrestTrigger {
	MAGIC_ATTACK,
	COMBAT_ART,
	ATTACK,
	HEAL
}
export const CRESTS_TO_FEATURES: { [s: string]: CrestFeatures } = {
	[CRESTS.BLAIDDYD]: {
		label: 'Blaiddyd',
		description:
			'When using a combat art, conserves superiority die and adds another instance of combat art damage (if the combat art adds damage)',
		image: blaiddydImage,
		activationDC: ActivationRates.omega,
		triggersOn: [CrestTrigger.COMBAT_ART],
		conservesResource: true,
		combatArtDamageMultiplier: 2
	},
	[CRESTS.CETHLEANN]: {
		label: 'Cethleann',
		description: 'When using recovery magic, heal the target for +2 HP .',
		image: cethleannImage,
		activationDC: ActivationRates.beta,
		triggersOn: [CrestTrigger.HEAL],
		damageBonus: [2]
	},
	[CRESTS.CICHOL]: {
		label: 'Cichol',
		description: 'When using a combat art, prevent counterattack',
		image: cicholImage,
		activationDC: ActivationRates.beta,
		triggersOn: [CrestTrigger.COMBAT_ART]
	},
	[CRESTS.CHARON]: {
		label: 'Charon',
		description: 'When using a combat art, doubles any extra damage done by the combat art ',
		image: charonImage,
		activationDC: ActivationRates.alpha,
		triggersOn: [CrestTrigger.COMBAT_ART],
		combatArtDamageMultiplier: 2
	},
	[CRESTS.DAPHNEL]: {
		label: 'Daphnel',
		description: 'When using a combat art, adds +2 damage if the combat art does damage ',
		image: daphnelImage,
		activationDC: ActivationRates.alpha,
		triggersOn: [CrestTrigger.COMBAT_ART],
		damageBonus: [2]
	},
	[CRESTS.DOMINIC]: {
		label: 'Dominic',
		description: 'When attacking with a spell, conserves spell slot ',
		image: dominicImage,
		activationDC: ActivationRates.omega,
		triggersOn: [CrestTrigger.MAGIC_ATTACK],
		conservesResource: true
	},
	[CRESTS.FLAMES]: {
		label: 'Mystery Crest A',
		description:
			'Restores HP equal to 30% of damage dealt when using weapons, combat arts or attack magic. Also has a roughly 1 in 4 chance to raise Might by 5 and prevent counterattacks.',
		image: flamesImage,
		activationDC: ActivationRates.omega,
		triggersOn: [CrestTrigger.ATTACK, CrestTrigger.COMBAT_ART, CrestTrigger.MAGIC_ATTACK],
		hpRecoveryPercent: 0.3
	},
	[CRESTS.FRALDARIUS]: {
		label: 'Fraldarius',
		description: 'When attacking with a weapon, adds +2 damage to the attack ',
		image: fraldariusImage,
		activationDC: ActivationRates.gamma,
		triggersOn: [CrestTrigger.ATTACK],
		damageBonus: [2]
	},
	[CRESTS.GAUTIER]: {
		label: 'Gautier',
		description: 'When using a combat art, adds +2 damage if the combat art deals damage ',
		image: gautierImage,
		activationDC: ActivationRates.alpha,
		triggersOn: [CrestTrigger.COMBAT_ART],
		damageBonus: [2]
	},
	[CRESTS.GLOUCESTER]: {
		label: 'Gloucester',
		description: 'When attacking with a spell, adds +2 damage to the attack ',
		image: gloucesterImage,
		activationDC: ActivationRates.omega,
		triggersOn: [CrestTrigger.MAGIC_ATTACK],
		damageBonus: [2]
	},
	[CRESTS.GONERIL]: {
		label: 'Goneril',
		description: 'When using a combat art, prevents counterattack',
		image: gonerilImage,
		activationDC: ActivationRates.beta,
		triggersOn: [CrestTrigger.COMBAT_ART]
	},
	[CRESTS.INDECH]: {
		label: 'Indech',
		description:
			'When attacking with a weapon, you may attack the target again . (this follow up attack can also trigger the effect)',
		image: indechImage,
		activationDC: ActivationRates.omega,
		triggersOn: [CrestTrigger.ATTACK]
	},
	[CRESTS.LAMINE]: {
		label: 'Lamine',
		description: 'When using recovery magic, conserve the spell slot ',
		image: lamineImage,
		activationDC: ActivationRates.omega,
		triggersOn: [CrestTrigger.HEAL],
		conservesResource: true
	},
	[CRESTS.MACUIL]: {
		label: 'Macuil',
		description: 'When attacking with a spell, add +2 damage to the attack .',
		image: macuilImage,
		activationDC: ActivationRates.omega,
		triggersOn: [CrestTrigger.MAGIC_ATTACK],
		damageBonus: [2]
	},
	[CRESTS.RIEGAN]: {
		label: 'Riegan',
		description:
			'When using a combat art, heal for 30% of the damage dealt if the combat art deals damage ',
		image: rieganImage,
		activationDC: ActivationRates.beta,
		triggersOn: [CrestTrigger.COMBAT_ART],
		hpRecoveryPercent: 0.3
	},
	[CRESTS.SEIROS]: {
		label: 'Seiros',
		description:
			'When using a combat art, heal for 30% of the damage dealt if the combat art deals damage ',
		image: seirosImage,
		activationDC: ActivationRates.alpha,
		triggersOn: [CrestTrigger.COMBAT_ART],
		hpRecoveryPercent: 0.3
	},
	[CRESTS.THE_BEAST]: {
		label: 'Mystery Crest B',
		description: 'When attacking with a weapon, add +2 damage',
		activationDC: ActivationRates.gamma,
		image: theBeastImage,
		triggersOn: [CrestTrigger.COMBAT_ART],
		damageBonus: [2]
	}
};
