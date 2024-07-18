"use client"
import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import logo from "../../app/Logo.png"
import { signIn, signOut, useSession } from "next-auth/react"

const Header = () => {
  const { status } = useSession()

  return (
    <header className="text-gray-800 bg-slate-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <div className='flex items-center space-x-2'>
            <Image src={logo} width={50} height={50} alt="GigNook" />
            <span className="text-lg font-semibold">GigNook</span>
          </div>
        </Link>
        <nav className="ml-8">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-500">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-500">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-500">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
      <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Log In
        </Link>
      </div>
    </header>
  )
}

export default Header
