"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Forgetpasswordemail = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<any | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false); // State to track OTP sent

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<{ success: boolean, message: string }>(`${process.env.NEXT_PUBLIC_BASE_URL}user/verifyforgototp`, {
        email,
        otp,
        verificationCode: verificationCode.toString(),
      });
      setMessage({ message: response.data.message });
      if (response.data.success) {
        const encodedEmail = btoa(email);
        router.replace(`/resetPassword?email=${encodedEmail}`);
      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      if (error.response && error.response.status === 400) {
        setMessage({ message: 'Invalid OTP. Please enter a valid verification code.' });
      } else {
        setMessage({ message: 'An error occurred while verifying OTP.' });
      }
    }
  };

  const verifyEmail = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!email) {
      setMessage({ message: 'Please enter your email address.' });
      return;
    }
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/forgotpassword`, {
        email,
      });
      setMessage(response.data);
      setVerificationCode(response.data.verificationCode);
      setOtpSent(true);
    } catch (error: any) {
      console.error('Error sending email:', error);
      if (error.response && error.response.status === 404) {
        setMessage({ message: 'User not found. Please enter a valid email address.' });
      } else {
        setMessage({ message: 'An error occurred while sending the message.' });
      }
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <ul className="flex justify-between mb-6">
        {message && (
          <div className="mt-4 text-center">
            <p className={`text-sm ${String(message.message).includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message.message}</p>
          </div>
        )}
      </ul>

      <div className="bg-white p-6 rounded-md shadow-md">
        <>
          <h2 className="text-lg font-bold mb-4">Enter your email</h2>
          <h3 className="text-sm text-gray-600 mb-6">This is step 1</h3>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input
              id="email-address"
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={verifyEmail}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
            >
              Sent OTP
            </button>

            {otpSent && ( 
              <>
                <h3 className="text-sm text-gray-600 mb-6">This is step 2</h3>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the Otp"
                  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!otp}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
                >
                  Submit
                </button>
              </>
            )}
          </form>
        </>
      </div>
    </div>
  );
};

export default Forgetpasswordemail;
