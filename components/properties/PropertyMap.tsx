'use client';

import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import Title from './Title';
import { CiMap } from 'react-icons/ci';
import Link from 'next/link';

const iconUrl =
	'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';

const markerIcon = icon({
	iconUrl: iconUrl,
	iconSize: [20, 30],
});

function PropertyMap({ lat, lng }: { lat: number; lng: number }) {
	const location = [lat, lng] as [number, number];

	const defaultLocation = [51.505, -0.09] as [number, number];
	return (
		<div className="mt-4">
			<div className="mb-4">
				<Title text="Де ви зупинетесь" />
			</div>
			<MapContainer
				center={location || defaultLocation}
				zoom={12}
				scrollWheelZoom={false}
				zoomControl={false}
				className="h-[50vh] rounded-lg relative z-0"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={location || defaultLocation} icon={markerIcon} />
				<ZoomControl position="bottomright" />
			</MapContainer>
			<div className="mt-2 flex gap-2 items-center">
				<CiMap className='text-xl'/>
				<Link
					href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<h3 className='text-xl capitalize'>Показати</h3>
				</Link>
			</div>
		</div>
	);
}

export default PropertyMap;
