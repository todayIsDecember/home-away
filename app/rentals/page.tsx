import { IconButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import EmptyList from '@/components/home/EmptyList';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { deleteRentalAction, fetchRentals } from '@/utils/actions';
import { formatCurrency } from '@/utils/format';
import Link from 'next/link';

async function RentalsPage() {
	const rentals = await fetchRentals();
	if (rentals.length === 0)
		return (
			<EmptyList
				header="No rentals to display."
				message="Don't hesitate to create a rental."
			/>
		);
	return (
		<div className="mt-16">
			<h4 className="capitalize mb-4">Active properties : {rentals.length}</h4>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Property Name</TableHead>
						<TableHead>Nightly Rate </TableHead>
						<TableHead>Nights Booked</TableHead>
						<TableHead>Total Income</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rentals.map((rental) => {
						const { id: propertyId, name, price } = rental;
						const { totalNight, orderTotal } = rental;
						return (
							<TableRow key={propertyId}>
								<TableCell>
									<Link
										href={`/properties/${propertyId}`}
										className="underline text-muted-foreground tracking-wide"
									>
										{name}
									</Link>
								</TableCell>
								<TableCell>{formatCurrency(price)}</TableCell>
								<TableCell>{totalNight || 0}</TableCell>
								<TableCell>{formatCurrency(orderTotal)}</TableCell>
								<TableCell className="flex items-center gap-x-2">
									<Link href={`/rentals/${rental.id}/edit`}>
										<IconButton actionType="edit" />
									</Link>
									<DeleteRental propertyId={propertyId} />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
export default RentalsPage;

function DeleteRental({ propertyId }: { propertyId: string }) {
	const deleteRental = deleteRentalAction.bind(null, { propertyId });
	return (
		<FormContainer action={deleteRental}>
			<IconButton actionType="delete" />
		</FormContainer>
	);
}
