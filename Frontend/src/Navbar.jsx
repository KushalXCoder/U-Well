import { React, useState, useContext } from 'react';
import { motion } from "framer-motion";
import Profile from "/Profile.svg";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './authContext.jsx';
import { Menu, X } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Take a test", path: "/take-a-test" },
    { name: "Book your session", path: "/book-a-session" },
    { name: "Blog", path: "/blog" },
    { name: "Sessions", path: "/sessions"}
  ];

  const handleClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_ROUTE}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      console.log("Successfully logged out");
      navigate("/");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  return (
    <nav className="h-40 w-full bg-[#002e5d] flex flex-col justify-center items-center max-sm:h-30">
      <div className="inner-nav h-25 w-[95%] bg-[#2e4ba3] mb-2 rounded-md flex justify-between items-center px-10 max-sm:px-7 max-sm:h-20">
        <div className="website-name font-display text-3xl text-white flex flex-col max-sm:text-2xl"> 
          U-Well
          <br />
          <span className="text-sm text-red-950 mt-[-3px]">AU Wellness Center</span>
        </div>

        <div className="v-line h-full w-[1px] bg-[#fff1cc] max-sm:hidden"></div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="text-white absolute top-5 right-5" /> : <Menu className="text-white" />}
        </div>

        {/* Desktop Nav Links */}
        <ul className="nav-links max-sm:hidden flex items-center font-display gap-7 cursor-pointer">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={`text-[18px] hover:text-white transition-all ${
                location.pathname === link.path ? "text-white" : "text-[#ffb39e]"
              }`}
            >
              <motion.span>
                {link.name}
              </motion.span>
            </NavLink>
          ))}
          {user === null ? (
            <NavLink to="/sign-up" className="log-in flex items-center gap-3 hover:text-white transition-all">
              <img src={Profile} alt="Profile" className="h-8" />
              Sign In
            </NavLink>
          ) : (
            <p className="logout flex items-center gap-3 hover:text-white transition-all" onClick={handleLogout}>
              <img src={Profile} alt="Profile" className="h-8" />
              Logout
            </p>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div initial={{x: 200}} animate={{x: 0}} transition={{duration: 0.6}} className="sm:hidden fixed top-0 left-0 w-full h-full bg-[#2e4ba3] z-50 flex flex-col items-center gap-5 py-10">
          <X className="absolute top-5 right-5 text-white cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={`text-[18px] hover:text-white transition-all ${activeTab === link.name ? "text-white" : "text-[#ffb39e]"}`}
              onClick={() => handleClick(link.name)}
            >
              {link.name}
            </NavLink>
          ))}
          {user === null ? (
            <NavLink to="/sign-up" className="log-in flex items-center gap-3 hover:text-white transition-all">
              <img src={Profile} alt="Profile" className="h-8" />
              Sign In
            </NavLink>
          ) : (
            <p className="logout flex items-center gap-3 hover:text-white transition-all" onClick={handleLogout}>
              <img src={Profile} alt="Profile" className="h-8" />
              Logout
            </p>
          )}
        </motion.div>
      )}
      <div className="h-line h-[1px] w-[95%] bg-[#fff1cc]"></div>
    </nav>
  );
};

export default Navbar;