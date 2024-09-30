'use client'


import { Button } from '../ui/button';
import Title from './Title'
import { useState } from "react";

function Description({description}: {description: string}) {
    const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
    const words = description.split(' ')
    const isLongDescription = words.length > 100;
    const toggleDescription = () => {
        setIsFullDescriptionShown(!isFullDescriptionShown);
    }

    const displayedDescription = isLongDescription && !isFullDescriptionShown ? words.slice(0, 100).join(' ') + '...' : description;
    return (
        <article className="mt-4">
            <Title text="Опис" />
            <p className="text-muted-foreground font-light leading-loose">{displayedDescription}</p>
            {isLongDescription && <Button variant='link' className='pl-0' onClick={toggleDescription}>
                    {isFullDescriptionShown ? 'Show less' : 'Show more'}
                </Button>}
        </article>
    )
}

export default Description;