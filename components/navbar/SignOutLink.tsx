'use client'

import { useToast } from "../ui/use-toast"
import { SignOutButton } from "@clerk/nextjs"

function SignOutLink() {
    const { toast } = useToast()
    const handleOnClick = () => {
        toast({
            description: "You have been signed out.",
        })
    }

    return (
        <SignOutButton redirectUrl="/">
            <button className="w-full text-left" onClick={handleOnClick}>LogOut</button>
        </SignOutButton>
    )
}

export default SignOutLink