import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { variants } from '@/utils/types';

function CategoriesInput({ defaultValue, name, label, variants }: { defaultValue?: string, name: 'category' | 'pets' | 'location', label: string, variants: variants[] }) {
	return (
		<div className="mb-2">
			<Label className="capitalize" htmlFor={name}>
				{label}
			</Label>
			<Select
				defaultValue={defaultValue || variants[0].label}
				name={name}
				required
			>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{variants.map((item) => {
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

export default CategoriesInput;
