import { Dice } from './constants/dice';
import { addNumberPrefix } from './textUtils';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const isDice = (d) => Object.values(Dice).includes(d);

export const getDiceFaces = (d: Dice) => parseInt(d.split('d')[1]);
export const rollDice = (n: number) => Math.floor(Math.random() * n + 1);
export const rollD20 = () => rollDice(20);

export const calcDice = (die: CalcEntry) => {
	if (typeof die === 'number') {
		return die;
	}

	const [times, faces] = die.split('d');

	return parseInt(times) * rollDice(parseInt(faces));
};
export const printCalc = (calc: Array<CalcEntry>, addPlusSign?: boolean): string => {
	const res = calc.reduce((acc: string, entry: number | string, index: number) => {
		if (entry === '-' || parseInt(entry + '') < 0) {
			acc = acc.substr(0, acc.length - 1);
		}

		return acc + (entry + '') + (index === calc.length - 1 ? '' : '+');
	}, '');

	if (res.toString()[0] !== '-' && addPlusSign) {
		return '+' + res;
	}

	return res;
};

export const checkCalcRequiresRoll = (calc: Array<CalcEntry>) =>
	calc.some((calc: any) => Object.values(Dice).includes(calc));

export const rollCalc = (calc: Dice | Array<CalcEntry>, { returnAsString = false } = {}) => {
	if (!Array.isArray(calc)) {
		return calcDice(calc);
	}

	const res = calc.map((entry) => {
		if (entry === '-') {
			return entry;
		}

		return calcDice(entry);
	});

	let multiplier = 1;
	const normalResult = res.reduce((acc: any, entry: number | string, index) => {
		let curMultiplier = multiplier;

		if (entry === '-') {
			multiplier = -1;
			return acc;
		} else {
			multiplier = 1;
		}
		const parsed = parseInt(entry + '');

		return acc + parsed * curMultiplier;
	}, 0);

	if (returnAsString) {
		return {
			value: normalResult,
			resultText: res.reduce((acc: any, entry: number | string, index) => {
				let curMultiplier = multiplier;

				if (entry === '-') {
					multiplier = -1;
					return acc;
				} else {
					multiplier = 1;
				}
				const parsed = parseInt(entry + '') * curMultiplier;

				const suffix = isDice(calc[index]) ? `(${calc[index]})` : '';
				return acc + '' + (index > 0 ? ' ' + addNumberPrefix(parsed, true) : parsed) + suffix;
			}, '')
		};
	}
	return normalResult;
};

export const simplifyCalc = (calc: Array<CalcEntry>) => {
	let subtractFlag: any = false;
	const SUBTRACT = '-';
	const accStart: { remainingDice: Array<any>; numSum: number } = {
		numSum: 0,
		remainingDice: []
	};
	const diceValues = new Set(Object.values(Dice));
	const { remainingDice, numSum } = calc.reduce((acc, calc: any) => {
		if (calc === SUBTRACT) {
			subtractFlag = true;
		} else if (diceValues.has(calc)) {
			if (subtractFlag) {
				subtractFlag = false;
				acc.remainingDice = [...acc.remainingDice, SUBTRACT, calc];
			} else {
				acc.remainingDice = [...acc.remainingDice, calc];
			}
		} else {
			if (subtractFlag) {
				subtractFlag = false;
				accStart.numSum -= calc;
			} else {
				accStart.numSum += calc;
			}
		}

		return acc;
	}, accStart);

	return [...remainingDice, numSum];
};

