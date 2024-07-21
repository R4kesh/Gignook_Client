"use client"
import Brief from '@/components/home/brief';
import Category from '@/components/home/category';

import { category } from '@/lib/categories';
import axios from 'axios';
import React,{useEffect,useState,useRef} from 'react';
import { useUserStore } from '@/store/userDetails';
import ShowallCategory from '@/components/home/showAllCategory';
import Footer from '@/components/landing-page/footer';
import Explore from '@/components/landing-page/explore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import io,{Socket} from 'socket.io-client'
import useDebounce from '@/hooks/useDebounce';
import Image from 'next/image';
import dynamic from 'next/dynamic'

const Navbar=dynamic(()=>import('@/components/home/navbar'),{
  ssr:false,
})



interface Freelancer {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  profilePicture: string;
  isFreelancer: boolean;
  service: string[];
  description: string;
  rating:number
}

interface Works{
  _id:string;
  cost:number;
  description:string;
  link:string;
  title:string;
  userId:{
    firstname:string
    profilePicture:string
  }
  images:string
}

const Home = () => {
  const { status, data: session } = useSession();
  const [userData, setUserData] = useState<Freelancer[]>([]);
  const [workData,setWorkData]= useState<Works[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();
  const debouncedSearchTerm=useDebounce(searchTerm,900)
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    socketRef.current.on('notifyLike', (data) => {
      alert(`Your post was liked by ${data.userId}`);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []); 

useEffect(() => {
    if (session?.user?.name && session?.user?.email) {
      const { name, email } = session.user;
      const [firstName, lastName] = name.split(' ');
      useUserStore.getState().setFirstName(firstName);
      useUserStore.getState().setLastName(lastName);
      useUserStore.getState().setEmail(email);
    } else {
      if (typeof window !== 'undefined') {
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");
      const profileImage=localStorage.getItem("profileImage")
      const userid=localStorage.getItem("email")
      
      if (name && email && profileImage && userid) {
        const fullname = name.split(' ');
        if (fullname.length === 2) {
          const [firstName, lastName] = fullname;
          useUserStore.getState().setFirstName(firstName);
          useUserStore.getState().setLastName(lastName);
          useUserStore.getState().setEmail(email);
          useUserStore.getState().setProfileImage(profileImage);
          useUserStore.getState().setUserId(userid);
        } else {
          console.log('Invalid full name format');
        }
      } else {
        console.log('Full name or email not found in localStorage');
      }
    }
    }
  }, [session]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
        

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/listFreelancers`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },params: {
            search: debouncedSearchTerm,
            category: selectedCategory,
            sortOrder
          }
        });
        setLoading(false);
        setUserData(response.data.data);
      }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };


      fetchUserData();

  }, [debouncedSearchTerm, selectedCategory, sortOrder]);


  useEffect(() => {
    const fetchWorkData = async () => {
      try {
        if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/listWorks`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }});
       
        
        setWorkData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching work data:', error);
      }
    };


      fetchWorkData();

  }, []);

  const filteredData = userData
  .filter(freelancer =>
    freelancer.firstname.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    freelancer.lastname.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  )
  .filter(freelancer =>
    selectedCategory ? freelancer.service.includes(selectedCategory) : true
  )
  .sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.rating - b.rating;
    } else if (sortOrder === 'highToLow') {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });

  const handleViewMore = (id:String) => {
    
    router.push(`/work/${id}`);
  };

  const handleProfile=(id:String)=>{
    router.push(`/freelancerProfile/${id}`)
  }


  return (
    <>
    <div className="bg-white shadow-md">
      <Navbar />
      <Category />
      <Brief />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-800 font-bold text-xl">
            Explore popular FREELANCERS on GigNook
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-md"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Filter Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Article">Article</option>
              <option value="Video">Video</option>
              <option value="Voice">Voice Over</option>
              <option value="Animation">Animation</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Writing">Writing</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Sort by Rating</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>

            <button className="bg-gray-200 p-1 rounded-full">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="text-black underline px-2 py-1 ml-4">
              Show All
            </button>
            <button className="bg-gray-200 p-1 rounded-full ml-4">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
        <div className="col-span-1 md:col-span-1 bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul>
            {category.map((cat, index) => (
              <li key={index} className="flex items-center mb-2">
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 md:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Featured Freelancers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredData.map((freelancer) => (
              <div
                key={freelancer._id}
                className="bg-gray-100 p-4 rounded-md"
              >
                <Image
                  src={freelancer.profilePicture}
                  width={300}    
      height={200}

                  alt={`${freelancer.firstname} ${freelancer.lastname}`}
                  className="w-full h-40 object-cover mb-2 rounded-md"
                />
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {freelancer.firstname} {freelancer.lastname}
                  </h3>
             
                </div>
                <p className="text-gray-1000 font-mono">
                  {freelancer.service.join(', ')}
                </p>
                <p className="text-gray-500">{freelancer.description}</p>
                <button
                  onClick={() => handleProfile(freelancer._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600"
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ShowallCategory />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
        <div className="col-span-1 md:col-span-1 bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul>
            {category.map((category, index) => (
              <li key={index} className="flex items-center mb-2">
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 md:col-span-3">
          <h2 className="text-lg font-semibold mb-4">
            Featured Work Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {workData.map((freelancer, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md">
                <Image
                  src={freelancer.images}
                  width={100}
                  height={100}
                  alt={freelancer.title}
                  className="w-full h-40 object-cover mb-2 rounded-md"
                />
                <h3 className="text-lg font-semibold">
                  {freelancer.title}
                </h3>
                <div className="flex items-center mb-2">
                  <Image
                    src={freelancer.userId.profilePicture}
                    width={75}
                    height={75}
                    alt={`${freelancer.userId.firstname} profile`}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <p className="text-sm text-gray-600">
                    {freelancer.userId.firstname}
                  </p>
                </div>
                <p className="text-gray-600">{freelancer.link}</p>
                <p className="text-gray-700">{freelancer.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleViewMore(freelancer._id)}>
                    View More
                  </button>
                  <p className="text-sm text-gray-800 ml-2 underline">
                    ₹{freelancer.cost}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <Explore />
    <Footer />
  </>
  );
};

export default Home;