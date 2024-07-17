import {FaStar} from 'react-icons/fa'

function PropertyRating({propertyId, inPage}: {propertyId: string, inPage: boolean}) {
    const raiting = 4.7
    const count = 100

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