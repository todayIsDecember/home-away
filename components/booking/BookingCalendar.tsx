'use client';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { DateRange } from 'react-day-picker';
import { useProperty } from '@/utils/store';

import {
	generateDisabledDates,
	generateDateRange,
	defaultSelected,
	generateBlockedPeriods,
} from '@/utils/calendar';

function BookingCalendar() {
	const currentRange = new Date();
	const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
	const bookings = useProperty((state) => state.bookings);
	const blockedPeriods = generateBlockedPeriods({
		bookings,
		today: currentRange,
	});
	const { toast } = useToast();
	const unavailableDates = generateDisabledDates(blockedPeriods);

	useEffect(() => {
		const selecredRange = generateDateRange(range);
		const isDisableDateInclude = selecredRange.some((date) => {
			if (unavailableDates[date]) {
				setRange(defaultSelected);
				toast({
					description: 'Some dates are booked. Please select again.',
				});
				return true;
			}

			return false;
		});
		useProperty.setState({ range });
	}, [range]);

	return (
		<Calendar
			mode="range"
			defaultMonth={currentRange}
			selected={range}
			onSelect={setRange}
			className="mb-4"
			disabled={blockedPeriods}
		/>
	);
}

export default BookingCalendar;
