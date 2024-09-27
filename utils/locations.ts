import { variants } from './types';

import {
	GiMountainCave,
	GiRiver,
	GiWaterfall,
	GiForest,
	GiFarmTractor,
	GiIsland,
} from 'react-icons/gi';
import { FaCity, FaBuilding } from 'react-icons/fa';

export const locations: variants[] = [
	{ label: 'MOUNTAINS', name: 'В горах', icon: GiMountainCave },
	{ label: 'RIVER', name: 'Біля річки', icon: GiRiver },
	{ label: 'LAKE', name: 'Біля озера', icon: GiWaterfall },
	{ label: 'FOREST', name: 'Біля/в лісі', icon: GiForest },
	{ label: 'COUNTRYSIDE', name: 'Сільська місцевість', icon: GiFarmTractor },
	{ label: 'CITY', name: 'В місті', icon: FaCity },
	{ label: 'COASTLINE', name: 'З береговою лінією', icon: GiIsland },
	{ label: 'NEARCITY', name: 'Біля міста', icon: FaBuilding },
];
