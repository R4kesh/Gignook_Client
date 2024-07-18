"use client"
import Navbar from '@/components/home/navbar';
import React, { useState,ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { toast } from "sonner"


interface ProjectData {
  title: string;
  description: string;
  category: string;
  budget: any;
  isBudgetFlexible: boolean;
  date: string;
}

const Post = () => {
  const router=useRouter()
  const userid=localStorage.getItem("userid")
  const [errors, setErrors] = useState<Partial<ProjectData>>({});
  const [warning, setWarning] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [postId,setPostId]=useState('')
  const [fileUploaded, setFileUploaded] = useState(false);
  const token = localStorage.getItem('token');
  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    description: '',
    category: '',
    budget: 0,
    isBudgetFlexible: false,
    date: '',
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const validTypes = ['image/jpeg', 'image/jpg'];
    
    if (files) {
      const isValid = Array.from(files).every(file => validTypes.includes(file.type));

      if (isValid) {
        setSelectedFile(Array.from(files));
        setWarning('');
      } else {
        setSelectedFile([]);
        setWarning('Only JPEG and JPG files are allowed.');
      }
    } else {
      setSelectedFile([]);
      setWarning('');
    }
  };

  const handleUpload = async () => {
    if (selectedFile.length>0) {
     
     
     
      const formData = new FormData();
      selectedFile.forEach((file) => {
        formData.append("files", file);
      });
      
      
      setFileUploaded(true);
      
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/postFile/${userid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': `Bearer ${token}`
            },
          }
        );
        if(response.data.success){
          
     
          setSelectedFile([]);
          setPostId(response.data.datas._id)
          
        }
       
        
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;

    const isCheckbox = (target: EventTarget): target is HTMLInputElement => {
      return (target as HTMLInputElement).checked !== undefined;
    };


    setProjectData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? isCheckbox : value,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<ProjectData> = {};

    if (!projectData.title) newErrors.title = 'Title is required';
    if (!projectData.description) newErrors.description = 'Description is required';
    if (!projectData.category) newErrors.category = 'Category is required';
    if (projectData.budget <= 0) newErrors.budget = 'Budget must be greater than zero';
    if (!projectData.date) newErrors.date = 'Date is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    if (!validateForm()) {
      return;
    }
    try {
     const response= await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/postDatas/${userid}/${postId}`, projectData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      toast.success("post uploaded succesfully",{
        position:"top-center",
        
      })

      if(response.data.datas){
        console.log(response.data.datas);
        router.push('/home')
      }
      

    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Left Side */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-4">Let the post begin...</h2>
          <p>This post will help you find the best freelancers.</p>
          <img
            src="https://lemon.io/wp-content/uploads/2020/03/pic-landing-best-freelance-platf-hero@3x.jpg"
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="flex-1 bg-blue-100 p-8">
          <div className="mb-4">
            <p>Add media</p>
            {/* <input
              type="file"
              name="pdfUpload"
              id="pdfUpload"
              className="border rounded p-2 text-black"
              onChange={handleFileChange}
              multiple
              accept='/jpeg/jpg'
              
            /> */}
            <Input id="pdfUpload" type="file"  name="pdfUpload"
            className="border rounded p-2 text-black"
            onChange={handleFileChange}
            multiple
            accept='/jpeg/jpg'
            />
              {warning && <p className="text-red-500">{warning}</p>}
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
              Upload
            </button>
          </div>

          {fileUploaded && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <p>Give your project brief a title</p>
                <input
                  type="text"
                  name="title"
                  value={projectData.title}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Project title"
                />
                 {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>
              <div className="mb-4">
                <p>Where are you looking to get done?</p>
                <textarea
                  name="description"
                  value={projectData.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Project description"
                ></textarea>
                {errors.description && <p className="text-red-500">{errors.description}</p>}
              </div>
              <div className="mb-4">
                <p>Which category best fits your project?</p>
                <select
                  name="category"
                  value={projectData.category}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                >
                  {/* Options for categories */}
                  <option value="">Select a category</option>
                  <option value="webDevelopment">Web Development</option>
                  <option value="graphicDesign">Graphic Design</option>
                  <option value="contentWriting">Content Writing</option>
                  <option value="Video">Video</option>
                  <option value="Writing">Writing</option>
                  <option value="DigitalMarketing">Digital Marketing</option>
                  <option value="Voice">Voice Over</option>


                </select>
                {errors.category && <p className="text-red-500">{errors.category}</p>}
              </div>
              <div className="mb-4">
                <p>I'm looking to spend...</p>
                <input
                  type="number"
                  name="budget"
                  value={projectData.budget}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.budget && <p className="text-red-500">{errors.budget}</p>}
              </div>
              <div className="mb-4">
                <label>
                  <input
                    type="checkbox"
                    name="isBudgetFlexible"
                    checked={projectData.isBudgetFlexible}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Budget is flexible
                </label>
              </div>
              <div className="mb-4">
                <p>Select a date</p>
                <input
                  type="date"
                  name="date"
                  value={projectData.date}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.date && <p className="text-red-500">{errors.date}</p>}
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Submit</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
