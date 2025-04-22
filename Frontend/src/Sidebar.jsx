import React, { useState, useContext } from 'react';
import { AuthContext } from './authContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Upcoming Meeting");

  if(!user) return null;

  console.log(user.role);

  const baseLinks = [
    {name: "Upcoming Meeting", path: "/sessions"},
    {name: "Completed Meeting", path: "/sessions/completed-meetings"},
    {name: "Missed Meeting", path: "/sessions/missed-meetings"},
  ];

  const links = user.role === "admin"
  ? baseLinks.filter(link => link.name !== "Missed Meeting")
  : baseLinks;

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_ROUTE}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      console.log("Successfully logged out");
      // navigate("/");
      // setActiveTab("Home");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  const handleClick = (item) => {
    setActiveTab(item.name);
    navigate(item.path);
  }

  return (
    <div className='options h-full w-full flex flex-col justify-between items-center px-7 py-5'>
        <ul className='flex flex-col gap-3 mt-5'>
            {links.map((item, index) => (
                <li
                key={index}
                onClick={() => handleClick(item)}
                className={`font-display text-lg py-4 px-4 rounded-md cursor-pointer transition-all duration-300 ${
                    activeTab === item.name ? `bg-[#ffb39e] text-black` : `bg-transparent text-white`
                }`}
                >
                    {item.name}
                </li>
            ))}
        </ul>
        <div className="bottom-field w-full flex flex-col gap-3">
            <div className="box h-25 w-full bg-black rounded-md">

            </div>
            <button className='bg-red-500 font-display w-full py-3 rounded-md cursor-pointer hover:bg-red-600' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Sidebar