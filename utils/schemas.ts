import * as z from 'zod';
import { ZodSchema } from 'zod';

export const ProfileSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: 'first name mast be at least 2 characters' }),
	lastName: z
		.string()
		.min(2, { message: 'last name mast be at least 2 characters' }),
	username: z
		.string()
		.min(2, { message: 'username mast be at least 2 characters' }),
});

export const propertySchema = z.object({
	name: z
		.string()
		.min(2, {
			message: 'name must be at least 2 characters.',
		})
		.max(100, {
			message: 'name must be less than 100 characters.',
		}),
	tagline: z
		.string()
		.min(2, {
			message: 'tagline must be at least 2 characters.',
		})
		.max(100, {
			message: 'tagline must be less than 100 characters.',
		}),
	price: z.coerce.number().int().min(0, {
		message: 'price must be a positive number.',
	}),
	category: z.string(),
	description: z.string().refine(
		(description) => {
			const wordCount = description.split(' ').length;
			return wordCount >= 10 && wordCount <= 1000;
		},
		{
			message: 'description must be between 10 and 1000 words.',
		}
	),
	guests: z.coerce.number().int().min(0, {
		message: 'guest amount must be a positive number.',
	}),
	bedrooms: z.coerce.number().int().min(0, {
		message: 'bedrooms amount must be a positive number.',
	}),
	beds: z.coerce.number().int().min(0, {
		message: 'beds amount must be a positive number.',
	}),
	baths: z.coerce.number().int().min(0, {
		message: 'bahts amount must be a positive number.',
	}),
	amenities: z.string(),
	location: z.string(),
	pets: z.string(),
	address: z.string(),
});

export function validateFieldsWithZodSchema<T>(
	schema: ZodSchema<T>,
	data: unknown
): T {
	const result = schema.safeParse(data);
	if (!result.success) {
		const errors = result.error.errors.map((error) => error.message);
		throw new Error(errors.join(', '));
	}
	return result.data;
}

export const ImageSchema = z.object({
	image: validateFile(),
});

function validateFile() {
	const maxUploadSize = 1024 * 1024 * 5;
	const acceptedFileTypes = ['image/'];
	return z
		.instanceof(File)
		.refine((file) => {
			return !file || file.size <= maxUploadSize;
		}, `File size must be less than 3 MB`)
		.refine((file) => {
			return (
				!file || acceptedFileTypes.some((type) => file.type.startsWith(type))
			);
		}, 'File must be an image');
}

export const createReviewSchema = z.object({
	propertyId: z.string(),
	rating: z.coerce.number().int().min(1).max(5),
	comment: z
		.string()
		.min(10, { message: 'comment must be at least 10 characters' })
		.max(1000, { message: 'comment must be less than 1000 characters' }),
});
