import {React, useState, useContext} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "motion/react";
import axios from "axios";
import LeftArrow from "/left-arrow.png";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';

const EmailLogin = ({setEmailLogin}) => {

  const [capVal, setCapVal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({email: "", password: ""});
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmailError(null);
    setPasswordError(null);
    setData((prev) => (
        {...prev, [e.target.name] : e.target.value}
    ))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!data.email.includes("@ahduni.edu.in")) {
        setEmailError("Please enter university email");
        console.log("Please enter university email");
    }
    else if(data.password.length < 8) {
        setPasswordError("Minimum length of password is 8");
    }
    else if(data.password.length > 8) {
        setPasswordError("Maximum length of password is 8");
    }
    else {
        setEmailError(null);
        try {
            const response = await axios.post(`${import.meta.env.VITE_ROUTE}/addUser`, data, {withCredentials: true});
            console.log(response.data);
            setUser(response.data.user);
            navigate("/");
        } catch (error) {
            console.log("Error storing user", error);
        }
    }
  }

  return (
    <>
    <img src={LeftArrow} alt="Cross Image" className="h-10 absolute top-45 left-10 cursor-pointer" onClick={() => setEmailLogin(false)}/>
    <motion.form initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.7, ease: "easeIn"}} className='w-4/5 flex flex-col items-center gap-8 mb-5' onSubmit={handleSubmit}>
        <div className="email w-full flex flex-col items-center">
            <label htmlFor="email" className='text-start w-3/4 text-[#2e4ba3] mt-10'>Email</label>
            <motion.input type="email" name='email' value={data.email} className='w-3/4 border-b-2 border-gray-300 py-2 outline-none' whileFocus={{borderColor: "#2e4ba3"}} required placeholder='johndoe@gmail.com' onChange={handleChange} autoComplete='false'/>
            {emailError === null ? "" : <p className='mt-2 text-red-500 text-start'>{emailError}</p>}
        </div>
        <div className="password w-full flex flex-col items-center">
            <label htmlFor="password" className='text-start w-3/4 text-[#2e4ba3]'>Password</label>
            <input type="password" name='password' value={data.password} className='w-3/4 border-b-2 border-gray-300 py-2 outline-none' required placeholder='********' onChange={handleChange} autoComplete='false'/>
            {passwordError === null ? "" : <p className='mt-2 text-red-500'>{passwordError}</p>}
        </div>
        {loading && (
            <div className="loader w-12 h-12 border-4 border-gray-300 border-t-[#2e4ba3] rounded-full animate-spin"></div>
        )}
        <ReCAPTCHA
            sitekey={`${import.meta.env.VITE_CAPTCHA_SITE_KEY}`}
            onChange={(val) => setCapVal(val)}
            asyncScriptOnLoad={() => setLoading(false)}
            className='flex items-center justify-center'
        />
        <button type="submit" className={`w-3/5 text-white py-3 cursor-pointer ${capVal === null ? `bg-gray-400` : `bg-[#2e4ba3]`}`} disabled={!capVal}>Submit</button>
    </motion.form>
    </>
  )
}

export default EmailLogin