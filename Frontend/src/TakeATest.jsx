import React from 'react';
import Arrow from "/Arrow.svg";
import { motion } from "motion/react";
import Motivation from "/Motivation.jpeg";
import axios from "axios";

const TakeATest = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeIn",
        staggerChildren: 0.5,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleClick = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_ROUTE}/take-a-test`,{},{withCredentials: true});
      console.log(response);
    } catch (error) {
      if(error.response?.status === 401) {
        console.log("User is not authenticated. Redirecting to login.");
        window.location.href = error.response?.data?.redirectTo || "/login";
      }
      else {
        console.log("Error occured", error);
      }
    }
  }

  return (
    <section className='take-a-test-container h-[200vh] w-full bg-[#fffbf0]'>
        <motion.div
        className="take-a-test-content h-full w-full flex flex-col items-center"
        variants={containerVariants} 
        initial="hidden" 
        animate="show">
            <motion.h1 variants={itemVariants} className='font-display text-[56px] text-[#2e4ba3] mt-15 border w-1/4 text-center border-[#ffb39e]'>Take a Test</motion.h1>
            <motion.p variants={itemVariants} className='font-display text-[22px] text-[#2e4ba3] text-center w-3/5 mt-15'>At U-Well, we understand the importance of mental well-being and the counseling can play in achieving it. However, we also recognize that not everyone may be aware of their need for counseling.</motion.p>
            <motion.p variants={itemVariants} className='font-display text-[22px] text-[#2e4ba3] text-center w-3/5 mt-10'>That's why we've created Take a Test, a platform that can help you identify if counseling may be beneficial for you. With our easy-to-use tests, you can gain insight into your mental health and take the first step a happier, healthier you. </motion.p>
            <motion.p variants={itemVariants} className='font-display text-[19px] text-center w-2/4 mt-10'>Click the button below, let's solve this issue together!</motion.p>
            <motion.img variants={itemVariants} src={Arrow} alt="Arrow" className='h-15 w-7 rotate-180 mt-10 animate-bounce'/>
            <motion.button variants={itemVariants} className='font-display bg-[#243c84] px-10 py-4 mt-8 text-white cursor-pointer border border-[#fffbf0]' whileHover={{backgroundColor: "#FFFFFF", color: "#243c84", borderColor: "#243c84"}} onClick={handleClick}>Take a Test</motion.button>
            <motion.img variants={itemVariants} src={Motivation} alt="Motivation" className='mt-15 w-3/5'/>
            <motion.p variants={itemVariants} className='font-display text-[22px] text-[#2e4ba3] text-center w-5/6 mt-15'>The above form you filled would help you know, whether you need to consult a counselor.This form doesn't mean to say that you are unwell or any such sort of things, but this is to create an awarness that you might need to consult a conselor, cause of high stress or anxiety, but don't feel it.</motion.p>
            <motion.h1 variants={itemVariants} className="font-display mt-20 text-[30px]">COUNSELING IS A SOLUTION, NOT A PROBLEM !</motion.h1>
        </motion.div>
        <footer className='bg-[#2e4ba3] opacity-90 h-70 font-display text-[50px] flex flex-col justify-center items-center relative'>
            {/* <img src={Background2} alt="" className='absolute top-0'/> */}
            <h1>Don't let other people ask, You Well ?</h1>
            <h1 className='mt-[-20px]'>Just visit U-Well !</h1>
        </footer>
    </section>
  )
}

export default TakeATest