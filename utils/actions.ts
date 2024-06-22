'use server'

import { ProfileSchema } from "./schemas";

export const createUserAction = async (initialState: any, formdata: FormData) => {
    try {
        const rawData = Object.fromEntries(formdata);
        const validatedFields = ProfileSchema.parse(rawData);
        console.log(validatedFields);
        return {message: 'Profile Created'}
        
    } catch (error) {
        console.log(error);
        return {message: 'there was an error...'}
    }
    
}