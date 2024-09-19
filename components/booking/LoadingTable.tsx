import { Skeleton } from '../ui/skeleton';

function LoadingTable({ rows }: { rows?: number }) {
	const rowsArray = Array.from({ length: rows || 5 }, (_, i) => {
		return (
			<div className="mb-4" key={i}>
				<Skeleton className="w-full h-8 rounded" />
			</div>
		);
	});

	return (
		<div className="mt-16">
			<Skeleton className="w-[200px] h-8 rounded mb-4" />
			<Skeleton className="w-full h-8 rounded mb-4" />
			<Skeleton className="w-full h-[1px] mb-4" />
			{rowsArray}
		</div>
	);
}

export default LoadingTable;
