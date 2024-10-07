'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import FormContainer from './FormContainer';
import ImageInput from './ImageInput';
import { IconButton, SubmitButton } from './Buttons';
import { type actionFunction } from '@/utils/types';
import { LuUser2 } from 'react-icons/lu';
import { TiDelete } from 'react-icons/ti';

type ImageInputContainerProps = {
	image: string | string[];
	name: string;
	action: actionFunction;
	text: string;
	children?: React.ReactNode;
};

export function ImageInputContainer(props: ImageInputContainerProps) {
	const { image, name, action, text } = props;
	const [isUpdateFormVisible, setUpdateFormVisible] = useState<boolean>(false);

	const userIcon = (
		<LuUser2 className="w-24 h-24 bg-primary rounded-md text-white mb-4" />
	);

	if (!Array.isArray(image))
		return (
			<div>
				{image && (
					<Image
						src={image}
						alt={name}
						width={100}
						height={100}
						className="rounded-md w-24 h-24 object-cover mb-4"
					/>
				)}
				<Button
					variant="outline"
					size="sm"
					onClick={() => setUpdateFormVisible((prev) => !prev)}
				>
					{text}
				</Button>
				{isUpdateFormVisible && (
					<FormContainer action={action} className="my-4">
						{props.children}
						<ImageInput className="my-4" />
						<SubmitButton size="sm" />
					</FormContainer>
				)}
			</div>
		);
}

export function DeleteImageContainer(props: ImageInputContainerProps) {
	const { image, name, action, text } = props;
	const [imageName, setImageName] = useState<string>('');
	if (Array.isArray(image))
		return (
			<>
				<FormContainer action={action}>
					<div className="flex flex-wrap justify-center gap-4">
						{image.length > 0 &&
							image.map((img) => (
								<div
									className="relative w-[150px] h-[150px]"
									key={img}
								>
									<Image
										src={img}
										alt={name}
										width={150}
										height={150}
										className="rounded-md w-36 h-36 object-cover mb-4"
									/>
									<IconButton
										actionType="delete"
										classname="absolute top-[-4px] right-0 bg-slate-500"
										onClick={() => setImageName(img)}
									/>
								</div>
							))}
					</div>
					<input type="hidden" name="image" value={imageName} />
					{props.children}
				</FormContainer>
			</>
		);
}
