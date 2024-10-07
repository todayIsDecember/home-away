import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
import PropertyRating from '@/components/card/PropertyRating';
import Amenities from '@/components/properties/Amenities';
import BreadCrumbs from '@/components/properties/BreadCrumbs';
import Description from '@/components/properties/Description';
import ImageContainer from '@/components/properties/ImageContainer';
import PropertyDetails from '@/components/properties/PropertyDetails';
import ShareButton from '@/components/properties/ShareButton';
import UserInfo from '@/components/properties/UserInfo';
import { pets } from '@/utils/pets';
import {
	fetchPropertyDetails,
	findExistingReview,
	getLocation,
} from '@/utils/actions';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import SubmitReviews from '@/components/reviews/SubmitReviews';
import PropertyReviews from '@/components/reviews/PropertyReviews';
import { auth } from '@clerk/nextjs/server';
import ImagesContainer from '@/components/properties/ImagesContainer';
import AditionInfo from '@/components/properties/adittionInfo';
import { locations } from '@/utils/locations';

const DynamicMap = dynamic(
	() => import('@/components/properties/PropertyMap'),
	{
		ssr: false,
		loading: () => <Skeleton className="h-[400px] w-full" />,
	}
);

const DynamicBookingWrapper = dynamic(
	() => import('@/components/booking/BookingWrapper'),
	{
		ssr: false,
		loading: () => <Skeleton className="h-[200px] w-full" />,
	}
);

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
	const property = await fetchPropertyDetails(params.id);
	if (!property) {
		redirect('/');
	}
	const { guests, bedrooms, beds, baths, address } = property;
	const details = { guests, bedrooms, beds, baths };
	const { lat, lon } = await getLocation(address).then((res) => res[0]);

	const userId = auth().userId;
	const isNotOwner = property.profile.clerkId !== userId;
	const reviewDoesNotExist =
		userId && isNotOwner && !(await findExistingReview(userId, property.id));

	return (
		<section>
			<BreadCrumbs name={property.name} />
			<header className="flex justify-between items-center mt-4">
				<h1 className="text-4xl font-bold capitalize">{property.tagline}</h1>
				<div className="flex items-center gap-x-4">
					<ShareButton propertyId={property.id} name={property.name} />
					<FavoriteToggleButton propertyId={property.id} />
				</div>
			</header>
			<ImagesContainer images={property.image} />
			<section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
				<div className="lg:col-span-8">
					<div className="flex gap-x-4 items-center">
						<h1 className="text-xl font-bold ">{property.name}</h1>
						<PropertyRating inPage propertyId={property.id} />
					</div>
					<PropertyDetails details={details} />
					<UserInfo profile={property.profile} />
					<Description description={property.description} />
					<div className="lg:col-span-8 mt-4 py-4 flex flex-col gap-4">
						<AditionInfo AditionArray={pets} value={property.pets} />
						<AditionInfo AditionArray={locations} value={property.location} />
					</div>
					<Amenities amenities={property.amenities} />
					<DynamicMap lat={lat} lng={lon} />
				</div>
				<div className="lg:col-span-4">
					<DynamicBookingWrapper
						propertyId={property.id}
						price={property.price}
						bookings={property.bookings}
					/>
				</div>
			</section>
			{reviewDoesNotExist && <SubmitReviews propertyId={property.id} />}
			<PropertyReviews propertyId={property.id} />
		</section>
	);
}

export default PropertyDetailsPage;
