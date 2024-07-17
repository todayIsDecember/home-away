import { Label } from '@/components/ui/label';
import { formattedCountries } from '@/utils/countries';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import EmojiFlag from './Flag';

const name = 'country';

function CountryInput({defaultValue}: {defaultValue?: string}) {
    return (
        <div className="mb-2">
            <Label htmlFor={name} className="capitalize">Country</Label>
            <Select name={name} defaultValue={defaultValue || formattedCountries[0].code} required>
                <SelectTrigger id={name}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {formattedCountries.map((item) => {
                        return (
                            <SelectItem key={item.code} value={item.code}>
                                <span className='flex items-center gap-2'>
                                    <EmojiFlag emoji={item.flag} /> {item.name}
                                </span>
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}

export default CountryInput