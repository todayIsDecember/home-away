import * as z from 'zod';
import { ZodSchema } from 'zod';

export const ProfileSchema = z.object({
    firstName: z.string().min(2, {message: 'first name mast be at least 2 characters'}),
    lastName: z.string().min(2, {message: 'last name mast be at least 2 characters'}),
    username: z.string().min(2, {message: 'username mast be at least 2 characters'}),
})

export function validateFieldsWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data)
    if(!result.success) {
        const errors = result.error.errors.map((error) => error.message)
        throw new Error(errors.join(', '))
    }
    return result.data
}