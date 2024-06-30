'use server'

import { ProfileSchema, validateFieldsWithZodSchema } from "./schemas";
import db from './db'
import { auth, currentUser, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";

const getAuthUser = async () => {
    const user = await currentUser();
    if(!user) throw new Error('Please login to get access to this page');
    if(!user.privateMetadata.hasProfile) redirect('/profile/create');
    return user;
}

const renderError = (error: unknown): { message: string } => {
    console.log(error);
    return {message: error instanceof Error? error.message : 'An error occurred'}
}

export const createUserAction = async (initialState: any, formdata: FormData) => {
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
                ...validatedFields
            }
        })
        await clerkClient.users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true
            }
        })
        
    } catch (error) {
        console.log(error);
        return renderError(error);
    }
    redirect('/');
}

export const fetchProfileImage = async () => {
    const user = await currentUser();
    if(!user) return null
    const image =await db.profile.findUnique({
        where: {
            clerkId: user.id
        },
        select: {
            profileImage: true
        }
    })
    return image?.profileImage
}

export const fetchProfile = async() => {
    const user = await getAuthUser();
    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id
        }
    });
    if(!profile) redirect('/profile/create');
    return profile
}

export const updateProileAction = async(prevState: any, formdata: FormData): Promise<{message: string}> => {
    const user = await getAuthUser();
    try {
        const rawData = Object.fromEntries(formdata);
        const validatedFields = validateFieldsWithZodSchema(ProfileSchema, rawData);

        await db.profile.update({
            where: {
                clerkId: user.id
            },
            data: validatedFields
        })
        revalidatePath('/profile');
        return { message: 'Profile updated successfully' };
    } catch (error) {
        return renderError(error);
    }
}

export const updateProfileImageActions = async (prevState: any, formdata: FormData): Promise<{message: string}> => {
    return {message: 'Profile image updated successfully'}
}