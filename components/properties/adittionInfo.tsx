import { variants } from '@/utils/types';

type AditionInfoType = {
	AditionArray: variants[];
	value: string;
};

function AditionInfo({ AditionArray, value }: AditionInfoType) {
	const selectedAdition = AditionArray.find((item) => item.label == value);
	if (!selectedAdition) return null;
	return (
		<span className="flex items-center gap-2 capitalize">
			<selectedAdition.icon />
			{selectedAdition.name}
		</span>
	);
}

export default AditionInfo;
