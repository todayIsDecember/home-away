import { Card, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function StatsLoadingContainer() {
	return (
		<div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
			<LoadingCard />
            <LoadingCard />
            <LoadingCard />
		</div>
	);
}

function LoadingCard() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-20 w-full rounded" />
			</CardHeader>
		</Card>
	);
}

export function ChartsLoadingContainer() {
    return <Skeleton  className='mt-16 w-full h-[300px] rounded' />
}
