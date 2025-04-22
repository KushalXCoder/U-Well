import React from 'react';
import Background from "/Background.jpeg";
import { motion } from "motion/react";
import Video from "/Video.mp4";
import Wave from "/Wave.svg";
import About from './About';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
  return (
    <section className='home-section min-h-screen w-full relative'>
        <img src={Background} alt="Background" className='background-image absolute inset-0 w-full h-full z-[-1]'/>
        <div className="home-section-content h-full w-full flex flex-col items-center">
            <div className="intro w-full flex flex-col items-center mt-[80px] max-sm:mt-[50px]">
              <motion.h1 initial={{y: 300}} animate={{y: 0, transition: {duration: 1, ease: "circOut"}}} className='font-display text-[115px] leading-[110px] text-center text-white max-sm:text-[50px] max-sm:leading-[50px]'>Unlock Your <br/> Potential with <br/> U-Well</motion.h1>
              <motion.h2 initial={{y: 200}} animate={{y: 0, transition: {duration: 1, ease: "circOut", delay: 0.2}}} className='font-display text-2xl text-white text-center mt-[60px] border border-[#ffb39e] w-1/4 py-4 hover:shadow-xl max-sm:w-5/6 max-sm:mt-15' whileHover={{backgroundColor:"#eff1f2", color: "#002e5d"}}>Discover Your Best Self</motion.h2>
            </div>
            <motion.h1 className='font-display text-6xl text-center mt-20 max-sm:text-[46px] max-sm:mt-15 max-sm:px-5'>Made for the <span className='text-white italic'>students</span> of <span className=''>AU</span> <br/> by the <span className='text-white italic'>student</span> of <span>AU</span></motion.h1>
            <div className="video h-full w-2/4 mt-18 rounded-md flex justify-center items-center max-sm:w-5/6 max-sm:mt-10">
              <video className="w-[800px] h-full rounded-lg shadow-2xl border-4 border-[#ffb39e] max-sm:border-none" controls autoPlay muted loop>
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="outro w-full flex flex-col items-center mt-18 max-sm:mt-13">
              <p className='w-2/4 text-center font-display text-[20px] max-sm:w-5/6'>Welcome to U -Well, your go to resource for comprehensive counseling. Our belief and behavior based approach helps students overcome personal challenges and achieve their goals. Take a moment to pause, reflect, and tune in to your potential with U-Well.</p>
              <img src={Wave} alt="Wave" className='mt-8 max-sm:mt-6 max-sm:h-15'/>
            </div>
        </div>
        <div className="about-counsellors-section h-auto w-full bg-[#2e4ba3]">
          <About/>
        </div>
        <Footer/>
    </section>
  )
}

export default Home