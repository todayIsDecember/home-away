import { categories } from '@/utils/categories';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Link from 'next/link';

function CategoriesList({
	category,
	search,
}: {
	category?: string;
	search?: string;
}) {
	const searchTemp = search ? `&search=${search}` : '';
	return (
		<section>
			<ScrollArea className="py-6">
				<div className="flex gap-x-4 justify-evenly">
					{categories.map((item) => {
						const isActive = item.label === category;
						return (
							<Link
								key={item.label}
								href={`/?category=${item.label}${searchTemp}`}
							>
								<article
									className={`flex flex-col items-center text-center w-auto p-3 cursor-pointer duration-300 hover:text-primary ${isActive ? 'text-primary' : ''} hover:scale-110`}
								>
									<item.icon className="w-8 h-8" />
									<p className="capitalize text-sm mt-1">{item.name}</p>
								</article>
							</Link>
						);
					})}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</section>
	);
}

export default CategoriesList;
