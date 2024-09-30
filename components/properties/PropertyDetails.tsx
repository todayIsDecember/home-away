type PropertyDetailsProps = {
	details: {
		guests: number;
		bedrooms: number;
		beds: number;
		baths: number;
	};
};

function PropertyDetails({
	details: { guests, bedrooms, beds, baths },
}: PropertyDetailsProps) {
	return (
		<p className="text-md font-light">
			<span>{`${guests} ${guests == 1 ? 'гість' : 'гостей'}`} &middot; </span>
			<span>
				{`${bedrooms} ${bedrooms == 1 ? 'спальна кімната' : 'спальних кімнат'}`}{' '}
				&middot;{' '}
			</span>
			<span>
				{`${beds} ${beds == 1 ? 'спальне місце' : 'спальних місць'}`} &middot;{' '}
			</span>
			<span>{`${baths} ${baths == 1 ? 'ванна' : 'ванних кімнат'}`}</span>
		</p>
	);
}

export default PropertyDetails;
