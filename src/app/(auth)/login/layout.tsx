"use client"
import React,{useEffect} from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/login/header";
import { Toaster } from "@/components/ui/sonner"
const LoginPageLayout = ({ children }: { children: React.ReactNode }) => {
  const router=useRouter()
  useEffect(()=>{
    const userId=localStorage.getItem("token");
    if(userId){
      return  router.push('/home');  
    }
   },[router])
    return (
      <main>
        <Toaster />
        <Header />
        
        {children}
        
        
      </main>
    );
  };
  
  export default LoginPageLayout