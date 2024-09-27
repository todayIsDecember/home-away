import { MdCabin } from 'react-icons/md';

import { TbCaravan, TbTent, TbBuildingCottage } from 'react-icons/tb';

import { GiWoodCabin, GiMushroomHouse } from 'react-icons/gi';
import { PiWarehouse, PiLighthouse, PiVan } from 'react-icons/pi';

import { GoContainer } from 'react-icons/go';
import { variants } from './types';


export const categories: variants[] = [
	{
		label: 'cabin',
		icon: MdCabin,
		name: 'будиночок',
	},
	{
		label: 'tent',
		icon: TbTent,
		name: 'намет',
	},
	{
		label: 'cottage',
		icon: TbBuildingCottage,
		name: 'котедж',
	},
	{
		label: 'container',
		icon: GoContainer,
		name: 'контейнер',
	},
	{
		label: 'caravan',
		icon: TbCaravan,
		name: 'караван',
	},

	{
		label: 'tiny',
		icon: PiLighthouse,
		name: 'крихітний будинок',
	},
	{
		label: 'lodge',
		icon: GiWoodCabin,
		name: 'Лодж',
	},
];
