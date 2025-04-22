import { React, useState, useContext } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import Google from "/Google.svg";
import axios from 'axios';
import Message from '../Message.jsx';
import { AuthContext } from '../authContext.jsx';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_ROUTE}/login`, data, {withCredentials: true});
      console.log(response);
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  }

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.div className='login-page font-display flex h-[610px] items-center justify-center bg-[#fffbf0] relative'>
      <div className="login-page-content w-1/4 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
        <h1 className='text-3xl font-semibold text-[#2e4ba3] mb-3'>Sign Up</h1>
        <p className='text-[#2e4ba3] text-[16px]'>
          New to the site? <Link to="/sign-up" className='hover:underline'>Sign In</Link>
        </p>
        <form className="w-full mt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className='text-[#2e4ba3] mb-1'>Email</label>
            <motion.input 
              type="email" 
              name='email' 
              value={data.email} 
              className='w-full border-b-2 border-gray-300 py-2 outline-none focus:border-[#2e4ba3]' 
              required 
              placeholder='johndoe@gmail.com' 
              onChange={handleChange} 
              autoComplete='off'
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className='text-[#2e4ba3] mb-1'>Password</label>
            <input 
              type="password" 
              name='password' 
              value={data.password} 
              className='w-full border-b-2 border-gray-300 py-2 outline-none focus:border-[#2e4ba3]' 
              required 
              placeholder='********' 
              onChange={handleChange} 
              autoComplete='off'
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#2e4ba3] text-white py-2 rounded-md hover:bg-[#233b87] transition"
          >
            Submit
          </button>
        </form>
        <div className="flex items-center gap-3 mt-5 w-full">
          <div className="flex-1 h-[1px] bg-black"></div>
          <div>or</div>
          <div className="flex-1 h-[1px] bg-black"></div>
        </div>
        <motion.button 
          className='mt-6 bg-white w-full py-3 flex items-center justify-center text-[16px] border border-gray-400 rounded-md cursor-pointer hover:border-[#2e4ba3] transition'
        >
          <img src={Google} alt="Google" className='h-6 mr-3'/>
          Sign up with Google
        </motion.button>
      </div>
      {message === null ? " " : (
        <Message message={message} setMessage={setMessage}/>
      )}
    </motion.div>
  );
}

export default Login;