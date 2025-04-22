import React, { useEffect, useState, useContext } from 'react';
import MeetingBox from './MeetingBox';
import Sidebar from './Sidebar';
import axios from 'axios';
import { AuthContext } from './authContext.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';

const Sessions = () => {

  const [meetings, setMeetings] = useState([]);
  const [completedMeetings, setCompletedMeetings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getResponse = async () => {
      try {
        if(user.role === "admin") {
          const response = await axios.post(`${import.meta.env.VITE_ROUTE}/get-schedule`, {email: `${user.email}`, status: "Upcoming", role: `${user.role}`})
        }
        const response = await axios.post(`${import.meta.env.VITE_ROUTE}/get-schedule`, {email: `${user.email}`, status: "Upcoming", role: `${user.role}`}, { withCredentials: true });
        setMeetings(response.data.meetings);
        const response1 = await axios.post(`${import.meta.env.VITE_ROUTE}/get-schedule`, {email: `${user.email}`, status: "Completed", role: `${user.role}`}, { withCredentials: true });
        setCompletedMeetings(response1.data.meetings);
      } catch (error) {
        console.log("Error fetching meetings", error);
      }
    };
    getResponse();
  }, []);

  return (
    <div className='sessions-container flex h-[calc(100vh-160px)] bg-[#fffbf0]'>
      {/* Sidebar - Fixed with Sticky */}
      <div className="sidebar-container w-1/6 bg-[#2e4ba3] sticky top-0 h-full">
        <Sidebar/>
      </div>

      {/* Right Section - Scrollable */}
      <div className="upcoming-meetings h-full w-5/6 overflow-y-auto font-display px-10 py-5">
        <Routes>
          <Route path="/" element={<Navigate to="upcoming-sessions"/>}/>
          <Route path="upcoming-sessions" element={
            <>
              <h1 className='text-3xl font-bold text-[#2e4ba3]'>Upcoming Meetings</h1>
              {meetings.length > 0 ? (
                meetings.map((item, index) => (
                  <MeetingBox key={index} category={item.category} date={item.date.replace("T00:00:00.000Z", "")} time={item.timeSlot} user={user} />
                ))
              ) : (
                <p className='mt-5'>No meetings scheduled.</p>
              )}
            </>
          } />
          <Route path="completed-meetings" element={
              <>
                <h1 className='text-3xl font-bold text-green-500'>Completed Meetings</h1>
                {completedMeetings.length > 0 ? (
                  completedMeetings.map((item, index) => (
                    <MeetingBox key={index} category={item.category} date={item.date.replace("T00:00:00.000Z", "")} time={item.timeSlot} user={user} />
                  ))
                ) : (
                  <p className='mt-5'>No meetings completed</p>
                )}
              </>
            }/>
          <Route path="missed-meetings" element={<h1 className='text-3xl font-bold text-red-500'>Missed Meetings</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default Sessions;