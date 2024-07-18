"use client"
import React,{useState} from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Header from '@/components/admin/header';
import Image from 'next/image';

const Adminlogin = () => {
  const router=useRouter()
  const [errorMessage, setErrorMessage]=useState<string | null>(null)
  const [formData, setFormData] = useState({})
  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit=async(e:any)=>{
    e.preventDefault();
    
    
    try{
      const res=await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login`,formData,{
        headers:{
          'Content-Type':'application/json',
        }
      })

      if(res.data.success){
        const token = res.data.token;
        localStorage.setItem("admin_access_token", token);
        document.cookie = `token=${res.data.token}; path=/`;
        router.push('/admin/dashboard')
      }else {
        console.error('Login failed:', res.data.message);
				setErrorMessage(`Login failed: ${res.data.message}`);
				setTimeout(() => {
					setErrorMessage(null);
				}, 3000);

      }
      

    }catch(error:any){
      console.log(error);
      if (error.response) {
				if (error.response.status === 401) {
					setErrorMessage('Invalid email or password.');
				} else {
					setErrorMessage('Login failed. invaild Admin Credentials, Please try again later.');
				}
			} 
    }
  }

  return (
    <>
    <Header/>
     <div className="flex h-screen">
      
      <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome Admin</h1>

        {errorMessage && (
						<div className="text-red-500 mt-4">
							{errorMessage}
						</div>
					)}


        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
             onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
       
      </div>

      {/* Right side */}
      <div className="w-1/2">
        <Image
          src="https://c7.alamy.com/comp/2J0822G/the-admin-user-has-all-the-privileges-shot-of-the-login-page-of-a-website-all-design-on-this-image-is-created-from-scratch-by-yuri-arcurs-team-of-2J0822G.jpg"
          alt="Login"
          width={400}
      height={400}

          className="h-full w-full object-cover"
        />
      </div>
    </div>
    </>
  )
}

export default Adminlogin
