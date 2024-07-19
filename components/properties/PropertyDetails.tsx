import { formatQuantity } from '@/utils/format';
type PropertyDetailsProps = {
    details: {
        guests: number
        bedrooms: number
        beds: number
        baths: number
    }
}

function PropertyDetails({details: {guests, bedrooms, beds, baths}}: PropertyDetailsProps) {
    return (
        <p className='text-md font-light'>
            <span>{formatQuantity(guests, 'guest')} &middot; </span>
            <span>{formatQuantity(bedrooms, 'bedroom')} &middot; </span>
            <span>{formatQuantity(beds, 'bed')} &middot; </span>
            <span>{formatQuantity(baths, 'bath')}</span>
        </p>
    )
}

export default PropertyDetails;