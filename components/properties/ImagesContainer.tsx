import Image from 'next/image';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

import dynamic from 'next/dynamic';

const DynamicSlider = dynamic(() => import('@/components/properties/Slider'), {
	ssr: false,
});
function ImagesContainer({ images }: { images: string[] }) {
	const imagesLayout = images.length <= 5 ? images : images.slice(0, 5);
	const imagesLength: number = imagesLayout.length;

	let imagesContainerClass: string = '';
	let childClass: string = '';

	switch (imagesLength) {
		case 1:
			imagesContainerClass = 'grid-cols-1';
			childClass = 'first:block';
			break;
		case 2:
			imagesContainerClass = 'sm:grid-cols-2';
			childClass = 'first:block sm:last:block';
			break;
		case 3:
			imagesContainerClass = 'sm:grid-cols-2';
			childClass = 'md:first:row-span-2 first:block sm:last:block md:block';
			break;
		case 4:
			imagesContainerClass = `lg:grid-cols-3 sm:grid-cols-2`;
			childClass =
				'md:first:row-span-2 first:block sm:last:block md:block md:last:hidden lg:last:block lg:last:col-span-2';
			break;
		case 5:
			imagesContainerClass = 'lg:grid-cols-3 sm:grid-cols-2';
			childClass = 'lg:first:row-span-2 first:block sm:last:block lg:block';
			break;
	}

	return (
		<section
			className={`h-[300px] md:h-[500px] grid ${imagesContainerClass} relative gap-4 mt-4`}
		>
			<Dialog>
				{imagesLayout.map((image, index) => (
					<DialogTrigger asChild>
						<div
							key={index}
							className={`relative ${childClass} hidden overflow-hidden cursor-pointer`}
						>
							<Image
								src={image}
								alt=""
								fill
								className={`object-cover rounded transform hover:scale-110 transition-transform duration-500`}
								priority
							/>
						</div>
					</DialogTrigger>
				))}
				<DialogContent>
						<DynamicSlider images={images} />
				</DialogContent>
			</Dialog>
		</section>
	);
}

export default ImagesContainer;
