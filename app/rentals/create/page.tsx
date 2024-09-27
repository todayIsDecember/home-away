import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPropertyAction } from '@/utils/actions';
import { SubmitButton } from '@/components/form/Buttons';
import PriceInput from '@/components/form/PriceInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import TextareaInput from '@/components/form/TextareaInput';
import ImageInput from '@/components/form/ImageInput';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';
import { categories } from '@/utils/categories';
import { pets } from '@/utils/pets';
import { locations } from '@/utils/locations';

function CreatePropertyPage() {
	return (
		<section>
			<h1 className="text-2xl capitalize font-semibold mb-8">
				Створити Заявку
			</h1>
			<div className="border p-8 rounded-md">
				<h3 className="text-lg mb-4 font-medium">Основна інформація</h3>
				<FormContainer action={createPropertyAction}>
					<div className="grid md:grid-cols-2 gap-8 mb-4">
						<FormInput
							name="name"
							type="text"
							defaultValue="Cabin in Latvia"
							label="Назва ( ліміт 20 )"
						/>
						<FormInput
							name="tagline"
							type="text"
							defaultValue="Dream Getaway Awaits You Here!"
							label="Слоган ( ліміт 30 )"
						/>
						<PriceInput />
						{/* categories */}
						<CategoriesInput
							name="category"
							label="категорія"
							variants={categories}
						/>
						<CategoriesInput
							name="pets"
							label="Домашні Тварини"
							variants={pets}
						/>
						<CategoriesInput
							name="location"
							label="Локація"
							variants={locations}
						/>
					</div>
					<TextareaInput name="description" labelText="Опис (10 - 1000 слів)" />
					<ImageInput></ImageInput>
						<FormInput
							name="address"
							type="text"
							defaultValue="Київ вулиця Уманська 23/9"
							label="Адреса"
						/>
					<h3 className="text-lg mt-8 mb-4 font-medium">Деталі проживання</h3>
					<CounterInput detail="guests" name="гостей" />
					<CounterInput detail="bedrooms" name="спальних кімнат" />
					<CounterInput detail="beds" name="спальних місць" />
					<CounterInput detail="baths" name="ванних кімнат" />
					<h3 className="text-lg mt-10 mb-6 font-medium">Зручності</h3>
					<AmenitiesInput />
					<SubmitButton text="create rental" className="mt-12" />
				</FormContainer>
			</div>
		</section>
	);
}

export default CreatePropertyPage;
