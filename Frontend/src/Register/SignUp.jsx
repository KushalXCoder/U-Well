import { React, useState } from 'react';
import Google from "/Google.svg";
import { motion } from "motion/react";
import EmailLogin from './EmailLogin';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [emialLogin, setEmailLogin] = useState(false);

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.7, ease: "easeIn"}} className='register-page h-[610px] w-full bg-[#fffbf0] flex justify-center items-center'>
        <div className="register-page-content w-2/5 flex flex-col bg-white shadow-lg rounded-lg justify-center items-center font-display px-0 py-8">
            <h1 className='text-5xl text-[#2e4ba3]'>Sign Up</h1>
            <p className='mt-3 text-[#2e4ba3] text-[18px]'>Already a member ? <Link to="/login" className='hover:underline'>Login</Link></p>
            {emialLogin ? 
                (<EmailLogin setEmailLogin = {setEmailLogin}/>)
            :
            (
            <>
                <motion.button className='bg-white w-[300px] px-4 py-3 flex items-center mt-10 text-[16px] border border-gray-400 cursor-pointer' whileHover={{borderColor: "#2e4ba3"}}>
                    <img src={Google} alt="Google" className='h-6 me-12'/>
                    Sign up with Google
                </motion.button>
                <div className="or flex w-full justify-center items-center gap-3 mt-5">
                    <div className="line h-[1px] w-[200px] bg-black"></div>
                    <div>or</div>
                    <div className="line h-[1px] w-[200px] bg-black"></div>
                </div>
                <motion.button className='border border-gray-400 w-[300px] py-3 mt-8 cursor-pointer' whileHover={{borderColor: "#2e4ba3"}} onClick={() => setEmailLogin(true)}>
                    Sign up with email
                </motion.button>
            </>
            )
            }
        </div>
    </motion.div>
  )
}

export default SignUp