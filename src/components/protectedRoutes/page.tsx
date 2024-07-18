
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { headers } from 'next/headers';
import { ReactNode } from 'react';

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const userEmail = localStorage.getItem('token');
  const { status, data: session } = useSession();
  const router = useRouter();

  const cookieStore = headers().get('cookie');
  const token = cookieStore?.split(';').find(cookie => cookie.trim().startsWith('token='))?.split('=')[1];
  const isLoggedIn = !!token;

 

  if (status === 'authenticated' || isLoggedIn) {
    return children;
  }

  router.replace('/');
  return null;
};

export default ProtectedRoutes;