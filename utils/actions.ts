'use server'

import { ImageSchema, ProfileSchema, propertySchema, validateFieldsWithZodSchema } from "./schemas";
import db from './db'
import { auth, currentUser, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";

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
    const user = await getAuthUser();
    try {
        const image = formdata.get('image') as File;
        const validatedFields = validateFieldsWithZodSchema(ImageSchema, { image });
        const fullPath = await uploadImage(validatedFields.image);
        await db.profile.update({
            where: {
                clerkId: user.id
            },
            data: {
                profileImage: fullPath
            }
        })
        revalidatePath('/profile');
        return { message: 'Profile image updated successfully' };
    } catch (error) {
        return renderError(error);
    }
}

export const createPropertyAction = async (initialState: any, formdata: FormData) => {
    const user = await getAuthUser();
    try {
        const rawData = Object.fromEntries(formdata);
        const file = formdata.get('image') as File;
        const validateFile = validateFieldsWithZodSchema(ImageSchema, { image: file });
        const fullPath = await uploadImage(validateFile.image);
        const validatedFields = validateFieldsWithZodSchema(propertySchema, rawData);
        await db.property.create({
            data: {
                ...validatedFields,
                image: fullPath,
                profileId: user.id
            }
        })
    } catch (error) {
        return renderError(error);
    }
    redirect ('/')
}

export const fetchProperties = async ({search = '', category}: {search?: string, category?: string}) => {
    const properties = await db.property.findMany({
        where: {
            category,
            OR: [
            {name: {contains: search, mode: 'insensitive'}},
            {tagline: {contains: search, mode: 'insensitive'}}
            ]
        },
        select: {
            id: true,
            name: true,
            tagline: true,
            price: true,
            country: true,
            image: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return properties
}

export const fetchFavouriteId = async({
    propertyId,
    }: {
    propertyId: string;
    }) => {
    const user = await getAuthUser();
    const favourite = await db.favorite.findFirst({
        where: {
            profileId: user.id,
            propertyId: propertyId
        },
        select: {
            id: true
        }
    });
    return favourite?.id || null
};

export const toggleFavoriteAction = async(prevState: {propertyId: string, favoriteId: string | null, pathname: string}) => {
    const user = await getAuthUser()
    const {propertyId, favoriteId, pathname} = prevState;
    try {

        if(favoriteId)
        {
            await db.favorite.delete({
                where: {
                    id: favoriteId
                }
            })
        }
        else {
            await db.favorite.create({
                data: {
                    propertyId,
                    profileId: user.id
                }
            })
        }
        revalidatePath(pathname)
        return {message: favoriteId ? 'removed from faves' : 'added to faves'}
    } catch (error) {
        return renderError(error)
    }
}

export const fetchFavourites = async () => {
    const user = await getAuthUser();
    const favourites = await db.favorite.findMany({
        where: {
            profileId: user.id
        },
        select: {
            property: {
                select: {
                    id: true,
                    name: true,
                    tagline: true,
                    price: true,
                    country: true,
                    image: true
                }
            }
        }
    })
    return favourites.map(favorite => favorite.property)
}

export const fetchPropertyDetails = async(id: string) => {
    return db.property.findUnique({
        where: {
            id
        }
    })
}