import { Input } from '../ui/input';
import { Label } from '../ui/label';

type PriceInputProps = {
	defaultValue?: number;
};

function PriceInput({ defaultValue }: PriceInputProps) {
	const name = 'price';
	return (
		<div className="mb-2">
			<Label htmlFor={name} className="capitalize">
				ціна (₴)
			</Label>
			<Input
				id={name}
				name={name}
				type="number"
				min={0}
				required
				defaultValue={defaultValue || 100}
			/>
		</div>
	);
}

export default PriceInput;
