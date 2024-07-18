'use client'
import React, { useState,useEffect } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation'
import {signIn,useSession} from "next-auth/react"
import { toast } from "sonner"
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Image from 'next/image';




declare module "next-auth" {
  interface Session {
    apiToken?: any;
  }

  interface Session {
    user?: any;
  }

  interface User {
    apiToken?: any;
  }
}

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage]=useState<string | null>(null)
  const router=useRouter()
  const {status,data:session}=useSession()
  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (session?.apiToken) {
      localStorage.setItem('token', session.apiToken);
    }
  }, [session]);
  
  useEffect(() => {
    if (status === "authenticated") {
      console.log('sess',session);
      localStorage.setItem('email', session?.user?.email);
      
      localStorage.setItem('token', session.apiToken);

      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [router,session,status]);


  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    
    try{
      const res=await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,formData,{
        headers:{
          'Content-Type':'application/json',
        }
      })
      if (res.data.success) {
        setLoading(true);
        const token = res.data.token;
        const refreshToken = res.data.refresh_token;
        const user=res.data.existingUser;
        
         
     
        toast.success("Login Completed",{
          position:"top-center",
          
        })
        const fullName = `${user.firstname} ${user.lastname}`;

        localStorage.setItem('userid',user._id)
        localStorage.setItem('email',user.email)
        localStorage.setItem('name', fullName);
        localStorage.setItem('token',token)
        localStorage.setItem('refresh_token',refreshToken)
        localStorage.setItem('profileImage',user.profilePicture)
        document.cookie = `token=${token}; path=/;`;
        document.cookie = `refresh_token=${refreshToken}; path=/;`;

        router.push('/home')
      }else if(!res.data.success){
        setLoading(false);
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
					setErrorMessage(error?.response?.data?.message);
				} else {
					setErrorMessage(error?.response?.data?.message);
				}
			} else if (error?.request) {
				setErrorMessage(error?.response?.data?.message);
			} else {
				setErrorMessage(error?.response?.data?.message);
			}
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);
      
    }
  }

  const handleForgetPassword = () => {
    router.push('/forgetPasswordemail');
  };



  return (
    <div className="flex h-screen">
      
      <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 p-8">
      {errorMessage && (
						<div className="text-red-500 mt-4">
							{errorMessage}
						</div>
					)}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome Back</h1>

        

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
         
          <FormControlLabel
        sx={{
          display:'none' ,

        }}
        control={
          <Switch
          className="w-full py-2 px-4"
            checked={loading}
            onChange={() => setLoading(!loading)}
            name="loading"
            color="primary"
          />
        }
        label="Loading"
      />
       <Box sx={{ '& > button': { ml:22 } }}>

       <LoadingButton
       
          size="medium"
          type="submit"
          
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Login</span>
        </LoadingButton>
       </Box>
           
          
        </form>
        <div className="mt-4 flex items-center">
        <span className="text-gray-500 mr-4">Forget Password?</span>
        <span className="text-blue-500 cursor-pointer" onClick={handleForgetPassword}>
          Click here
        </span>
      </div>
        <div className="mt-8 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex gap-4">
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
            Login with Google
          </button>
         
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2">
        <Image
         width={500}
         height={500}
   
          src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
          alt="Login"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;