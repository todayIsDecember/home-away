import {
	fetchRentalDetails,
	updatePropertyImageAction,
	updatePropertyAction,
} from '@/utils/actions';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import PriceInput from '@/components/form/PriceInput';
import TextareaInput from '@/components/form/TextareaInput';
import CountriesInput from '@/components/form/CountriesInput';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';
import { SubmitButton } from '@/components/form/Buttons';
import { redirect } from 'next/navigation';
import { type Amenity } from '@/utils/amenities';
import ImageInputContainer from '@/components/form/ImageInputContainer';

async function EditRentalPage({ params }: { params: { id: string } }) {
	const property = await fetchRentalDetails(params.id);
	if (!property) redirect('/');
	const defaultAmenities: Amenity[] = JSON.parse(property.amenities);
	return (
		<section>
			<h1 className="text-2xl capitalize mb-8 font-semibold">Edit Property</h1>
			<div className="p-8 border rounded-md">
				<ImageInputContainer
					image={property.image[0]}
					name={property.name}
					action={updatePropertyImageAction}
					text="Update Image"
				>
					<input type="hidden" name="id" value={property.id} />
				</ImageInputContainer>
				<FormContainer action={updatePropertyAction}>
					<input type="hidden" name="id" value={property.id} />
					<div className="grid md:grid-cols-2 gap-8 mb-4 mt-8">
						<FormInput
							name="name"
							type="text"
							label="name (20 Limit)"
							defaultValue={property.name}
						/>
						<FormInput
							name="tagline"
							type="text"
							label="tagline (30 Limit)"
							defaultValue={property.tagline}
						/>
						<PriceInput defaultValue={property.price} />
						{/* <CategoriesInput defaultValue={property.category} name='category'/> */}
						<CountriesInput defaultValue={property.country} />
					</div>
					<TextareaInput
						name="description"
						labelText="Description (10 - 100 Words)"
						defaultValue={property.description}
					/>
					<h3 className="text-lg mt-8 mb-4 font-medium">
						Accommodation Details
					</h3>
					{/* <CounterInput detail="guests" defaultValue={property.guests} />
					<CounterInput detail="bedrooms" defaultValue={property.bedrooms} />
					<CounterInput detail="beds" defaultValue={property.beds} />
					<CounterInput detail="baths" defaultValue={property.baths} /> */}
					<AmenitiesInput defaultValue={defaultAmenities} />
					<SubmitButton text="edit property" className="mt-12" />
				</FormContainer>
			</div>
		</section>
	);
}

export default EditRentalPage;
