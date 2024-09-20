import { Button } from "../ui/button"
import Link from 'next/link'
import {LuTent} from 'react-icons/lu'

function Logo({className = ''}) {
    return (
        <Button size='icon' asChild className={className}>
            <Link href='/'>
                <LuTent className="w-8 h-8"/>
            </Link>
        </Button>
    )
}

export default Logo