
// import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`,{
  transports:['websocket']
}); // Adjust the URL to match your server's address



  export default socket;




 