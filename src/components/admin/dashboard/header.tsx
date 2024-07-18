"use client"
import React from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Header = () => {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/admin');
  };

  return (
    <header className="bg-[#262626] py-4 flex items-center justify-between px-6">
      {/* Company Name */}
      <div className="text-white font-bold text-xl">GigNook</div>

      {/* Search Bar */}
      <div className="flex-grow mx-8">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-md bg-[#3a3a3a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center text-white">
        {/* Notification Icon */}
        <div className="mx-4 relative">
        <IoMdNotificationsOutline />
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
        </div>

        {/* Profile Icon */}
        <div className="mx-4">
        <DropdownMenu>
  <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
  <DropdownMenuContent>
   
    <DropdownMenuItem><span onClick={handleLogout}>Log out</span></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        </div>
      </div>
    </header>
  );
};

export default Header;