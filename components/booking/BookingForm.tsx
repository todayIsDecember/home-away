import { calculateTotal } from '@/utils/calculateTotal';
import { formatCurrency } from '@/utils/format';
import { useProperty } from '@/utils/store';
import { Card, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

function BookingForm() {
	const { range, price } = useProperty((state) => state);
	const checkIn = range?.from as Date;
	const checkOut = range?.to as Date;
	const { totalNights, subTotal, tax, orderTotal } = calculateTotal({
		checkIn,
		checkOut,
		price,
	});
	const generateNights = () => {
		switch (totalNights) {
			case 1:
				return 'ніч';
			case 2:
			case 3:
			case 4:
				return 'ночі';
			default:
				return 'ночей';
		}
	};
	return (
		<Card className="p-8 mb-4">
			<CardTitle className="mb-8">Summary</CardTitle>
			<FormRow
				label={`$${price} x ${totalNights} ${generateNights()}`}
				amount={subTotal}
			/>
			<FormRow label="Tax" amount={tax} />
			<Separator className="mt-4" />
			<CardTitle className="mt-8">
				<FormRow label="кінцева ціна" amount={orderTotal} />
			</CardTitle>
		</Card>
	);
}

const FormRow = ({ label, amount }: { label: string; amount: number }) => {
	return (
		<p className="flex justify-between text-sm mb-2">
			<span>{label}</span>
			<span>{formatCurrency(amount)}</span>
		</p>
	);
};

export default BookingForm;
