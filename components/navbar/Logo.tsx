import { Button } from "../ui/button"
import Link from 'next/link'
import {LuTent} from 'react-icons/lu'

function Logo() {
    return (
        <Button size='icon' asChild>
            <Link href='/'>
                <LuTent className="w-8 h-8"/>
            </Link>
        </Button>
    )
}

export default Logo