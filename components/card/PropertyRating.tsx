import {FaStar} from 'react-icons/fa'
import { fetchPropertyRating } from '@/utils/actions';

async function PropertyRating({propertyId, inPage}: {propertyId: string, inPage: boolean}) {
    const {raiting, count} = await fetchPropertyRating(propertyId)

    if(count === 0) return null

    const className = `flex items-center gap-1 ${inPage? 'text-md': 'text-xs'}`;

    const countText = count > 1 ? 'reviews' : 'review';

    const countValue = ` (${count}) ${inPage ? countText: ''}`

    return (
        <span className={className}>
            <FaStar className='h-3 w-3' />
            {raiting}
            {countValue}
        </span>
    )
}

export default PropertyRating