const getDiceBoxResult = () => document.getElementById('dice-box-result');
export const rollVisualDice = (
	dice: any = [Dice.d20],
	options: {
		disableRollOnCancel?: any;
		modifier?: Array<CalcEntry>;
		disableResultBox?: boolean;
		onRollResult?: Function;
		clearTimeout?: number;
		customResultBoxLabel?: Function;
		chatEntryOnRes?: BasicEntry;
		db?: any;
	} = {}
): Promise<{ value: number; resultArray: Array<any>; resultText: string }> => {
	const rollAudios = [
		new Audio('roll.mp3'),
		new Audio('roll-2.mp3'),
		new Audio('roll-3.mp3'),
		new Audio('roll-4.mp3')
	];
	const pauseAndResetAllRollAudios = () => {
		rollAudios.forEach((a) => {
			a.pause();
			a.currentTime = 0;
		});
	};

	return new Promise((resolve) => {
		let waitFlag = true;
		let clearTimer: any = null;
		let submitReturn: any = null;

		let rollHasFinished = false;

		let finalResolve = resolve;

		if (options?.chatEntryOnRes) {
			finalResolve = async(result: any, ...args) => {
				const db = options?.db;
				const roll = result?.value;
				const rollTooltip = result?.resultText;
				console.log(db, roll, rollTooltip);

				addEntryToChat(db, {
					...options?.chatEntryOnRes,
					roll,
					rollTooltip,
				})

				resolve(result, ...args)
			}
		}

		const sanitizedDice = dice.map((d) => {
			switch (d) {
				case Dice.d2:
					return Dice.d4;
				case Dice.d3:
					return Dice.d6;
				case Dice.d5:
					return Dice.d10;
				default:
					return d;
			}
		});

		const onClearDiceRoll = () => {
			waitFlag = false;
			window.diceBox.clear();
			window.diceBoxContainer.style.pointerEvents = 'none';
			(getDiceBoxResult()?.style || { opacity: 0 }).opacity = 0;

			if (clearTimer) {
				clearTimeout(clearTimer);
			}

			if (submitReturn) {
				submitReturn();
			} else if (!rollHasFinished && !options?.disableRollOnCancel) {
				const resultArray = dice.map((die: any) => rollCalc([die]));
				const finalCalc = [...resultArray, ...(options?.modifier || [])];
				const finalCalcResult = rollCalc([...resultArray, ...(options?.modifier || [])]);

				finalResolve({
					value: finalCalcResult,
					resultText: getDefaultLabel(finalCalc, finalCalcResult, { hideResult: true }),
					resultArray
				});
			}
		};

		const getDefaultLabel = (finalCalc, finalCalcResult, { hideResult = false } = {}) => {
			let defaultFront;

			defaultFront = finalCalc.reduce((acc, cur, i) => {
				const prefix = i === 0 ? '' : ' ';
				const val = i === 0 ? cur : addNumberPrefix(cur, true);
				// if (sanitizedDice[i] !== dice[i]) {
				// 	return acc + prefix + `${val} (${dice[i]})`;
				// 	// return acc + prefix + `${val} (Ceil(${originalResult} / 2))`;
				// } else {
				// 	return acc + prefix + val;
				// }
				return acc + prefix + `${val}${i >= dice.length ? '' : `(${dice[i]})`}`;
			}, '');

			if (hideResult) {
				return defaultFront;
			}

			return `${defaultFront} = ${finalCalcResult}`;
		};

		pauseAndResetAllRollAudios();
		const setToRoll = [0, 1, 2, 3];
		dice.forEach(() => {
			if (!setToRoll.length) {
				return;
			}
			const random = Math.floor(Math.random() * setToRoll.length);
			const [indexToPlay] = setToRoll.splice(random, 1);

			rollAudios[indexToPlay].play();
		});

		window.diceBox.roll(sanitizedDice).then((res: any) => {
			rollHasFinished = true;

			if (!waitFlag) {
				return;
			}

			let hasUnrealDice = false;

			const originalResult = res.map(({ value }: { value: any }) => value);
			const dieResult = res.map(({ value }: { value: any }, index: number) => {
				if (sanitizedDice[index] !== dice[index]) {
					hasUnrealDice = true;
					const originalFaces = getDiceFaces(dice[index]);
					// return value - originalFaces > 0 ? value - originalFaces : value;
					return Math.ceil(value / 2.0);
				}
				return value;
			});

			const finalCalc = [...dieResult, ...(options.modifier || [])];
			const finalCalcResult = rollCalc(finalCalc);

			const resultBox = getDiceBoxResult();
			if (resultBox && !options.disableResultBox) {
				resultBox.style.opacity = '1';
				resultBox.innerHTML = options?.customResultBoxLabel
					? options?.customResultBoxLabel(finalCalc, finalCalcResult, {
							sanitizedDice,
							hasUnrealDice
					  })
					: getDefaultLabel(finalCalc, finalCalcResult);
			}

			const returnValue = {
				resultArray: finalCalc,
				resultText: getDefaultLabel(finalCalc, finalCalcResult, { hideResult: true }),
				value: finalCalcResult
			};

			if (options.clearTimeout) {
				submitReturn = () => finalResolve(returnValue);
				clearTimer = setTimeout(onClearDiceRoll, options.clearTimeout);
			} else {
				finalResolve(returnValue);
			}
		});

		window.diceBoxContainer.style.pointerEvents = 'auto';
		window.diceBoxContainer.addEventListener('click', onClearDiceRoll, { once: true });
	});
};

export const getChatMonth = () => new Date().toISOString().slice(0, 8).replace(/-/g, '');
export const addEntryToChat = (db, chatObj) => {
	return addDoc(collection(db, 'lobby', 'taboola', getChatMonth()), {
		...chatObj,
		date: Timestamp.now()
	});
};
