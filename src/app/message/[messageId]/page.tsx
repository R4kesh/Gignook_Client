"use client";
import { useState, useEffect, useRef } from "react";
import { io, Socket } from 'socket.io-client';
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Input from "@/components/input/input";
import { Attachement } from "@/components/chat/AttachementUpload";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { ImagePreview } from "@/components/chat/imagePreView";


interface User {
  _id: number;
  firstname: string;
  email: string;
  fullName:string
  profilePicture:string
}


interface Message {
  user: { id: string,email:any,fullname:any };
  message: string;
  createdAt:any
}

interface MessagesState {
  messages: Message[];
  receiver?: any;
  conversationId?: string;
  time:any
}

interface Conversation {
  conversationId: string;
  user: User;
}

interface UserItem {
  userId: string;
  user: User;
}


export default function Chat() {
  const router = useRouter();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessagesState>({ messages: [],time:null });
  const [users, setUsers] = useState<UserItem[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  const [socket, setSocket] = useState<Socket | null>(null);
  const set = localStorage.getItem('userid');
const id=localStorage.getItem('userid')
  const token = localStorage.getItem('token');
  const firstname=localStorage.getItem('name')
  const [uid,setId]=useState<string|null>()
  const image=localStorage.getItem('profileImage')
  // const [conversationId,setConversationId]=useState("new")
  const email=localStorage.getItem('email')
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socketInstance = io(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    setSocket(socketInstance);
    setId(id)
  }, [id]);

  const handleVideoCallClick = () => {
    router.push("/room");
  };


  useEffect(() => {
    socket?.emit('addUser', id);
    socket?.on('getUsers', users => {
      console.log('activeUsers :>> ', users);
    });
    socket?.on('getMessage', data => {
      setMessages(prev => ({
        ...prev,
        messages: [...prev.messages, { user: data.user, message: data.message,createdAt:data.createdAt }]
      }));
    });
  }, [socket,id]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.messages]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userid')
    const fetchConversations = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/conversations/${loggedInUser}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('messageconver',res.data);
      
      setConversations(res.data)
    }
    fetchConversations()
  }, [message,token])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('conv',res.data);
      
      
      setUsers(res.data)
    }
    fetchUsers()
  }, [id,token])

  const fetchMessages = async (conversationId:any, receiver:any) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/message/${conversationId}?senderId=${id}&&receiverId=${receiver?.receiverId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('frtch',res.data);
    
    
    setMessages({ messages: res.data, receiver, conversationId,time: res.data.createdAt })
    console.log('messz',messages,'conver',conversationId);
  
  }

  const sendMessage = async () => {
   
    setMessage('');
    
    socket?.emit('sendMessage', {
      senderId: id,
      receiverId: messages?.receiver?.receiverId,
      message,
      conversationId: messages?.conversationId,
      timestamp: new Date().toISOString(),
    });
   const res= await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/message`, {
      conversationId: messages?.conversationId,
      senderId: id,
      message,
      receiverId: messages?.receiver?.receiverId,
      timestamp: new Date().toISOString(),
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      
    });

    console.log('res',res.data);
    // if(res.data.conversationId!=="new"){
    //   setConversationId(res.data.conversationId)
    // }

    if(messages.conversationId === "new") {
      setMessages((prev: any) => ({
        ...prev,
        conversationId: res.data.conversationId,
        messages: [...prev.messages]
      }));
    }
    
    
  }

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    router.push("/");
  };

 
  
  

  return (
    <div className='w-screen flex'>
      <div className='w-1/4 h-screen bg-secondary overflow-scroll'>
        <div className='flex items-center my-8 mx-14'>
          <div>
            
            <Image
      src={image!}
      width={75}
      height={75}
      alt="Picture of the author"
      className='border border-primary p-1 rounded-full' 
    />
          </div>
          <div className='ml-8'>
            <h3 className='text-2xl'>{firstname}</h3>
            <p className='text-lg font-light'>My Account</p>
          </div>
        </div>
        <hr />
        <div className='mx-14 mt-10'>
          <div className='text-primary text-lg'>Messages</div>
          <div>
            {conversations.length > 0 ? conversations.sort((a: any, b: any) => {
                    if (!a.lastMessagedTime) return 1;
                    if (!b.lastMessagedTime) return -1;
                    return (
                      new Date(b.lastMessagedTime).getTime() -
                      new Date(a.lastMessagedTime).getTime()
                    );
                  }).map(({ conversationId, user }) => {
              return (
              <div key={conversationId} 
              className={`flex items-center py-8 border-b border-b-slate-950-300 ${selectedConversationId === conversationId ? 'bg-blue-200' : ''}`}>
                <div className='cursor-pointer flex items-center' onClick={() =>{setSelectedConversationId(conversationId); fetchMessages(conversationId, user)}}>
                  <div><Image  width={75}
      height={75} src={user.profilePicture} alt="" className="w-15 h-15 rounded-full p-1 border border-primary" /></div>
                  <div className='ml-6'>
                    
                    <h3 className='text-lg font-semibold'>{user.firstname}</h3>
                    
                    <p className='text-sm font-light text-gray-600'>{user.email}</p>
                  </div>
                </div>
              </div>
              )
}) : <div className='text-center text-lg font-semibold mt-24'>No Conversations</div>}
          </div>
        </div>
      </div>
      <div className='w-1/2 h-screen bg-white flex flex-col items-center'>
        {messages?.receiver && 
          <div className='w-3/4 bg-secondary h-20 my-14 rounded-full flex items-center px-14 py-2'>
            <div className='cursor-pointer'><Image src={messages?.receiver?.profilePicture} alt="" width={60} height={60} className="rounded-full" /></div>
            <div className='ml-6 mr-auto'>
             {/* ///////////////////////////////////////////// */}
          
              <h3 className='text-lg'>{messages?.receiver?.fullName}</h3>
              <p className='text-sm font-light text-gray-600'>{messages?.receiver?.email}</p>
             
            </div>
            <button
     
      color="primary"
     
      onClick={handleVideoCallClick}
    >
     <VideoCallIcon />
    </button>
            <div className='cursor-pointer'>
             
            </div>
          </div>
        }
        <div className='h-3/4 w-full overflow-scroll shadow-sm'>
          <div className='p-14'>
            
          {messages?.messages?.length > 0 ? messages.messages.map((message, index) => {
    let date: Date;

    if (typeof message.createdAt === "string") {
        date = new Date(message.createdAt);
    } else if (message.createdAt instanceof Date) {
        date = message.createdAt;
    } else {
        date = new Date();
    }

    let formattedTime = "";
    if (!isNaN(date.getTime())) {
        formattedTime = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let isImage;
    if (
      message.message.endsWith(".png") ||
      message.message.endsWith(".jpg") ||
      message.message.endsWith(".jpeg") ||
      message.message.endsWith(".pdf")
    ) {
      isImage = message.message;
    }


             return (
              
              
              <div key={index} className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${id === message.user.id ? 'bg-blue-500 text-white rounded-tl-xl ml-auto' : 'bg-gray-300 text-black rounded-tr-xl'} `}>


              {/* {message.message} */}
              {isImage ? (
                        <ImagePreview previewImage={message.message}/>
                        
                      ) : (
                        message.message
                      )}


              <p className="text-black text-xs pl-28 text-left">
                        {formattedTime}
                      </p>
            </div>
)
}) : <div className='text-center text-lg font-semibold mt-24'>No Messages or No Conversation Selected</div>}
              <div ref={messageRef}></div>
              
            

          </div>
        </div>
        {messages && 
          <div className='p-14 w-full flex items-center'>

          <Input placeholder='Type a message...' value={message} onChange={(e) => setMessage(e.target.value)} className='w-[75%]' inputClassName='p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />


          <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`} onClick={sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="10" y1="14" x2="21" y2="3" />
              <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
          </div>
          <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="12" y1="9" x2="12" y2="15" />
            </svg> */}
            
          </div>
          <Attachement conversationId={messages.conversationId} receiver={messages?.receiver?.receiverId}    />
        </div>
        }
      </div>
      <div className='w-1/4 h-screen bg-light px-8 py-16 overflow-scroll'>
        <div className='text-primary text-lg'>Freelancers</div>
        <div>
          {users.length > 0 ? users.map(({ userId, user }) => (
            <div key={userId} className='flex items-center py-8 border-b border-b-gray-300'>
              <div className='cursor-pointer flex items-center' onClick={() => fetchMessages("new", user)}>
                <div><Image  width={75}
      height={75} src={user.profilePicture} alt="" className="w-15 h-15 rounded-full p-1 border border-primary" /></div>
                <div className='ml-6'>
                  <h3 className='text-lg font-semibold'>{user?.fullName}</h3>
                  <p className='text-sm font-light text-gray-600'>{user?.email}</p>
                  
                </div>
              </div>
            </div>
          )) : <div className='text-center text-lg font-semibold mt-24'>No Conversations</div>}
        </div>
      </div>
    </div>
  );
}