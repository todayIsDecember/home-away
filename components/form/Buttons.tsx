"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { SignInButton } from "@clerk/nextjs";
import { LuTrash2, LuPenSquare } from 'react-icons/lu';

type BtnSubmitProp = 'default' | 'lg' | 'sm'

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: BtnSubmitProp
};

export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={`capitalize ${className}`}
      size={size}
      disabled={pending}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export function CardSignInButton() {
  return (
    <SignInButton mode="modal">
      <Button type="button" size='icon' variant='outline' className="p-2 cursor-pointer" asChild>
        <FaRegHeart/>
      </Button>
    </SignInButton>
  )
}

export function CardSubmitButton({isFavorite}: {isFavorite: boolean}) {
  const {pending} = useFormStatus();

  return (
    <Button type="submit" size='icon' variant='outline' className="p-2 cursor-pointer">
      {pending ? <ReloadIcon className="animate-spin"/> : isFavorite ? <FaHeart/> : <FaRegHeart />}
    </Button>
  )
}

type ActionType = 'edit' | 'delete'

export function IconButton({actionType}: {actionType: ActionType}) {
  const { pending } = useFormStatus();
  const renderIcon = () => {
    switch(actionType) {
      case 'edit' :
        return <LuPenSquare/>
      case 'delete' :
        return <LuTrash2/>
      default:
        const never:never = actionType
        throw new Error(`Invalid action type: ${never}`)
    }
  }
  return (
    <Button
      type="submit"
      size='icon'
      variant='link'
      className="p-2 cursor-pointer"
    >
      {pending ? <ReloadIcon className="animate-spin"/> : renderIcon()}
    </Button>
  )
}