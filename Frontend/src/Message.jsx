import React from 'react';
import Cross from "/Cross.png";

const Message = ({message, setMessage}) => {
  return (
    <div className='message-container absolute bg-[#2e4ba3] h-20 w-[290px] top-3 right-3 rounded-md flex flex-col px-3 py-2'>
        <div className="message-top flex justify-between items-center">    
            <h1 className='text-white font-display text-lg'>U-Well</h1>
            <img src={Cross} alt="Cross Image" className='h-6 cursor-pointer' onClick={() => setMessage(null)}/>
        </div>
        <p className='text-[#ffb39e] font-display mt-1 text-sm'>{message}</p>
    </div>
  )
}

export default Message