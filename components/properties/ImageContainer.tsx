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
				<h3 className="absolute z-10 capitalize sm:text-5xl text-center px-4 text-2xl text-white w-full h-[300px] md:h-[500px] backdrop-brightness-50 flex items-center justify-center">
					Dream Getaway Awaits You Here!
				</h3>
			)}
		</section>
	);
}

export default ImageContainer;
