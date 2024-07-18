"use client"
import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import logo from "../../app/Logo.png"
import {signIn,signOut, useSession} from "next-auth/react"

const Header = () => {
const {status}=useSession()


  return (
    <header className="text-gray-800 bg-slate-200 py-4 px-6 flex items-center justify-between">
  <div className="flex items-center">
    
  <Link href="/" className="flex items-center">
          <div className='flex items-center space-x-2'> {/* Adjust space-x as needed */}
            <Image src={logo} width={50} height={50} alt="GigNook" />
            <span className="text-lg font-semibold">GigNook</span>
          </div>
        </Link>
    
    <nav className="ml-8">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-gray-300">About</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-300">Contact</Link>
        </li>
      </ul>
    </nav>
  </div>
  <div>
    {/* {!user ? ( */}
      <div className="flex items-center">
        <Link href="/login" className="mr-4 hover:text-gray-300">
          Log In
        </Link>


        {/* <Link href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ">
          Sign Up
        </Link> */}
        
{/* 
        {status==="authenticated" ?(
          <button onClick={()=>signOut()} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            SignOut
          </button>
        ):(
          <button onClick={()=>signIn("google")} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Login In
          </button>
        )} */}
      </div>
    
  </div>
</header>
  )
}

export default Header
