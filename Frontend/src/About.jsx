import React from 'react';
import Counsellor from "/Counsellor.avif";
import Wave2 from "/Wave2.svg";

const About = () => {
  return (
    <>
    <div className="about-counsellors-content h-auto w-full pt-15 px-15 relative max-sm:pt-6 max-sm:px-5 max-sm:flex max-sm:flex-col max-sm:justify-evenly max-sm:h-[200vh]">
      <div className="about-counsellors-intro flex justify-between items-center max-sm:flex-col">
          <h1 className='font-display w-2/4 text-white text-8xl max-sm:text-3xl max-sm:text-center max-sm:w-fit'>Meet Our Experienced Counsellors</h1>
          <div className="images flex gap-20 *:rounded-md max-sm:flex-col max-sm:gap-10 max-sm:mt-5 max-sm:*:h-70">
              <img src={Counsellor} alt="Counsellor Image" />
              <img src={Counsellor} alt="Counsellor Image" />
          </div>
      </div>
      <div className='line w-full h-[2px] bg-white hidden max-sm:block mt-5'></div>
      <div className="about-counsellors-details flex mt-25 gap-10 max-sm:flex-col max-sm:mt-5">
        <img src={Counsellor} alt="Counsellor" className="rounded-md h-120 max-sm:h-90" />
        <div className="details-container font-display flex flex-col w-full ms-15 max-sm:ms-0 max-sm:text-center">
            <h1 className="text-[35px]">Expert Guidance & Support</h1>
            <p className="text-4xl text-white w-5/6 mt-8 max-sm:w-full max-sm:text-2xl">
                At U-well, our fully-certified counselors have been successfully coaching students 
                throughout Ahmedabad University and facilitating their self-growth. They help you 
                with techniques to better manage the emotional stress of everyday life and introduce 
                clarity and self-motivation.
            </p>
        </div>
      </div>
    </div>
    <img src={Wave2} alt="Wave" className='mt-5 max-sm:h-15'/>
    </>
  )
}

export default About