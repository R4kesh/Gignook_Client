"use client";
import React, { useState, useEffect,useRef,ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userDetails';
import { useEdgeStore } from '@/lib/edgestore';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { categories } from '@/lib/categories';
import { Progress } from "@/components/ui/progress"
import Image from 'next/image';

interface User {
  _id: string;
  firstname: string;
  displayName:string;
  lastname: string;
  languages:string[];
  email: string;
  skills:string[]
  phoneNumber: string;
  isVerified: boolean;
  isBlocked: boolean;
  description:string
  service:string[]
  personalWebsite:string
  education:string[]
}

const initialUserState: User = {
  _id: '',
  firstname: '',
  displayName: '',
  lastname: '',
  languages: [],
  email: '',
  skills: [],
  phoneNumber: '',
  isVerified: false,
  isBlocked: false,
  description: '',
  service: [],
  personalWebsite: '',
  education: [],
};

interface Work {
  project_name: string;
  description: string;
  link: string;
  cost: number;
  category: string;
  images: File | null;
  title:string;
}


const Profile:React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const userId = useUserStore((state) => state.userid);
  const profileImage = useUserStore((state) => state.profileImage);
  const setProfileImage = useUserStore((state) => state.setProfileImage);
  const [userData, setUserData] = useState<User>(initialUserState);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User>(initialUserState);
  const { edgestore } = useEdgeStore();
  const router=useRouter()

  const [progresses, setProgress] =useState(0)
  const [showProgress, setShowProgress] = useState(false);
  const [works, setWorks] = useState<Work[]>([]);
  const [token,setToken]=useState<string | null>(null)


  useEffect(()=>{
    if (typeof window !== 'undefined') {

      setToken(localStorage.getItem('token'))
     }
    const timer = setTimeout(() => setProgress(1), 500)
    return () => clearTimeout(timer)
  },[])


  useEffect(() => {
 
    const fetchUserData = async () => {
      try {
        if (typeof window !== 'undefined') {
        const userId = localStorage.getItem('userid'); 
        if (userId) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/profile/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

          setUserData(response.data.result);
          setFormData(response.data.result);
          
        }
      }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }
  }, [setProfileImage]);



  useEffect(() => {
    // Fetch work data
    const fetchWorkData = async () => {
      try {
        if (typeof window !== 'undefined') {
        const userId = localStorage.getItem('userid');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/workList/${userId}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });;
        setWorks(response.data);
      }
      } catch (error) {
        console.error('Error fetching work data:', error);
      }
    };

    fetchWorkData();
  }, [userId,token]);




  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userid');
      
      
      if (userId) {
        const response =await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/profile/edit/${userId}`, formData,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });;
        
        setUserData(formData);
        setEditMode(false);
        localStorage.removeItem('newprofileImage'); 
        localStorage.setItem('newprofileImage',response.data.result.profilePicture)
        router.push('/freelancer/profile')
      }
    }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleUpload = async () => {
    if (file) {
      try {

        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            console.log('progress', progress);
            setShowProgress(true);
            setProgress(progress)
          },
        });

        if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userid');


        const data = {
          userId: userId,
          imageUrl: res.url,
        };
      
        
        

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/uploadImage`,data,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });;

        const newProfileImage = response.data.uploadUrl.profilePicture;
        localStorage.removeItem('newprofileImage');
        localStorage.setItem("newprofileImage", newProfileImage);
        setProfileImage(newProfileImage);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };



  const [formDatas, setFormDatas] = useState({
    project_name: '',
    description: '',
    link: '',
    cost: 0,
    category: ''
  });
  
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [postId,setPostId]=useState('')
  // 
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const handleUploads = async () => {
    if (selectedFile.length>0) {
     
     
     
      const formData = new FormData();
      selectedFile.forEach((file) => {
        formData.append("files", file);
      });
      
      
      setFileUploaded(true);
      
      try {
    if (typeof window !== 'undefined') {

        const userid=localStorage.getItem("userid")
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/postWork/${userid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': `Bearer ${token}`
            },
          }
        );
        if(response.data.success){
          console.log('dataz',response.data.datas);
     
          setSelectedFile([]);
          setPostId(response.data.datas._id)
          
        }
       
      }
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files!==null) {
      setSelectedFile(Array.from(files));
    }else{
      setSelectedFile([])
    }
  };
  


  const handleChange = (e:any) => {
    const { name, value } = e.target;
    console.log('name', name, 'value', value);
    
    setFormDatas({
      ...formDatas,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userid');
      
      
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/postWorkDatas/${userId}/${postId}`, formDatas, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      if(response.data.success){
        router.replace('/freelancer/profile');
      }
    }
    } catch (error) {
      console.error('Error while submitting data:', error);
    }
  };




  return (
    <div className="bg-gray-100">
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-green-400 flex flex-col items-center text-center">
              <div className="image overflow-hidden mb-3 flex flex-col items-center">


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
            // src={userData.profilePicture || '/default-profile-pic.jpg'}
            src={profileImage || '/default-profile-pic.jpg'}

            alt='profile'
            width={100}
                  height={100}
            className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
            onClick={() => fileRef.current?.click()}
            />
            {showProgress && (
        <Progress value={progresses} className="w-[100%] px-4 py-2 mt-4" />
      )}
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Upload
          </button>


              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{userData.firstname} {userData.lastname}</h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">{userData.email || "Email"}</h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {userData.description || "(Description)"}
              </p>
            </div>
            <div className="my-4"></div>
          </div>

          <div className="w-full md:w-12/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m2 0a2 2 0 002-2V8a2 2 0 00-2-2h-3.586a1 1 0 01-.707-.293l-1.414-1.414a1 1 0 00-.707-.293H9a2 2 0 00-2 2v4a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Display Name</div>
                    <div className="px-4 py-2">
                      {editMode ? (
                        <input
                          type="text"
                          name="displayName"
                          value={formData.displayName || ""}
                          onChange={handleInputChange}
                          className="w-full bg-gray-200 p-2 rounded"
                        />
                      ) : (
                        userData.displayName || "User"
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Description</div>
                    <div className="px-4 py-2">
                      {editMode ? (
                        <textarea
                          name="description"
                          value={formData.description || ""}
                          onChange={handleInputChange}
                          className="w-full bg-gray-200 p-2 rounded"
                        />
                      ) : (
                        userData.description || "No description available"
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Languages</div>
                    <div className="px-4 py-2">
                      {editMode ? (
                        <input
                          type="text"
                          name="languages"
                          value={formData.languages ? formData.languages.join(', ') : ""}
                          onChange={(e) => handleInputChange({ target: { name: 'languages', value: e.target.value.split(', ') } })}
                          className="w-full bg-gray-200 p-2 rounded"
                        />
                      ) : (
                        userData.languages ? userData.languages.join(', ') : "No languages available"
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Skills</div>
                    <div className="px-4 py-2">
                      {editMode ? (
                        <input
                          type="text"
                          name="skills"
                          value={formData.skills ? formData.skills.join(', ') : ""}
                          onChange={(e) => handleInputChange({ target: { name: 'skills', value: e.target.value.split(', ') } })}
                          className="w-full bg-gray-200 p-2 rounded"
                        />
                      ) : (
                        userData.skills ? userData.skills.join(', ') : "No skills available"
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Services</div>
                    <div className="px-4 py-2">
                      {editMode ? (
                        <input
                          type="text"
                          name="services"
                          value={formData.service ? formData.service.join(', ') : ""}
                          onChange={(e) => handleInputChange({ target: { name: 'services', value: e.target.value.split(', ') } })}
                          className="w-full bg-gray-200 p-2 rounded"
                        />
                      ) : (
                        userData.service ? userData.service.join(', ') : "No services available"
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Phone number</div>
                    <div className="px-4 py-2">
                      {editMode ? (
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber || ""}
                          onChange={handleInputChange}
                          className="w-full bg-gray-200 p-2 rounded"
                        />
                      ) : (
                        userData.phoneNumber || "No phone number available"
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Personal website</div>
                    <div className="px-4 py-2">
                      {editMode ? (
                        <input
                          type="text"
                          name="personalWebsite"
                          value={formData.personalWebsite || ""}
                          onChange={handleInputChange}
                          className="w-full bg-gray-200 p-2 rounded"
                        />
                      ) : (
                        <a className="text-blue-800" href={userData.personalWebsite || "#"}>
                          {userData.personalWebsite || "No website available"}
                        </a>

                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Education</div>
                    <div className="px-4 py-2">
                      {editMode ? (
                        <input
                          type="text"
                          name="education"
                          value={formData.education || ""}
                          onChange={handleInputChange}
                          className="w-full bg-gray-200 p-2 rounded"
                        />
                      ) : (
                        userData.education || "No education details available"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="block w-full text-blue-800 bg-slate-100 text-sm font-semibold rounded-lg hover:bg-gray-200 focus:outline focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                onClick={() => {
                  if (editMode) {
                    handleSave();
                  } else {
                    setEditMode(true);
                  }
                }}
              >
                {editMode ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>
          </div>
{/* Add work */}
<div className="w-full container mx-auto my-5 p-5">
          <div className=" w-full">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                
                <span className="tracking-wide">Works</span>
                {/* className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 mb-4">Add Work */}
              </div>
  
              
              <Sheet>
      <SheetTrigger asChild>
        <Button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-gray-200 hover:shadow-xs p-3 mb-4" variant="outline">
          Add work
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold mb-2">Add Work</SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            Add your work details correctly so users can find you easily.
          </SheetDescription>
        </SheetHeader>
       

          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <label htmlFor="fileUpload" className="text-right sm:col-span-1">
              Upload File:
            </label>
            <input
              id="pdfUpload"
              type="file"
              multiple
              accept='/jpeg/jpg/png/pdf'
              onChange={handleFileChange}
              className="col-span-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button onClick={handleUploads} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
              Upload
            </button>
          </div>

          {fileUploaded && (
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid gap-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <label htmlFor="project_name" className="text-right sm:col-span-1">
                Project Name:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter project name"
                className="col-span-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right sm:col-span-1">
                Description:
              </label>
              <input
                type="text"
                name="description"
                id="description"
                onChange={handleChange}
                placeholder="Description about project"
                className="col-span-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <label htmlFor="link" className="text-right sm:col-span-1">
                Link:
              </label>
              <input
                type="text"
                name="link"
                id="link"
                onChange={handleChange}
                placeholder="Project link"
                className="col-span-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <label htmlFor="Cost" className="text-right sm:col-span-1">
                Cost:
              </label>
              <input
                name="cost"
                type="number"
                min={0}
                id="Cost"
                onChange={handleChange}
                placeholder="Project cost"
                className="col-span-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right sm:col-span-1">
                Category:
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="col-span-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
              Save
            </button>
          </form>
        )}
      </SheetContent>
    </Sheet>
    
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {works.map((work, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-md">
                    {typeof work.images === 'string' && (
  <Image
    width={75}
    height={75}
    src={work.images}
    alt={work.title}
    className="w-full h-40 object-cover mb-2 rounded-md"
  />
)}
                    <h3 className="text-lg font-semibold mb-2">{work.title}</h3>
                    <p className="text-gray-600 mb-1">{work.description}</p>
                    <p className="text-gray-500 text-xs"> ₹{work.cost}</p>
                    <p className="text-gray-700">{work.link}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

 {/* Modal for adding work */}



        </div>
      </div>
    

  )}
  export default Profile ;