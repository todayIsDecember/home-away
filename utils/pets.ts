import { FaCat, FaDog } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { variants } from './types';

export const pets: variants[] = [
	{
		label: 'SMDOG',
		name: 'Маленька собака',
		icon: FaDog,
	},
    {
        label: 'MDDOG',
        name: 'Середня собака',
        icon: FaDog
    },
    {
        label: 'LGDOG',
        name: 'Велика собака',
        icon: FaDog
    },
    {
        label: 'CAT',
        name: 'кішка',
        icon: FaCat
    },
    {
        label: 'ANOTHER',
        name: 'інший домашній улюбленець',
        icon: MdPets
    },
    {
        label: 'NOT',
        name: 'без домашніх улюбленців',
        icon: FaDog
    },

];
