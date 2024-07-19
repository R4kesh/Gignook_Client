"use client"
import React,{useEffect,useState} from 'react'
import Link from "next/link"
import Image from 'next/image'
import logo from "../../app/Logo.png"
import { useRouter } from 'next/navigation'
import {signIn,signOut, useSession} from "next-auth/react"
import FullScreenDialog from './fullscreendialog'
import axios from 'axios';
import io from 'socket.io-client'
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
const socket = io('http://localhost:5001');

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
} from "lucide-react"
type Notification = {
  message: string;
  
};

import { Button } from '@mui/material'
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
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  interface User {
    isFreelancer: boolean;
    application:string;
   
  }
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));


const Navbar = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [id,setId]=useState<string | null>()

if (typeof window !== 'undefined') {
  const email=localStorage.getItem("email") 
const data={
  email:email
} 
}

const {status}=useSession()
const router = useRouter()
const [userData, setUserData] = useState<User>();

const handleSignOut = async () => {
    await signOut({ redirect: false }); 
    if (typeof window !== 'undefined') {
    localStorage.clear();
    }
    router.push('/login'); 
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
    localStorage.clear();
    }
  
    router.push('/login');
  };

 
    

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const userid=localStorage.getItem('userid')
    setId(localStorage.getItem('userid'))
    
    socket.on(`notification_${userid}`, (data) => {

      setNotifications((prevNotifications) => [...prevNotifications, data]);
    
    });

    
    return () => {
      socket.off(`notification_${userid}`);
    };
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (typeof window !== 'undefined') {
        const email=localStorage.getItem("email") 
        const token = localStorage.getItem('token');
        const data = {
          email: email
        }
        
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/switchfreelancer`,data,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
       

        setUserData(res.data.data); 
      }
      } catch (error) {
        console.error('Error fetching freelancers:', error);
      }
    };
    fetchUsers();
  }, []);


  const toggleNotifications = () => {
    setShowNotifications((prevShow) => !prevShow);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  return (
    <div className=" border-black shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-16">
          <div className='flex items-center space-x-2'>
          <Image src={logo} width={50} height={50} alt="GigNook" />
          <span className="text-lg font-semibold">GigNook</span>
          
          </div>
          <div className="flex items-center">
            <div className="relative mx-auto text-gray-600">
              <input
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
              />
              <button type="submit" className="absolute right-0 top-0 mt-3 mr-4" >
                {/* this is a notification icon button */}
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
              {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                <div className="py-2">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div key={index} className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                        {notification.message}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-700">No notifications</div>
                  )}
                </div>
              </div>
            )}
            </div>
            <div className="ml-4 flex items-center">
              {/* notification */}
              
              <IconButton aria-label="cart"  onClick={toggleNotifications}>
      <StyledBadge badgeContent={notifications.length} color="secondary">
        <NotificationsNoneIcon/>
      </StyledBadge>
    </IconButton>
   

              
             
             <MessageOutlinedIcon onClick={()=>{ router.push(`/message/${id}`)}}/>
          
              
              <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button  className="bg-gray-200 p-2 rounded-full ml-2"> 
                <svg
                  className="h-6 w-6 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              
              </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserPlus className="mr-2 h-4 w-4" />

            {userData && userData.isFreelancer && userData.application === 'Approved' ? (
            <Link href={"/freelancer/home"}> <span>Switch to Freelancer</span> </Link>
            ) : (
              <Link href={"/form/personal_details"}> <span>Become a Freelancer</span> </Link>
              )}
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
            <span onClick={handleDialogOpen}>Payment</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link href={"/postmanagement"}><span>Post</span></Link>
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
          <LogOut  className="mr-2 h-4 w-4" />
          {status==="authenticated" ?(
          <span onClick={handleSignOut}>Log out</span>
          ):(
            <span onClick={handleLogout}>Log out</span>
            )}  
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <FullScreenDialog open={dialogOpen} handleClose={handleDialogClose} />
      </div>
  )
}

export default Navbar
