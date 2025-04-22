import { React, useState } from 'react';
import { motion, time } from "motion/react";
import Option1 from "/Option1.png";
// import Option2 from "/Option2.png";
// import Option3 from "/Option3.png";
// import Option4 from "/Option4.png";
import axios from "axios";
import ConfirmDetails from './ConfirmDetails';

const BookASession = () => {

  const details = [
    {name: "First Time Online Session", src: Option1, time: "1 hr"},
    {name: "Second Time Online Session", src: Option1, time: "1 hr"},
    {name: "First Time Offline Session", src: Option1, time: "45 min"},
    {name: "Second Time Offline Session", src: Option1, time: "45 min"},
  ]

  const [form, setForm] = useState(false);
  const [category, setCategory] = useState(null);

  const handleClick = async (selectedCategory) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_ROUTE}/auth/check`, {
            withCredentials: true
        });
        console.log("Recieved response");
        console.log(response);
        if(response.status === 200) {
            setForm(true);
            setCategory(selectedCategory);
        }
    } catch (error) {
        if(error.response?.status === 401) {
            console.log("User is not authenticated. Redirecting to login.");
            window.location.href = error.response?.data?.redirectTo || "/login";
        }
        console.log("User not authenticated", error);
    }
  }
    
  return (
    <div className='book-a-session-container h-[610px] w-full bg-[#fffbf0] flex justify-center items-center'>
        <div className="book-a-session-box h-5/6 w-4/5 rounded-md bg-[#002e5d] flex justify-center items-center font-display">
            <div className="booking-options h-full w-full p-3 rounded-md">
                <div className="booking-options-inner h-full w-full flex flex-col p-5 bg-[#f5f5dc] rounded-md relative">
                    {form ? (
                        <ConfirmDetails category={category} form={setForm}/>
                    )
                    :
                    (
                        <div className="options h-full w-full grid grid-cols-2 gap-5 *:border *:rounded-md *:px-5 *:py-3 *:bg-white">
                            {details.map((items,index) => (
                                <motion.div key={index} className="option-1 flex flex-col justify-between items-start relative overflow-hidden" whileHover={{scale: 1.03}}>
                                    <div className="time bg-blue-500 px-4 py-1 rounded-full text-white">{items.time}</div>
                                    <div className="content flex flex-col w-full gap-3">
                                        <h1>{items.name}</h1>
                                        <motion.div className="buttons w-full flex gap-5 *:cursor-pointer" initial={{x: -160}} whileHover={{x: 0, color: "#ffffff"}} transition={{duration: 0.2}}>
                                            <button className="bg-blue-400 w-1/4 py-2 rounded-md" onClick={(e) => handleClick(items.name)}>Book Now</button>
                                            <button className="bg-blue-400 w-1/4 py-2 rounded-md">Know More</button>
                                        </motion.div>
                                    </div>
                                    <motion.img src={items.src} alt="Doodle Image" className="absolute h-100 right-[-40px] bottom-[-110px] z-[0]" whileHover={{scale: 1.01}}/>
                                </motion.div>
                            ))}
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookASession;