import { createClient } from '@supabase/supabase-js';

const bucket = 'temp-home-away';

const url = process.env.SUPABASE_URL as string;

const key = process.env.SUPABASE_KEY as string;

const supabase = createClient(url, key);

export const uploadImage = async (image: File) => {
	const timestamp = Date.now();
	const newName = `${timestamp}-${image.name}`;
	const { data } = await supabase.storage
		.from(bucket)
		.upload(newName, image, { cacheControl: '3600' });
	if (!data) throw new Error('Uploaded Imafe Failed');
	return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImageFromStorage = async (imageUrl: string) => {
	try {
		const { data, error } = await supabase.storage
			.from(bucket)
			.remove([imageUrl]);

		if (error) {
			console.error('Error deleting image:', error);
			throw new Error('Failed to delete image');
		}
	} catch (error) {
		console.log(error);
		throw new Error('Failed to delete image');
	}
};
