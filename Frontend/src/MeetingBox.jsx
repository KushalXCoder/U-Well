import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import axios from 'axios';

const MeetingBox = ({ category, date, time, user }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const currentDateTime = new Date();
    const meetingDateTime = new Date(`${date} ${time}`);

    const initialStatus = meetingDateTime > currentDateTime ? 'Upcoming' : 'Completed';
    setStatus(initialStatus);

    if (initialStatus === 'Completed') {
      updateStatus(); // Call to update MongoDB
    }
  }, []);

  const updateStatus = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ROUTE}/update-status`,
        { email: user.email, status: 'Completed', date: `${date}`, time: `${time}`},
        { withCredentials: true }
      );
      console.log('Status Updated:', response.data);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md mb-4 mt-7 min-h-fit">
      <div>
        <h2 className="text-lg font-semibold text-[#2e4ba3]">{category}</h2>
        <p className="text-gray-500">Date: {date}</p>
        <p className="text-gray-500">Time: {time}</p>
        <p className="text-gray-500">
          Duration: {category.includes('First') ? '45 min' : '1 hr'}
        </p>
      </div>

      {/* Right Section: Status and Action */}
      <div className="flex flex-col justify-between items-center gap-3">
        <div className="countdown">
          {status === 'Upcoming' && <Countdown date={new Date(`${date} ${time}`)} />}
        </div>
        <div className="meeting-status flex flex-col gap-1 items-center">
          <span
            className={`text-md font-medium ${
              status === 'Upcoming'
                ? 'text-blue-500'
                : status === 'Completed'
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {status}
          </span>
          <button
            className="px-4 py-2 bg-[#2e4ba3] text-white rounded-lg hover:bg-[#1e3579]"
            onClick={status === 'Upcoming' ? null : updateStatus}
          >
            {status === 'Upcoming' ? 'Not Started' : 'Attended'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingBox;