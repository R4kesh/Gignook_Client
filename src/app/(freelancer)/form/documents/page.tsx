"use client"
import Navbar from '@/components/home/navbar'
import React, { useEffect, useRef,ChangeEvent,useState } from 'react'
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userDetails';
import { useEdgeStore } from '@/lib/edgestore';
import { toast } from "sonner"
import axios from 'axios';
import Image from 'next/image';

const Document = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const profileImage = useUserStore((state) => state.profileImage);
  const setProfileImage = useUserStore((state) => state.setProfileImage);
  const userId = useUserStore((state) => state.userid);

  const [selectedFile, setSelectedFile] = useState<File[]>([]);

   
  const { edgestore } = useEdgeStore();


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProfileImage = localStorage.getItem("profileImage");
      if (storedProfileImage) {
        setProfileImage(storedProfileImage);
      }
    }
  }, [setProfileImage]);

  const handleUploads = async () => {
    if (typeof window !== 'undefined') {
      const userid = localStorage.getItem('userid');
      const token = localStorage.getItem('token');
  
    if (file && userid && token) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            console.log('progress', progress);
          },
        });

        const data = {
          userId: userid,
          imageUrl: res.url,
        };
       
        
       
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/uploadImage`,
          data
          ,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });

        const newProfileImage = response.data.uploadUrl.profilePicture;
        if (typeof window !== 'undefined') {
        localStorage.setItem("newprofileImage", newProfileImage);
        setProfileImage(newProfileImage);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }
  };

  const handleUpload = async () => {
    if (selectedFile.length>0) {
     
     
     
      const formData = new FormData();
      selectedFile.forEach((file) => {
        formData.append("files", file);
      });

      // formData.append("file", selectedFile);
      try {
        if (typeof window !== 'undefined') {
          const userid = localStorage.getItem('userid');
          const token = localStorage.getItem('token');
          if (userid && token) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/uploadFile/${userid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': `Bearer ${token}`
            },
          }
        );

        setSelectedFile([]);

        if (response) {
         
          toast.success("File upload successfully",{
            position:"top-center"
          })
          router.push('/home')
        }
        setSelectedFile([]);
      }
      }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files!==null) {
      setSelectedFile(Array.from(files));
    }else{
      setSelectedFile([])
    }
  };

  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-4">
          <span className="text-gray-700">Home</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Complete personal & professional info</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Submit document</span>
        </div>
        <div className="flex justify-end mb-4">
          <button onClick={() => router.push('/home')} className="bg-white text-black px-4 py-2 rounded border border-gray-300 shadow-inner">
            Exit
          </button>
        </div>

        {/* Profile */}
        <div>
          <label htmlFor="profilePicture" className="block text-gray-700 font-bold mb-2">
            Profile Picture
          </label>

          <input
            type="file"
            id="image"
            className="bg-slate-100 rounded-lg py-3 px-3 hidden"
            ref={fileRef}
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
            }}
          />

          <Image
            width={400}
            height={400}
      
            src={profileImage || '/default-profile-pic.jpg'}
            alt='profile'
            className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
            onClick={() => fileRef.current?.click()}
          />

          <button onClick={handleUploads} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Upload
          </button>
        </div>

        {/* Certifications */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Submit Your ID and Certificates</label>
          <div className="description">
      Please provide your valid identification documents and certificates for verification. This information helps us ensure the authenticity for as a freelancer.
    </div>
          <div className="flex flex-col">
          <input
              type="file"
              name="pdfUpload"
              id="pdfUpload"
              className="border rounded p-2 text-black"
              onChange={handleFileChange}
              multiple
              accept='/jpeg/jpg/png/pdf'
              
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleUpload}>
              Add
            </button>
           
          </div>

        </div>
      </div>
    </div>
  )
}

export default Document;
