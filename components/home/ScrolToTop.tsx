'use client';
import { FaArrowUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

function ScrollToTop() {
	const [showButton, setShowButton] = useState<boolean>(false);

	// Використовуємо useEffect для відстеження прокрутки
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShowButton(true); // Показуємо кнопку, якщо прокрутка більше 300 пікселів
			} else {
				setShowButton(false); // Ховаємо кнопку, якщо прокрутка менша
			}
		};

		// Додаємо обробник події прокрутки
		window.addEventListener('scroll', handleScroll);

		// Очищуємо обробник подій при розмонтуванні компонента
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Обробник кліку для повернення наверх
	const onClickHandler = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<Button
			size="icon"
			className={`fixed bottom-4 right-4 transition-opacity duration-300 ${
				showButton ? 'opacity-100' : 'opacity-0'
			}`}
			onClick={onClickHandler}
			style={{ transition: 'opacity 0.3s ease' }} // Плавний перехід для opacity
		>
			<FaArrowUp />
		</Button>
	);
}

export default ScrollToTop;
