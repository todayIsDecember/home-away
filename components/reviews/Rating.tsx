import {FaStar, FaRegStar} from 'react-icons/fa'

function Rating({rating}: {rating: number}) {
    const stars = Array.from({length: 5}, (_, i) => i + 1 <= rating);
    return (
        <div className='flex items-center gap-x-1'>
            {stars.map((isFilled, i) => {
                const classNames = `w-3 h-3 ${isFilled ? 'text-primary' : 'text-gray-400'}`
                return (
                    isFilled ? <FaStar key={i} className={classNames} />
                        : <FaRegStar key={i} className={classNames} />
                )
            })}
        </div>
    )
}

export default Rating