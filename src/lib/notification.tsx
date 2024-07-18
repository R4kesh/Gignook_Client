
// import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001',{
  transports:['websocket']
}); // Adjust the URL to match your server's address

// useEffect(() => {
//     socket.on('notification', (data) => {
//       console.log(data); // Handle the notification data
//       // Update your UI based on the notification type
//     });
  
//     return () => {
//       socket.off('notification');
//     };
//   }, []);

  export default socket;




  
// import { useEffect } from 'react';
// import io from 'socket.io-client';

// const notification = () => {

  
// const socket = io('http://localhost:5001'); // Adjust the URL to match your server's address

// useEffect(() => {
//     socket.on('notification', (data) => {
//       console.log(data); // Handle the notification data
//       // Update your UI based on the notification type
//     });
  
//     return () => {
//       socket.off('notification');
//     };
//   }, []);

  
// }

// export default notification
