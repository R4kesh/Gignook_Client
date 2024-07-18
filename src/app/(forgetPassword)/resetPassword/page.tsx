"use client"
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import  { useRouter } from 'next/navigation';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [decodedEmail, setDecodedEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const encodedEmail = searchParams.get('email');
    if (encodedEmail) {
      const decodedEmail = atob(encodedEmail);
      setDecodedEmail(decodedEmail);
    }
  }, []);


  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
  
  

  if (newPassword.length < 6) {
    setErrorMessage('Password must be at least 6 characters long.');
    return;
  }


    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/forgotresetpassword`, {
        newPassword, email:decodedEmail
      });
      if(response.data.success){
        router.replace('/login')
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
     <div className="bg-white p-6 rounded-md shadow-md">
     <form onSubmit={handleSubmit}>
         
            <h2 className="text-lg font-bold mb-4">Reset Password</h2>
            <h3 className="text-sm text-gray-600 mb-6">This is step 1</h3>
            {/* <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            /> */}
            <input
              id="password"
              type="password"
              name="pass"
              placeholder="Password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              id="confirmPassword"
              type="password"
              name="cpass"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
            >
             Reset Password
            </button>
         
            </form>
      </div>
    </div>
  )
}

export default ResetPassword
