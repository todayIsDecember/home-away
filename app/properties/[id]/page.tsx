import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import Amenities from "@/components/properties/Amenities";
import BookingCalendar from "@/components/properties/BoolingCalendar";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { fetchPropertyDetails } from "@/utils/actions";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitReviews from "@/components/reviews/SubmitReviews";
import PropertyReviews from "@/components/reviews/PropertyReviews";

const DynamicMap = dynamic(() => import('@/components/properties/PropertyMap'), {
    ssr: false,
    loading: () => <Skeleton className='h-[400px] w-full' />,
})

async function PropertyDetailsPage({params}: {params: {id: string}}) {
    const property = await fetchPropertyDetails(params.id);
    if(!property)
    {
        redirect('/');
    }
    const {guests, bedrooms, beds, baths} = property
    const details = {guests, bedrooms, beds, baths}
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
            <ImageContainer mainImage={property.image} name={property.name} />
            <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
                <div className="lg:col-span-8">
                    <div className="flex gap-x-4 items-center">
                        <h1 className="text-xl font-bold ">{property.name}</h1>
                        <PropertyRating inPage propertyId={property.id} />
                    </div>
                    <PropertyDetails details={details} />
                    <UserInfo profile={property.profile} />
                    <Description description={property.description} />
                    <Amenities amenities={property.amenities} />
                    <DynamicMap countryCode={property.country} />
                </div>
                <div className="lg:col-span-4">
                    <BookingCalendar />
                </div>
            </section>
            <SubmitReviews propertyId={property.id} />
            <PropertyReviews propertyId={property.id} />
        </section>
    )
}

export default PropertyDetailsPage;