import { React, useState, useContext } from 'react';
import { AuthContext } from './authContext.jsx';
import axios from "axios";
import Message from './Message.jsx';

const ConfirmDetails = ({category, form}) => {
    
   const { user } = useContext(AuthContext);
   const [meetingDetails, setMeetingDetails] = useState({
    name: "", email: `${user.email}`, category: `${category}`, timeSlot: "", date: ""
   });
  //  const [isBooked, setIsBooked] = useState(true);
   const [message, setMessage] = useState(null);

  const handleCancel = () => {
    form(false);
    console.log('Cancelled');
  };

  const handleChange = (e) => {
    setMeetingDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const checkDates = async (date, time) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_ROUTE}/check-dates`, {date: date, timeSlot: time}, {withCredentials: true});
        if(response.data.message === "Booked") {
            setMessage("Slot already booked");
            return false;
        }
        else {
            setMessage(null);
            return true;
        }
        console.log(response.data.message);
    } catch (error) {
        console.log("Error checking dates", error);
        return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const availability = await checkDates(meetingDetails.date, meetingDetails.timeSlot);
    if(availability) {
        console.log(meetingDetails);  
        try {
            await axios.post(`${import.meta.env.VITE_ROUTE}/send-email`, {from: `${user.email}`, subject: "Request to schedule a meeting with the below details", name: `${meetingDetails.name}`, category: `${category}`, timeSlot: `${meetingDetails.timeSlot}`, date: `${meetingDetails.date}`}, {withCredentials: true})
            .then(async () => {
                const meetingResponse = await axios.post(`${import.meta.env.VITE_ROUTE}/add-meeting`, {email: `${user.email}`, category: `${category}`, timeSlot: `${meetingDetails.timeSlot}`, date: `${meetingDetails.date}`}, {withCredentials: true});
                console.log(meetingResponse.data);
            })
            .catch((error) => {
                console.log("Error sending meeting data to backend", error);
            });
        } catch (error) {
            console.log("Error sending email", error);
        }
    }
  }

  return (
    <div className='confirm-details-section h-full w-full flex justify-center items-center'>
      <div className='p-10 rounded-xl w-3/4'>
        <h1 className='text-4xl font-bold mb-8 text-center text-blue-700'>Confirm Your Details</h1>
        
        <form className='w-full flex flex-col gap-5 font-display mb-3' onSubmit={(e) => handleSubmit(e)}>

          {/* User Details */}
          <div className="user-details grid grid-cols-2 gap-6">
            <div className="flex flex-col col-span-1">
              <label htmlFor="name" className='text-lg font-semibold'>Name</label>
              <input name='name' type="text" value={meetingDetails.name} placeholder="John Doe" className='bg-white px-4 py-3 text-gray-700 rounded-lg' onChange={handleChange} required/>
            </div>
            <div className="flex flex-col col-span-1">
              <label htmlFor="email" className='text-lg font-semibold'>Email</label>
              <input type="email" name="email" value={user.email} className='bg-gray-200 px-4 py-3 text-gray-700 rounded-lg cursor-not-allowed' disabled />
            </div>
          </div>

          {/* Category and Time Slot Selection */}
          <div className="type grid grid-cols-3 gap-6">
            <div className="flex flex-col col-span-1">
              <label htmlFor="category" className='text-lg font-semibold'>Category</label>
              <input type="text" name='category' value={category} className='bg-gray-200 px-4 py-3 text-gray-700 rounded-lg cursor-not-allowed' disabled />
            </div>
            <div className="flex flex-col col-span-1">
              <label htmlFor="timeSlot" className='text-lg font-semibold'>Time Slots</label>
              <select name='timeSlot' value={meetingDetails.timeSlot} className='px-4 py-3 rounded-lg bg-white' onChange={handleChange} required>
                <option value="">Select Time Slot</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
              </select>
            </div>
            <div className="date flex flex-col w-full col-span-1">
                <label htmlFor="date" className='text-lg font-semibold'>Date</label>
                <input name='date' type="date" value={meetingDetails.date} className='bg-white px-4 py-3 rounded-lg w-full' onChange={handleChange} required/>
            </div>
          </div>

          {/* Confirm and Cancel Buttons */}
          <div className="buttons flex gap-4 mt-8 justify-center *:cursor-pointer">
            <button type="submit" className='bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition'>Confirm</button>
            <button onClick={handleCancel} className='bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition'>Cancel</button>
          </div>
        </form>
      </div>
      {message === null ? " " : 
        <Message message={message} setMessage={setMessage} />
      }
    </div>
  );
};

export default ConfirmDetails;