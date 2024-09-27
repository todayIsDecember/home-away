import { IconType } from 'react-icons';
export type Amenity = {
	name: string;
	icon: IconType;
	selected: boolean;
};
import { RiBilliardsLine } from 'react-icons/ri';
import {
	FaHome,
	FaBed,
	FaSwimmer,
	FaWifi,
	FaBicycle,
	FaCouch,
	FaTv,
	FaChargingStation,
	FaChild,
	FaDog,
	FaUtensils,
	FaSpa,
	FaFire,
	FaShieldAlt,
	FaHotTub,
	FaTableTennis,
	FaChessBoard,
	FaParking,
	FaTree,
	FaUmbrellaBeach,
} from 'react-icons/fa';
import {
	MdKitchen,
	MdLocalLaundryService,
	MdHotTub,
	MdPool,
	MdMovie,
	MdSecurity,
	MdOutdoorGrill,
} from 'react-icons/md';
import { IoGameControllerOutline, IoBoatOutline } from 'react-icons/io5';
import { GiFireplace, GiTennisRacket, GiSoccerBall } from 'react-icons/gi';

export const amenities: Amenity[] = [
	{ name: 'Повністю обладнана кухня', icon: FaHome, selected: false },
	{ name: 'Камін', icon: GiFireplace, selected: false },
	{ name: 'Система клімат-контролю', icon: FaFire, selected: false },
	{ name: 'Пральня', icon: MdLocalLaundryService, selected: false },
	{ name: 'Сауна', icon: MdHotTub, selected: false },
	{ name: 'Джакузі', icon: FaHotTub, selected: false },
	{ name: 'Домашній кінотеатр', icon: MdMovie, selected: false },
	{ name: 'Більярд', icon: RiBilliardsLine, selected: false },
	{ name: 'Настільний теніс', icon: FaTableTennis, selected: false },
	{ name: 'Настільні ігри', icon: FaChessBoard, selected: false },
	{ name: 'Басейн', icon: MdPool, selected: false },
	{ name: 'Зона для барбекю', icon: MdOutdoorGrill, selected: false },
	{ name: 'Велосипеди', icon: FaBicycle, selected: false },
	{ name: 'Човен або каяки', icon: IoBoatOutline, selected: false },
	{ name: 'Тенісний корт', icon: GiTennisRacket, selected: false },
	{ name: 'Wi-Fi', icon: FaWifi, selected: false },
	{ name: 'Охоронна система', icon: MdSecurity, selected: false },
	{ name: 'Система розумного дому', icon: FaShieldAlt, selected: false },
	{ name: 'Дитячий майданчик', icon: FaChild, selected: false },
	{ name: 'Іграшки та книги для дітей', icon: FaChild, selected: false },
	{
		name: 'Огорожена територія для вигулу тварин',
		icon: FaDog,
		selected: false,
	},
	{ name: 'Приватна парковка', icon: FaParking, selected: false },
	{ name: 'Велика зелена територія', icon: FaTree, selected: false },
	{
		name: 'Тераса або зона для відпочинку на свіжому повітрі',
		icon: FaUmbrellaBeach,
		selected: false,
	},
];
