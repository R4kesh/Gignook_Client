import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const useCheckBlockedStatus = () => {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('email');

  const router = useRouter();

  useEffect(() => {
    
    const checkBlockedStatus = async () => {
      if (token) {
        try {
          const response = await axios.get(`http://localhost:5001/api/user/allUser/${userid}`);
          if (response.data.data.isBlocked) {
            console.log('responsesss',response.data.data.isBlocked);
            
          
            // localStorage.clear();
            router.push('/login');
          }
        } catch (error) {
          console.error('Error checking user status:', error);
        }
      }
    };

    const intervalId = setInterval(checkBlockedStatus, 2000); 

    return () => clearInterval(intervalId);
  }, [token, router]);
};

export default useCheckBlockedStatus;
