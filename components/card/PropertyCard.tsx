import Image from 'next/image';
import Link from 'next/link';
import PropertyRating from './PropertyRating';
import FavoriteToggleButton from './FavoriteToggleButton';
import { PropertyCardProps } from '@/utils/types';
import { formatCurrency } from '@/utils/format';

function PropertyCard({ property }: { property: PropertyCardProps }) {
	const { name, image, price } = property;
	const { id: PropertyId, tagline } = property;

	return (
		<article className="group relative">
			<Link href={`/properties/${PropertyId}`}>
				<div className="relative h-[300px] mb-2 overflow-hidden rounded-md">
					<Image
						src={image[0]}
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						alt={name}
						className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
					/>
				</div>
				<div className="flex justify-between items-center">
					<h3 className="text-sm font-semibold mt-1">
						{name.substring(0, 30)}
					</h3>
					{/* property rating */}
					<PropertyRating inPage={false} propertyId={PropertyId} />
				</div>
				<p className="text-sm mt-1 text-muted-foreground">
					{tagline.substring(0, 40)}
				</p>
				<div className="flex justify-between items-center mt-1">
					<p className="text-sm mt-1">
						<span className="font-semibold">{formatCurrency(price)} / </span>
						ніч
					</p>
					{/* property country and flag */}
				</div>
			</Link>
			<div className="absolute top-5 right-5 z-5">
				{/* favorite toggle button */}
				<FavoriteToggleButton propertyId={PropertyId} />
			</div>
		</article>
	);
}

export default PropertyCard;
