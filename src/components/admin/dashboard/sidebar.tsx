import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path:any) => pathname === path;

  return (
    <div className="bg-[#1a1a1a] text-white py-4 px-6 w-64 h-screen">
      <div className="mb-8 text-lg font-bold">Menu</div>
      <ul>
        <li className="mb-4">
          <Link href="/admin/dashboard" className={`${isActive('/admin/dashboard') ? 'bg-white text-black' : 'hover:text-gray-300'}`}>
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/user" className={`${isActive('/admin/user') ? 'bg-white text-black' : 'hover:text-gray-300'}`}>
            User
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/post" className={`${isActive('/admin/post') ? 'bg-white text-black' : 'hover:text-gray-300'}`}>
            Post
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/freelancer" className={`${isActive('/admin/freelancer') ? 'bg-white text-black' : 'hover:text-gray-300'}`}>
            Freelancer Approval
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/freelancers" className={`${isActive('/admin/freelancers') ? 'bg-white text-black' : 'hover:text-gray-300'}`}>
            Freelancer
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/payments" className={`${isActive('/admin/payments') ? 'bg-white text-black' : 'hover:text-gray-300'}`}>
            Payments
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
