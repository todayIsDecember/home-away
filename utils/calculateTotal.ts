import { calculateDaysBetween } from "./calendar";

type BookingDetails = {
    checkIn: Date,
    checkOut: Date,
    price: number
}

export const calculateTotal = ({checkIn, checkOut, price}: BookingDetails) => {
    const totalNights = calculateDaysBetween({checkIn, checkOut});
    const subTotal = totalNights * price;
    const tax = subTotal * 0.1;
    const orderTotal = subTotal  + tax;
    return {
        totalNights, subTotal, tax, orderTotal
    }
}