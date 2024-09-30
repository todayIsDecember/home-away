export const formatCurrency = (amount: number | null) => {
	const value = amount || 0;
	return Intl.NumberFormat('uk-UA', {
		style: 'currency',
		currency: 'UAH',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(value);
};

export const formatDate = (date: Date, onlyMonth?: boolean) => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
	};
	if (!onlyMonth) {
		options.day = 'numeric';
	}

	return Intl.DateTimeFormat('en-US', options).format(date);
};
