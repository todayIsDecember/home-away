'use client';

import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const SimpleSlider = ({ images }: { images: string[] }) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 700,
		slidesToShow: 1,
		slidesToScroll: 1,
		waitForAnimate: false,
	};

	return (
		<Slider
			{...settings}
			className="p-6 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] "
		>
			{images.map((image, index) => (
				<div
					key={index}
					className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px]"
				>
					<Image
						src={image}
						alt={`Image ${index}`}
						layout="fill"
						className="object-cover p-2"
					/>
				</div>
			))}
		</Slider>
	);
};

export default SimpleSlider;
