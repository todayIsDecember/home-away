import Image from 'next/image';

function ImageContainer({
	images,
	name,
}: {
	images: string[];
	name: string;
}) {
	return (
		<section
			className={`h-[300px] md:h-[500px] relative grid lg:grid-cols-5`}
		>
			{/* <Image
				src={mainImage}
				fill
				sizes="100vw"
				alt={name}
				className="object-cover rounded"
				priority
			/> */}
			
		</section>
	);
}

export default ImageContainer;
