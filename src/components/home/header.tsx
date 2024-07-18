import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../app/Logo.png';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  Cloud,
  CreditCard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  UserPlus,
} from 'lucide-react';
import { Button } from '@mui/material';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header className="text-gray-800 bg-slate-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <Image src={logo} width={50} height={50} alt="GigNook" />
            <span className="text-lg font-semibold">GigNook</span>
          </a>
        </Link>

        <nav className="ml-8">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center">
        {status === 'authenticated' ? (
          <button
            onClick={handleSignOut}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Profile</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Become a Freelancer</span>
                  <DropdownMenuShortcut>⇧⌘F</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Payment</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>More...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Cloud className="mr-2 h-4 w-4" />
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={handleLogout}>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
