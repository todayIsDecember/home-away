import { Input } from '../ui/input';
import { Label } from '../ui/label';

function ImageInput({className}: {className?: string}) {
	const name = 'image';
	return (
		<div className="mb-2">
			<Label htmlFor={name} className="capitalize">
				Зображення
			</Label>
			<Input
				id={name}
				name={name}
				type="file"
				required
				accept="image/*"
				className={`max-w-xs ${className}`}
				multiple
			/>
		</div>
	);
}

export default ImageInput;
