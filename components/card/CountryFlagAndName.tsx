import { findCountryByCode } from '@/utils/countries';
import EmojiFlag from '../form/Flag';

function CountryFlagAndName({ countryCode }: { countryCode: string }) {
	const valideCountry = findCountryByCode(countryCode)!;
	console.log(valideCountry);

	const countryName =
		valideCountry.name.length > 20
			? `${valideCountry.name.substring(0, 20)}...`
			: valideCountry.name;
	return (
		<span className="flex justify-between items-center gap-2 text-sm">
			{valideCountry.flag} {countryName}
		</span>
	);
}

export default CountryFlagAndName;
