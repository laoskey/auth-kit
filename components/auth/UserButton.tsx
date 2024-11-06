"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./LogoutButton";
import { ExitIcon } from "@radix-ui/react-icons";

interface UserButtonProps {}
export function UserButton() {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className='bg-sky-500'>
            <FaUser className='text-white' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-40'
        align='end'
      >
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className=' h-4 w-4 mr-2 self-center' />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
