'use server';

import {
	createReviewSchema,
	ImageSchema,
	ProfileSchema,
	propertySchema,
	validateFieldsWithZodSchema,
} from './schemas';
import db from './db';
import { auth, currentUser, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { deleteImageFromStorage, uploadImage } from './supabase';
import { calculateTotal } from './calculateTotal';
import { error } from 'console';
import { formatDate } from './format';
import { getRelativePaths } from './constructPath';

const getAuthUser = async () => {
	const user = await currentUser();
	if (!user) throw new Error('Please login to get access to this page');
	if (!user.privateMetadata.hasProfile) redirect('/profile/create');
	return user;
};

const getAdminUser = async () => {
	const user = await getAuthUser();
	if (user.id !== process.env.ADMIN_ID) redirect('/');

	return user;
};

const renderError = (error: unknown): { message: string } => {
	console.log(error);
	return {
		message: error instanceof Error ? error.message : 'An error occurred',
	};
};

export const createUserAction = async (
	initialState: any,
	formdata: FormData
) => {
	try {
		const user = await currentUser();
		if (!user) throw new Error('Please login to create a profile');
		const rawData = Object.fromEntries(formdata);
		const validatedFields = validateFieldsWithZodSchema(ProfileSchema, rawData);
		await db.profile.create({
			data: {
				clerkId: user.id,
				email: user.emailAddresses[0].emailAddress,
				profileImage: user.imageUrl ?? '',
				...validatedFields,
			},
		});
		await clerkClient.users.updateUserMetadata(user.id, {
			privateMetadata: {
				hasProfile: true,
			},
		});
	} catch (error) {
		console.log(error);
		return renderError(error);
	}
	redirect('/');
};

export const fetchProfileImage = async () => {
	const user = await currentUser();
	if (!user) return null;
	const image = await db.profile.findUnique({
		where: {
			clerkId: user.id,
		},
		select: {
			profileImage: true,
		},
	});
	return image?.profileImage;
};

export const fetchProfile = async () => {
	const user = await getAuthUser();
	const profile = await db.profile.findUnique({
		where: {
			clerkId: user.id,
		},
	});
	if (!profile) redirect('/profile/create');
	return profile;
};

export const updateProileAction = async (
	prevState: any,
	formdata: FormData
): Promise<{ message: string }> => {
	const user = await getAuthUser();
	try {
		const rawData = Object.fromEntries(formdata);
		const validatedFields = validateFieldsWithZodSchema(ProfileSchema, rawData);

		await db.profile.update({
			where: {
				clerkId: user.id,
			},
			data: validatedFields,
		});
		revalidatePath('/profile');
		return { message: 'Профіль Успішно Оновлено' };
	} catch (error) {
		return renderError(error);
	}
};

export const updateProfileImageActions = async (
	prevState: any,
	formdata: FormData
): Promise<{ message: string }> => {
	const user = await getAuthUser();
	try {
		const image = formdata.get('image') as File;
		const validatedFields = validateFieldsWithZodSchema(ImageSchema, { image });
		const fullPath = await uploadImage(validatedFields.image);
		await db.profile.update({
			where: {
				clerkId: user.id,
			},
			data: {
				profileImage: fullPath,
			},
		});
		revalidatePath('/profile');
		return { message: 'Зображення Успішно Загружено' };
	} catch (error) {
		return renderError(error);
	}
};

export const createPropertyAction = async (
	initialState: any,
	formdata: FormData
) => {
	const user = await getAuthUser();

	try {
		const rawData = Object.fromEntries(formdata);

		const files = formdata.getAll('image') as File[];
		const validatedFields = validateFieldsWithZodSchema(
			propertySchema,
			rawData
		);
		const images: string[] = await Promise.all(
			files.map(async (file) => {
				const validateFile = validateFieldsWithZodSchema(ImageSchema, {
					image: file,
				});
				return await uploadImage(validateFile.image);
			})
		);
		await db.property.create({
			data: {
				...validatedFields,
				image: images,
				profileId: user.id,
			},
		});
	} catch (error) {
		return renderError(error);
	}
	redirect('/');
};

export const fetchProperties = async ({
	search = '',
	category,
}: {
	search?: string;
	category?: string;
}) => {
	const properties = await db.property.findMany({
		where: {
			category,
			OR: [
				{ name: { contains: search, mode: 'insensitive' } },
				{ tagline: { contains: search, mode: 'insensitive' } },
			],
		},
		select: {
			id: true,
			name: true,
			tagline: true,
			price: true,
			country: true,
			image: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return properties;
};

export const fetchFavouriteId = async ({
	propertyId,
}: {
	propertyId: string;
}) => {
	const user = await getAuthUser();
	const favourite = await db.favorite.findFirst({
		where: {
			profileId: user.id,
			propertyId: propertyId,
		},
		select: {
			id: true,
		},
	});
	return favourite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
	propertyId: string;
	favoriteId: string | null;
	pathname: string;
}) => {
	const user = await getAuthUser();
	const { propertyId, favoriteId, pathname } = prevState;
	try {
		if (favoriteId) {
			await db.favorite.delete({
				where: {
					id: favoriteId,
				},
			});
		} else {
			await db.favorite.create({
				data: {
					propertyId,
					profileId: user.id,
				},
			});
		}
		revalidatePath(pathname);
		return {
			message: favoriteId ? 'видалено з улюблених' : 'добавлено до Улюблених',
		};
	} catch (error) {
		return renderError(error);
	}
};

export const fetchFavourites = async () => {
	const user = await getAuthUser();
	const favourites = await db.favorite.findMany({
		where: {
			profileId: user.id,
		},
		select: {
			property: {
				select: {
					id: true,
					name: true,
					tagline: true,
					price: true,
					country: true,
					image: true,
				},
			},
		},
	});
	return favourites.map((favorite) => favorite.property);
};

export const fetchPropertyDetails = async (id: string) => {
	return db.property.findUnique({
		where: {
			id,
		},
		include: {
			profile: true,
			bookings: {
				select: {
					checkIn: true,
					checkOut: true,
				},
			},
		},
	});
};

export const createReviewAction = async (
	prevState: any,
	formdata: FormData
) => {
	const user = await getAuthUser();
	try {
		const rawData = Object.fromEntries(formdata);
		const validatedFileds = validateFieldsWithZodSchema(
			createReviewSchema,
			rawData
		);
		await db.review.create({
			data: {
				...validatedFileds,
				profileId: user.id,
			},
		});
		revalidatePath(`/properties/${validatedFileds.propertyId}`);
		return { message: 'Дякуюємо за відгук' };
	} catch (error) {
		return renderError(error);
	}
};

export const fetchPropertyReviews = async (propertyId: string) => {
	const reviews = await db.review.findMany({
		where: {
			propertyId,
		},
		select: {
			id: true,
			comment: true,
			rating: true,
			profile: {
				select: {
					firstName: true,
					profileImage: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return reviews;
};

export const fetchPropertyReviewsByUser = async () => {
	const user = await getAuthUser();
	const reviews = await db.review.findMany({
		where: {
			profileId: user.id,
		},
		select: {
			id: true,
			rating: true,
			comment: true,
			property: {
				select: {
					name: true,
					image: true,
				},
			},
		},
	});
	return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
	const { reviewId } = prevState;
	const user = await getAuthUser();

	try {
		await db.review.delete({
			where: {
				id: reviewId,
				profileId: user.id,
			},
		});

		revalidatePath('/reviews');
		return { message: 'відгук успішно видалено' };
	} catch (error) {
		return renderError(error);
	}
};

export const fetchPropertyRating = async (propertyId: string) => {
	const result = await db.review.groupBy({
		by: ['propertyId'],
		_avg: {
			rating: true,
		},
		_count: {
			rating: true,
		},
		where: {
			propertyId,
		},
	});
	return {
		raiting: result[0]?._avg?.rating?.toFixed(0) || 0,
		count: result[0]?._count?.rating || 0,
	};
};

export const findExistingReview = async (
	userId: string,
	propertyId: string
) => {
	return db.review.findFirst({
		where: {
			profileId: userId,
			propertyId,
		},
	});
};

export const createBookingAction = async (prevState: {
	propertyId: string;
	checkIn: Date;
	checkOut: Date;
}) => {
	const user = await getAuthUser();
	await db.booking.deleteMany({
		where: {
			profileId: user.id,
			paymentStatus: false,
		},
	});
	let bookingId: null | string = null;
	const { propertyId, checkIn, checkOut } = prevState;
	const property = await db.property.findUnique({
		where: { id: propertyId },
		select: { price: true },
	});
	if (!property) return { message: 'Property not found' };
	const { totalNights, orderTotal } = calculateTotal({
		checkIn,
		checkOut,
		price: property.price,
	});
	try {
		const booking = await db.booking.create({
			data: {
				checkIn,
				checkOut,
				totalNights,
				orderTotal,
				profileId: user.id,
				propertyId,
			},
		});
		bookingId = booking.id;
	} catch (error) {
		return renderError(error);
	}
	redirect(`/checkout?bookingId=${bookingId}`);
};

export const fetchBookings = async () => {
	const user = await getAuthUser();
	const bookings = await db.booking.findMany({
		where: {
			profileId: user.id,
			paymentStatus: true,
		},
		include: {
			property: {
				select: {
					id: true,
					name: true,
					country: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return bookings;
};

export async function deleteBookingAction(prevState: { bookingId: string }) {
	const { bookingId } = prevState;
	const user = await getAuthUser();

	try {
		const result = await db.booking.delete({
			where: {
				id: bookingId,
				profileId: user.id,
			},
		});

		revalidatePath('/bookings');
		return { message: 'Booking deleted successfully' };
	} catch (error) {
		return renderError(error);
	}
}

export const deleteRentalAction = async (prevState: { propertyId: string }) => {
	const { propertyId } = prevState;
	const user = await getAuthUser();
	try {
		const result = await db.property.delete({
			where: {
				id: propertyId,
				profileId: user.id,
			},
		});
		revalidatePath('/rentals');
		return { message: 'Видалення успішне' };
	} catch (error) {
		return renderError(error);
	}
};

export const fetchRentals = async () => {
	const user = await getAuthUser();
	const rentals = await db.property.findMany({
		where: {
			profileId: user.id,
		},
		select: {
			id: true,
			name: true,
			price: true,
		},
	});

	const rentalsWithBookingSums = await Promise.all(
		rentals.map(async (rental) => {
			const totalNightSum = await db.booking.aggregate({
				where: {
					propertyId: rental.id,
					paymentStatus: true,
				},
				_sum: {
					totalNights: true,
				},
			});
			const orderTotalSum = await db.booking.aggregate({
				where: {
					propertyId: rental.id,
					paymentStatus: true,
				},
				_sum: {
					orderTotal: true,
				},
			});
			return {
				...rental,
				totalNight: totalNightSum._sum.totalNights,
				orderTotal: orderTotalSum._sum.orderTotal,
			};
		})
	);
	return rentalsWithBookingSums;
};

export const fetchRentalDetails = async (propertyId: string) => {
	const user = await getAuthUser();
	return db.property.findUnique({
		where: {
			id: propertyId,
			profileId: user.id,
		},
	});
};

export const updatePropertyAction = async (
	prevState: any,
	formdata: FormData
): Promise<{ message: string }> => {
	const user = await getAuthUser();
	const propertyId = formdata.get('id') as string;
	try {
		const rawData = Object.fromEntries(formdata);
		const validatedFields = validateFieldsWithZodSchema(
			propertySchema,
			rawData
		);
		await db.property.update({
			where: {
				id: propertyId,
				profileId: user.id,
			},
			data: {
				...validatedFields,
			},
		});
		revalidatePath(`/rentals/${propertyId}/edit`);
		return {
			message: 'Оновлення Успішне',
		};
	} catch (error) {
		return renderError(error);
	}
};

export const updatePropertyImageAction = async (
	prevState: any,
	formdata: FormData
): Promise<{ message: string }> => {
	const user = await getAuthUser();
	const propertyId = formdata.get('id') as string;
	try {
		const files = formdata.getAll('image') as File[];
		const images: string[] = await Promise.all(
			files.map(async (file) => {
				const validateFile = validateFieldsWithZodSchema(ImageSchema, {
					image: file,
				});
				return await uploadImage(validateFile.image);
			})
		);
		const presentImages = await db.property.findUnique({
			where: {
				id: propertyId,
				profileId: user.id,
			},
			select: {
				image: true,
			},
		});
		const newImages = presentImages?.image.concat(images);
		await db.property.update({
			where: {
				id: propertyId,
				profileId: user.id,
			},
			data: {
				image: newImages,
			},
		});
		revalidatePath(`/rentals/${propertyId}/edit`);
		return {
			message: 'Зображення Загрузились Успішно',
		};
	} catch (error) {
		return renderError(error);
	}
};

export const deletePropertyImageAction = async (
	prevState: any,
	formdata: FormData
): Promise<{ message: string }> => {
	const selectedImage = formdata.get('image') as string;
	const propertyId = formdata.get('id') as string;

	const user = await getAuthUser();
	try {
		const propertyImages = await db.property.findUnique({
			where: {
				id: propertyId,
				profileId: user.id,
			},
			select: {
				image: true,
			},
		});

		const constructNewArrayImages =
			propertyImages?.image?.filter((image) => image !== selectedImage) || [];
		const path = getRelativePaths(selectedImage);

		await deleteImageFromStorage(path);
		console.log(path);

		await db.property.update({
			where: {
				id: propertyId,
				profileId: user.id,
			},
			data: {
				image: constructNewArrayImages,
			},
		});

		revalidatePath(`/rentals/${propertyId}/edit`);

		return {
			message: `видалено`,
		};
	} catch (error) {
		return renderError(error);
	}
};

export const fetchReservations = async () => {
	const user = await getAuthUser();
	const reservations = await db.booking.findMany({
		where: {
			paymentStatus: true,
			property: {
				profileId: user.id,
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			property: {
				select: {
					id: true,
					name: true,
					price: true,
					country: true,
				},
			},
		},
	});
	return reservations;
};

export const fetchStats = async () => {
	await getAdminUser();

	const userCount = await db.profile.count();
	const propertyCount = await db.property.count();
	const bookingsCount = await db.booking.count({
		where: {
			paymentStatus: true,
		},
	});

	return {
		userCount,
		propertyCount,
		bookingsCount,
	};
};

export const fetchChartsData = async () => {
	await getAdminUser();
	const date = new Date();
	date.setMonth(date.getMonth() - 6);
	const sixMonthsAgo = date;

	const bookings = await db.booking.findMany({
		where: {
			paymentStatus: true,
			createdAt: {
				gte: sixMonthsAgo,
			},
		},
		orderBy: {
			createdAt: 'asc',
		},
	});
	let bookingsPerMonth = bookings.reduce(
		(total, current) => {
			const date = formatDate(current.createdAt, true);

			const existingEntry = total.find((entry) => entry.date === date);
			if (existingEntry) {
				existingEntry.count += 1;
			} else {
				total.push({ date, count: 1 });
			}
			return total;
		},
		[] as Array<{ date: string; count: number }>
	);
	return bookingsPerMonth;
};

export const fetchReservationStats = async () => {
	const user = await getAuthUser();

	const properties = await db.property.count({
		where: {
			profileId: user.id,
		},
	});

	const total = await db.booking.aggregate({
		_sum: {
			orderTotal: true,
			totalNights: true,
		},
		where: {
			profileId: user.id,
		},
	});
	return {
		properties,
		nights: total._sum.totalNights || 0,
		amount: total._sum.orderTotal || 0,
	};
};

export const getLocation = async (address: string) => {
	const response = await fetch(
		`https://nominatim.openstreetmap.org/search?q=${address}&format=json`
	);
	return response.json();
};
