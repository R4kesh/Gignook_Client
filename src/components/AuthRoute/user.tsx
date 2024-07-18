"use client"
import { useRouter } from 'next/navigation';
import { useEffect,ReactNode } from 'react';

interface AuthRouteProps {
    children: ReactNode;
  }

const AuthRoute = ({ children }:AuthRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
   
    
    if (token) {
      router.push('/home');
    }else{
      router.push('/login')
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthRoute;
