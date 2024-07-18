'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

interface FormData {
  [key: string]: string | undefined; 
}

const Signup = () => {
  

  const [formData,setFormData]=useState<FormData>({})
  const [errorMessage, setErrorMessage]=useState<string | null>(null)
  const router = useRouter()
  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const requiredFields = ['firstname', 'lastname', 'email', 'password'];
    const emptyFields = requiredFields.filter(field => !formData[field]);



    try{
      const res=await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup`,formData,{
        headers:{
          'Content-Type':'application/json',
        }
      })
     
      const data=res.data
      
      if (data.success) {
        console.log("Signup successful. Redirecting to login page...");
        router.push('/success');
      } else {
        console.log("Signup unsuccessful:", data.message);
        return
      }

      if(!data.success){
        console.error('Signup failed:', res.data.message);
				setErrorMessage(`Signup failed: ${res.data.message}`);
				setTimeout(() => {
					setErrorMessage(null);
				}, 3000);
      }

     
       
    }catch(error:any){
      console.log("error axios",error);
      if (error.response) {
				if (error.response.status === 401) {
					setErrorMessage(error.response.data.message);
				} else {
					setErrorMessage(error.response.data.message);
				}
			} else if (error.request) {
				setErrorMessage(error.response.data.message);
			} else {
				setErrorMessage(error.response.data.message);
			}
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);
    }
  }


  


  return (
    <>
    
    <div className="flex h-screen">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Create an Account</h1>
        {errorMessage && (
						<div className="text-red-500 mt-4">
							{errorMessage}
						</div>
					)}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex mb-4">
            <div className="mr-2 w-1/2">
              <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your first name"
                onChange={handleChange}
              />
            </div>
            <div className="ml-2 w-1/2">
              <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your last name"
                onChange={handleChange}
              />
            </div>
          </div>
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
            Sign Up
          </button>
          
        </form>
       
        <div className="mt-8 flex items-center">
        
          <hr className="flex-grow border-gray-300" />
          {/* <span className="mx-4 text-gray-500">OR</span> */}
          <hr className="flex-grow border-gray-300" />
        </div>
        {/* <div className="flex gap-4">
          <button onClick={()=>signIn("google")}
            type="button"
            className="mt-4 flex items-center justify-center py-2 px-4 rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
          >
            <svg
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Sign Up with Google
          </button>
          <button
            type="button"
            className="mt-4 flex items-center justify-center py-2 px-4 rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
          >
            <svg
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24"
            >
              <path
                fill="#000000"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4C12.9548 4 4 12.9548 4 24C4 35.0452 12.9548 44 24 44C35.0452 44 44 35.0452 44 24C44 12.9548 35.0452 4 24 4ZM24 6C14.0647 6 6 14.0647 6 24C6 33.9353 14.0647 42 24 42C33.9353 42 42 33.9353 42 24C42 14.0647 33.9353 6 24 6Z"
              />
              <path
                fill="#000000"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 13C21.2386 13 19 15.2386 19 18C19 20.7614 21.2386 23 24 23C26.7614 23 29 20.7614 29 18C29 15.2386 26.7614 13 24 13ZM15 23C15 19.6863 17.6863 17 21 17H27C30.3137 17 33 19.6863 33 23V35H15V23Z"
              />
            </svg>
            Sign Up with GitHub
          </button>
          </div> */}
          </div>

          <div className="w-1/2 max-h-screen">
        <Image
          src="https://images.unsplash.com/photo-1497215641119-bbe6d71ebaae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={500}
          height={400}
    
          alt="Login"
          className="h-fit w-full object-cover max-h-screen"
        />
      </div>
    </div>
    </>
  )
}

export default Signup
