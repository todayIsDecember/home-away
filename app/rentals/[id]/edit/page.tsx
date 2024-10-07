import {
	fetchRentalDetails,
	updatePropertyImageAction,
	updatePropertyAction,
	deletePropertyImageAction,
} from '@/utils/actions';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import PriceInput from '@/components/form/PriceInput';
import TextareaInput from '@/components/form/TextareaInput';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';
import { SubmitButton } from '@/components/form/Buttons';
import { redirect } from 'next/navigation';
import { type Amenity } from '@/utils/amenities';
import {
	DeleteImageContainer,
	ImageInputContainer,
} from '@/components/form/ImageInputContainer';
import AditionInput from '@/components/form/AditionInput';
import { locations } from '@/utils/locations';
import { pets } from '@/utils/pets';
import { categories } from '@/utils/categories';

async function EditRentalPage({ params }: { params: { id: string } }) {
	const property = await fetchRentalDetails(params.id);
	if (!property) redirect('/');
	const defaultAmenities: Amenity[] = property.amenities as unknown as Amenity[];
	return (
		<section>
			<h1 className="text-2xl capitalize mb-8 font-semibold">Edit Property</h1>
			<div className="p-8 border rounded-md">
				<DeleteImageContainer
					image={property.image}
					name={property.name}
					action={deletePropertyImageAction}
					text="Update Image"
				>
					<input type="hidden" name="id" value={property.id} />
				</DeleteImageContainer>
				<ImageInputContainer
					image={''}
					name={property.name}
					action={updatePropertyImageAction}
					text="Загрузити Зображення"
				>
					<input type="hidden" name="id" value={property.id} />
				</ImageInputContainer>
				<FormContainer action={updatePropertyAction}>
					<input type="hidden" name="id" value={property.id} />
					<div className="grid md:grid-cols-2 gap-8 mb-4 mt-8">
						<FormInput
							name="name"
							type="text"
							label="Назва ( ліміт 20 )"
							defaultValue={property.name}
						/>
						<FormInput
							name="tagline"
							type="text"
							label="Слоган ( ліміт 30 )"
							defaultValue={property.tagline}
						/>
						<PriceInput defaultValue={property.price} />
						<FormInput
							name="address"
							type="text"
							label="Адреса"
							defaultValue={property.address}
						/>
					</div>
					<div className="grid md:grid-cols-3 gap-8 mb-4 mt-8">
						<AditionInput
							name="location"
							defaultValue={property.location}
							aditionArray={locations}
						/>
						<AditionInput
							name="pets"
							defaultValue={property.pets}
							aditionArray={pets}
						/>
						<AditionInput
							name="category"
							defaultValue={property.category}
							aditionArray={categories}
						/>
					</div>
					<TextareaInput
						name="description"
						labelText="Опис (10 - 1000 слів)"
						defaultValue={property.description}
					/>
					<h3 className="text-lg mt-8 mb-4 font-medium">Деталі проживання</h3>
					<CounterInput
						detail="guests"
						name="гостей"
						defaultValue={property.guests}
					/>
					<CounterInput
						detail="bedrooms"
						name="спальних кімнат"
						defaultValue={property.bedrooms}
					/>
					<CounterInput
						detail="beds"
						name="спальних місць"
						defaultValue={property.beds}
					/>
					<CounterInput
						detail="baths"
						name="ванних кімнат"
						defaultValue={property.baths}
					/>
					<AmenitiesInput defaultValue={defaultAmenities} />
					<SubmitButton text="edit property" className="mt-12" />
				</FormContainer>
			</div>
		</section>
	);
}

export default EditRentalPage;
