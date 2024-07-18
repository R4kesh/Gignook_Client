"use client"
import Navbar from '@/components/home/navbar';
import React,{useState} from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userDetails';
import axios from 'axios'


interface FormData {
  [key: string]: string | undefined; 
}

const FreelancerApplicationForm = () => {
  const router=useRouter()
  const userEmail = useUserStore((state) => state.email);
  const firstname = useUserStore((state) => state.firstName);
  const lastname = useUserStore((state) => state.lastName); 
  const token = localStorage.getItem('token');
  const [formData,setFormData]=useState<FormData>({
    email:userEmail
  })
  const [errorMessage, setErrorMessage]=useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [id]: value
    }));
};


  const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    try {
      const res=await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/details`,formData,{
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data=res.data
      if(data.success){
        console.log("Personal details updated..redirect to document updation page");
        router.push('/form/documents');
        
      }else {
        console.log("updation error", data.message);
        return
      }

      
    } catch (error:any) {
      console.log("error axios",error);
      if (error.response) {
				if (error.response.status === 401) {
					setErrorMessage(error.response.data.message);
				} else {
					setErrorMessage(error.response.data.message);
				}
			} else if (error.request) {
				setErrorMessage(error.response.data.message);
			} else {
				setErrorMessage(error.response.data.message);
			}
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);
    }
  }



  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar/>
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center mb-4">
          <span className="text-gray-700">Home</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Complete personal & professional info</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Submit document</span>

        </div>

        {/* Exit Button */}
        <div className="flex justify-end mb-4">
        <button onClick={() => router.push('/home')} className="bg-white text-black px-4 py-2 rounded border border-gray-300 shadow-inner">
  Exit
</button>
        </div>

        <span className="text-red-500 text-sm mb-6">* Indicates required fields</span>


        {/* Personal Info Heading */}
        <h2 className="text-2xl font-bold mb-4">Personal Info</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex">
  <div className="flex-1 mr-2">
    <label htmlFor="firstname" className="block text-gray-700 font-bold mb-2">
      First Name
    </label>
    <input
      type="text"
      id="firstname"
      defaultValue={firstname}
      readOnly
      
      className="w-full border border-gray-100 p-1 rounded"
      placeholder='Enter your First Name'
    />
  </div>
  <div className="flex-1 mr-2">
    <label htmlFor="lastname" className="block text-gray-700 font-bold mb-2">
      Last Name
    </label>
    <input
      type="text"
      id="lastname"
      readOnly
      
      defaultValue={lastname}
      className="w-full border border-gray-100 p-1 rounded"
      placeholder='Enter your Last Name'
    />
  </div>
</div>


            {/* Display Name */}
            <div>
              <label htmlFor="displayName" className="block text-gray-700 font-bold mb-2">
                Display Name <span className="text-red-500 text-sm mb-6">*</span>
              </label>
              <input
                type="text"
                id="displayName"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder='Enter your Display name'
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder='Type Your display name'
              ></textarea>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Languages <span className="text-red-500 text-sm mb-6">*</span></label>
              
              <div className="flex flex-col">
                <input
                  type="text"
                  id="language1"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded mb-2"
                  placeholder="Language 1"
                />
                <input
                  type="text"
                  id="language2"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Language 2"
                />
              </div>
            </div>

            {/* Your Occupation */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Your Occupation</label>

              
                <input
                  type="text"
                  id="occupation"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Occupation"
                />
            
            </div>

            {/* Service Category */}
            <div>
    <label className="block text-gray-700 font-bold mb-2">Service Category <span className="text-red-500 text-sm mb-6">*</span></label>
    
    <div className="flex flex-col">
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                id="Print"
                onChange={handleChange}
                name="print"
                className="mr-2"
            />
            <label htmlFor="3dPrint" className="text-gray-700">
                3D Print
            </label>
        </div>
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                id="animation"
                onChange={handleChange}
                name="serviceCategory"
                className="mr-2"
            />
            <label htmlFor="animation" className="text-gray-700">
                Animation
            </label>
        </div>
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                id="webDevelopment"
                onChange={handleChange}
                name="serviceCategory"
                className="mr-2"
            />
            <label htmlFor="webDevelopment" className="text-gray-700">
                Web Development
            </label>
        </div>
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                id="articleVideo"
                onChange={handleChange}
                name="serviceCategory"
                className="mr-2"
            />
            <label htmlFor="articleVideo" className="text-gray-700">
                Article/Video
            </label>
        </div>
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                id="Music"
                onChange={handleChange}
                name="serviceCategory"
                className="mr-2"
            />
            <label htmlFor="articleVideo" className="text-gray-700">
                Music
            </label>
        </div>
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                id="Voice"
                onChange={handleChange}
                name="serviceCategory"
                className="mr-2"
            />
            <label htmlFor="Voice" className="text-gray-700">
                Voice Over
            </label>
        </div>
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                id="Digital Marketing"
                onChange={handleChange}
                name="serviceCategory"
                className="mr-2"
            />
            <label htmlFor="Voice" className="text-gray-700">
            Digital Marketing
            </label>
        </div>
    </div>
</div>


            {/* Skills */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Skills <span className="text-red-500 text-sm mb-6">*</span></label>
              
              <div className="flex flex-col">
                <input
                  type="text"
                  id="skill1"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded mb-2"
                  placeholder="Skill1"
                />
                <input
                  type="text"
                  id="skill2"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Skill2"
                />
              </div>
            </div>

            {/* Education */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Education <span className="text-red-500 text-sm mb-6">*</span></label>
              
              <div className="flex flex-col">
                <input
                  type="text"
                  id="education1"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded mb-2"
                  placeholder="Education 1"
                />
                <input
                  type="text"
                  id="education1"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Education 2"
                />
              </div>
            </div>

            {/* Personal Website */}
            <div>
              <label htmlFor="personalWebsite" className="block text-gray-700 font-bold mb-2">
                Personal Website
              </label><h6>Include a link to your personal website or portfolio with your work samples.</h6>
              <input
                type="text"
                onChange={handleChange}
                id="personalWebsite"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder='Enter your personal Website link'
                />
                
            </div>

            {/* Accunt Security */}
            <div>
            <label htmlFor="personalWebsite" className= "block text-gray-700 font-bold mb-2">
                Account Security <span className="text-red-500 text-sm mb-6">*</span>
            </label>
            <h6>Please add phone number so that we can keep your account secured.</h6>
            
            <input
                type="number"
                id="phoneNumber"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder='Enter your phone number'
                />
            </div>
            </div>
            <div className="flex justify-center mt-10">
            {errorMessage && (
						<div className="text-red-500 mt-4">
							{errorMessage}
						</div>
					)}
          </div>
            <div className="flex justify-center mt-10">
           
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Submit
  </button>
</div>

            

            </form> 
            </div>
            </div>  
  )
} 
export default FreelancerApplicationForm ;