import { Card, CardHeader } from '../ui/card';

type StatsCardProperties = {
	title: string;
	value: number | string;
};

function StatsCard({ title, value }: StatsCardProperties) {
	return (
		<Card className="bg-muted">
			<CardHeader className="flex justify-between items-center flex-row">
				<h3 className="capitalize text-3xl font-bold">{title}</h3>
				<span className="text-primary text-5xl font-extrabold">{value}</span>
			</CardHeader>
		</Card>
	);
}

export default StatsCard;
