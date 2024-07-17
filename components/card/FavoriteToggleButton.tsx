import { FaHeart } from 'react-icons/fa'
import { Button } from '../ui/button'
import { auth } from '@clerk/nextjs/server'
import { CardSignInButton } from '../form/Buttons'
import { fetchFavouriteId } from '@/utils/actions'
import FavoriteToggleForm from './FavoriteToggleForm'

async function FavoriteToggleButton({propertyId}: {propertyId: string}) {
    const { userId } = auth()
    if(!userId) return <CardSignInButton />
    const favouriteId = await fetchFavouriteId({propertyId})
    return (
        <FavoriteToggleForm favoriteId={favouriteId} propertyId={propertyId}/>
    )
}

export default FavoriteToggleButton