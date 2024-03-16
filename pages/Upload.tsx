"use client"
import React, { useState } from "react";
import Navbar from "./Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSession} from "next-auth/react";
import ApiCalendar from "react-google-calendar-api";

// Utility function to extract patterns from text
const extractPatterns = (text) => {
    const amountRegex = /Amount: \$\d+\.\d{2}/;
    const expiryDateRegex = /Expiry Date: \d{4}/;

    const amountMatch = text.match(amountRegex);
    const expiryDateMatch = text.match(expiryDateRegex);

    const extractedData = [];
    if (amountMatch) {
        extractedData.push(amountMatch[0]);
    }
    if (expiryDateMatch) {
        extractedData.push(expiryDateMatch[0]);
    }
    return extractedData;
};

const FileDropzone = ({ onFileChange,file }) => (
  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
  <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
          
            {file ? <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Selected File: {file.name}</p> : <>  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 1 MB)</p></>}
        </div>
        <input id="dropzone-file" type="file" accept=".pdf" onChange={onFileChange} className="hidden" />
    </label>
);

const Home = () => {
    const [file, setFile] = useState(null);
    const [content, setContent] = useState([]);
    const config = {
      clientId: "92350867177-ra25pdljeksmt7q8nn8h07m3qosleikr.apps.googleusercontent.com",
      apiKey: "AIzaSyBuR94bcmAhc085Jp_Qy4eTvr6sgRgOBLY",
      scope: "https://www.googleapis.com/auth/calendar",
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
      ],
    };
    const apiCalendar = new ApiCalendar(config);
    const { data: session } = useSession();
    const token = session?.accessToken;
    console.log("token",token)
    const useremail = session?.user?.email;
    console.log("session",session)
    console.log("useremail",useremail)
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const onUpload = async (e) => {
      e.preventDefault();    
      const formData = new FormData();
      formData.append('file', file);
  
      try {
          const { data } = await axios.post('http://localhost:5000/upload', formData);
          const extractedData = extractPatterns(data.content.join(' '));
          setContent(extractedData);
          alert(extractedData)
      } catch (error) {
          console.error('Error uploading PDF:', error);
      }
      sendCalendarInvite();
  };
  

  const sendCalendarInvite = async () => {
    const expiryDate = new Date("2024-03-18");
    const endDate = new Date(expiryDate);
    endDate.setHours(23, 59, 59); 
    const eventDetails = {
        summary: 'Payment Reminder',
        description: `You have a payment of 5000 due on 16th March.`,
        start: {
            dateTime: new Date().toISOString(), 
            timeZone: 'UTC',
        },
        end: {
            dateTime: endDate?.toISOString(), 
            timeZone: 'UTC',
        },
        attendees: [{ email: useremail }], 
    };
    if (apiCalendar.sign) { 
      apiCalendar.createEvent(eventDetails)
        .then(result => {
          console.log('Event created:', result);
        })
        .catch(error => {
          console.error('Error creating event:', error);
        });
    } else {
      apiCalendar.handleAuthClick();
    }
};


    return (
        <div className="min-h-screen">
            <Navbar />
             
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
      

          <img
            className="mx-auto h-16 w-auto"
            src="https://blogger.googleusercontent.com/img/a/AVvXsEhZJPipfeyNsdZI8CywAOgRlNn9nd30AlFuOcccs4IJxj_JfRUHxXap3KaGKfT7AlBry3Kn3QvIQzjOk78WPTxbINLWbaNLsT0deumPes4VYEXCYMkWlvCYJvYjPryn05qZeN4wtyY_Ufxqg3kn_lbmlTVymQ0iuvW9MtDq7Qn8TNfuIjk4t8d8KrPLQNg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Upload the Document data</h2>
         
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-400 mx-8 rounded-md py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
          <FileDropzone onFileChange={onFileChange} file={file} />

            <div className="flex justify-center">
            <button type="button" className="bg-blue-600 px-4 py-2 rounded-xl text-md text-white" onClick={onUpload}>Upload</button>

          </div>
          </form>
          <div>
                <h3>PDF Content:</h3>
                <ul>
                    {content.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
          <ToastContainer />
          
         </div>
        </div>
      </div>

        </div>
    );
}

export default Home;
