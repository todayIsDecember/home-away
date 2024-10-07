import Image from 'next/image';

function ImageContainer({
	mainImage,
	name,
	isMain,
	className,
}: {
	mainImage: string;
	name: string;
	isMain?: boolean;
	className?: string;
}) {
	return (
		<section
			className={`h-[300px] md:h-[500px] relative ${isMain ? 'mt-0 relative' : 'mt-8'} ${className}`}
		>
			<Image
				src={mainImage}
				fill
				sizes="100vw"
				alt={name}
				className="object-cover rounded object-center"
				priority
			/>
			{isMain && (
				<div
					className="absolute z-10 h-[300px] md:h-[500px] w-full background-darker
				flex items-center justify-center"
				>
				</div>
			)}
		</section>
	);
}

export default ImageContainer;
