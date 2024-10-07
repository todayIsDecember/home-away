import { Label } from '@/components/ui/label';
import { formattedCountries } from '@/utils/countries';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import EmojiFlag from './Flag';
import { variants } from '@/utils/types';

type AditionInputType = {
	defaultValue: string;
	name: 'location' | 'pets' | 'category';
	aditionArray: variants[];
};

function AditionInput({ defaultValue, name, aditionArray }: AditionInputType) {
	const contructName = () => {
		switch (name) {
			case 'category':
				return 'категорія';
				break;
			case 'location':
				return 'локація';
				break;
			case 'pets':
				return 'Домашні улюбленці';
				break;
		}
	};
	return (
		<div className="mb-2">
			<Label htmlFor={name} className="capitalize">
				{contructName()}
			</Label>
			<Select name={name} defaultValue={defaultValue} required>
				<SelectTrigger id={name}>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{aditionArray.map((item) => {
						return (
							<SelectItem key={item.label} value={item.label}>
								<span className="flex items-center gap-2">
									<item.icon /> {item.name}
								</span>
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
}

export default AditionInput;
