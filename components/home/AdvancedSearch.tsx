'use client';

import { useState, useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { amenities } from '@/utils/amenities';
import { Checkbox } from '../ui/checkbox';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useSearchParams, useRouter } from 'next/navigation';

function AdvancedSearch() {
	const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const [advanced, setAdvanced] = useState(searchParams.get('advanced') || '');

	const handleCheckboxChange = (amenityName: string) => {
		setSelectedAmenities((prevSelected) =>
			prevSelected.includes(amenityName)
				? prevSelected.filter((item) => item !== amenityName)
				: [...prevSelected, amenityName]
		);
	};

	const handleSave = () => {
		const params = new URLSearchParams(searchParams);

		if (selectedAmenities.length >= 1) {
			params.set('advanced', JSON.stringify(selectedAmenities));
		} else {
			params.delete('advanced');
		}
		replace(`/?${params.toString()}`);
	};

	useEffect(() => {
		if (!searchParams.get('advanced')) {
			setAdvanced('');
		}
	}, [searchParams.get('advanced')]);

	return (
		<div className="mb-8 flex justify-center">
			<Dialog>
				<DialogTrigger className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs">
					Розширений пошук
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>Розширений Пошук</DialogTitle>
					<div className="p-4 grid md:grid-cols-2">
						{amenities.map((amenity) => (
							<div className="flex items-center gap-4" key={amenity.name}>
								<Checkbox
									id={amenity.name}
									checked={selectedAmenities.includes(amenity.name)}
									onCheckedChange={() => handleCheckboxChange(amenity.name)}
								/>
								<amenity.icon />
								{amenity.name}
							</div>
						))}
					</div>
					<DialogFooter>
						<DialogClose>
							<button
								onClick={handleSave}
								className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs"
							>
								Зберегти
							</button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default AdvancedSearch;
