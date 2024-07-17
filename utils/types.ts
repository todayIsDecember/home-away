export type actionFunction = (previousState: any, formData: FormData) => Promise<{message: string}>

export type PropertyCardProps = {
    image: string;
    id: string;
    name: string;
    tagline: string;
    country: string;
    price: number;
};