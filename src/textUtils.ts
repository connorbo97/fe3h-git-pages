export const addNumberPrefix = (num, addSpace = false) =>
	`${num >= 0 ? '+' : '-'}${addSpace ? ' ' : ''}${Math.abs(num)}`;

export const getCrestStrengthText = (bool: any) => (bool ? 'Major' : 'Minor');

export const classBuilder = (...args) => {
	const newArgs = args.map((a) => {
		if (typeof a === 'object') {
			return Object.keys(a)
				.filter((key) => a[key])
				.join(' ');
		}
		return a;
	});

	return newArgs.join(' ');
};

export const getCritRangeText = (critModifier) =>
	critModifier < 0 ? "Cant' Crit" : critModifier === 0 ? '20' : `${20 - critModifier} to 20`;
