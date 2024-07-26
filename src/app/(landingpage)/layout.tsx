"use client"
import React,{useEffect} from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
const router=useRouter()

  useEffect(()=>{
    const userId=localStorage.getItem("token");
    if(userId){
      return  router.push('/home');  
    }
   },[router])

    return (
      <main>
        <Header />
        
        {children}
        <Footer/>
      </main>
    );
  };
  
  export default HomePageLayout