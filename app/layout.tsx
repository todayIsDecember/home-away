import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Providers from '@/app/providers';
import { ClerkProvider } from '@clerk/nextjs';
import ImageContainer from '@/components/properties/ImageContainer';
import { Suspense } from 'react';
import LoadingImage from '@/components/properties/LoadImage';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'HomeAway',
	description: 'Feel at home, away from home.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={inter.className}>
					<Providers>
						<Navbar />
						<Suspense fallback={<LoadingImage />}>
							<ImageContainer
								mainImage={
									'https://pzpezrigzybzhfwjwjjm.supabase.co/storage/v1/object/public/temp-home-away/olivier-guillard-FKJgBUDoVC0-unsplash.jpg'
								}
								name="mainImage"
								isMain
							/>
						</Suspense>
						<main className="container py-10">{children}</main>
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}
