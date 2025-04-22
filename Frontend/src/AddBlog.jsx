import {React, useState} from 'react';
import ExampleImage from "/Blog.avif";
import ExampleProfile from "/Profile.svg";
import { motion } from "motion/react";
import axios from "axios";

const AddBlog = () => {

  const [liked, setLiked] = useState(false);
  const [blogDetails, setBlogDetails] = useState({author: "", date: "", title: "", description: "", content: ""});

  const handleInput = (e) => {
    const {name, value, files} = e.target;
    if (name === "img") {
        const file = files[0];
        const url = URL.createObjectURL(file);
    
        setBlogDetails((prev) => ({
          ...prev,
          img: file,
          imgURL: url,
        }));
      } else {
        setBlogDetails((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        const response = axios.post(`${import.meta.env.VITE_ROUTE}/add-blogs`, blogDetails);
        console.log(response.message);
    } catch (error) {
        console.error("Error creating blog", error.response ? error.response.data : error.message);  
    }
  }

  return (
    <section className='add-blog-container h-full w-full bg-[#fffbf0] flex justify-center'>
        <div className="main-container h-3/5 w-4/5 font-display flex mt-10 gap-5 relative">
            <div className="left-container h-full w-2/4 flex">
                <form className='w-full pe-15 flex flex-col gap-5 mb-2' onSubmit={(e) => handleSubmit(e)}>
                    <div className="publishing-details w-full flex gap-5">
                        <div className="author flex flex-col w-1/2 gap-1">
                            <label htmlFor="author">Author</label>
                            <input name='author' type="text" placeholder='John Doe' className='border rounded-md px-5 py-2' value={blogDetails.author} onChange={handleInput}/>
                        </div>
                        <div className="date w-1/2 flex flex-col gap-1">
                            <label htmlFor="date">Date</label>
                            <input name="date" type="date" className='border px-5 py-2 rounded-md' value={blogDetails.date} onChange={handleInput}/>
                        </div>
                    </div>
                    <div className="blog-details flex flex-col gap-4">
                        <div className="blog-image flex flex-col gap-1">
                            <label htmlFor="img">Blog Image</label>
                            <input name='img' type="file" className='border px-5 py-2 rounded-md' onChange={handleInput}/>
                        </div>
                        <div className="blog-title w-full flex flex-col gap-1">
                            <label htmlFor="title">Blog Title</label>
                            <input name='title' type="text" placeholder='Blog Title' className='border px-5 py-2 rounded-md' value={blogDetails.title} onChange={handleInput}/>
                        </div>
                        <div className="blog-description w-full flex flex-col gap-1">
                            <label htmlFor="description">Blog Description</label>
                            <input name='description' type="text" placeholder='Blog Description' className='border px-5 py-2 rounded-md' value={blogDetails.description} onChange={handleInput}/>
                        </div>
                        <div className="blog-content w-full flex flex-col gap-1">
                            <label htmlFor="content">Blog Content</label>
                            <textarea name="content" placeholder="Blog Content" className="border rounded-md h-50 px-5 py-2" value={blogDetails.content} onChange={handleInput}></textarea>
                        </div>
                    </div>
                    <div className="submit-button w-full flex">
                        <button type='submit' className='w-3/4 rounded-md py-2 mt-5 bg-[#002e5d] text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>Create Blog</button>
                    </div>
                </form>
            </div>
            <div className="right-container h-fit w-2/4 border-4 rounded-md flex flex-col gap-2 sticky top-0">
                <div className="example-blog-image">
                    <img src={ExampleImage} alt="Example Blog Image" className='w-full'/>
                </div>
                <div className="example-author font-display flex items-center gap-3 px-5 mt-2">
                    <div className="example-image">
                        <img src={ExampleProfile} alt="Example Profile Image" className='h-10'/>
                    </div>
                    <div className="example-other-details">
                        <h1>{blogDetails.author|| "Example Name"}</h1>
                        <p>{blogDetails.date || "dd-mm-yyyy"}</p>
                    </div>
                </div>
                <h1 className="px-5 font-bold text-xl mt-2">{blogDetails.title || "Example Title"}</h1>
                <p className="px-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam aliquam distinctio odit aliquid similique qui cum, assumenda officia itaque est.</p>
                <div className="example-blog-bottom font-display px-5 my-3">
                    <div className="line h-[1px] w-full bg-black"></div>
                    <div className="example-other-details flex gap-5 pt-3">
                        <p className='views'>8 views</p>
                        <div className='likes flex items-center gap-1'>
                            8
                            <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25" viewBox="0 0 19 19"
                            aria-hidden="true"
                            initial={false}
                            animate={{
                                fill: liked ? '#EF4444' : 'transparent',
                                stroke: '#EF4444',
                                transition: { type: 'spring', stiffness: 300, damping: 20 }
                            }}
                            onClick={() => setLiked(!liked)}
                            >
                                <path d="M9.44985848,15.5291774 C9.43911371,15.5362849 9.42782916,15.5449227 9.41715267,15.5553324 L9.44985848,15.5291774 Z M9.44985848,15.5291774 L9.49370677,15.4941118 C9.15422701,15.7147757 10.2318883,15.0314406 10.7297038,14.6971183 C11.5633567,14.1372547 12.3827081,13.5410755 13.1475707,12.9201001 C14.3829188,11.9171478 15.3570936,10.9445466 15.9707237,10.0482572 C16.0768097,9.89330422 16.1713564,9.74160032 16.2509104,9.59910798 C17.0201658,8.17755699 17.2088969,6.78363112 16.7499013,5.65913129 C16.4604017,4.81092573 15.7231445,4.11008901 14.7401472,3.70936139 C13.1379564,3.11266008 11.0475663,3.84092251 9.89976068,5.36430396 L9.50799408,5.8842613 L9.10670536,5.37161711 C7.94954806,3.89335486 6.00516066,3.14638251 4.31830373,3.71958508 C3.36517186,4.00646284 2.65439601,4.72068063 2.23964629,5.77358234 C1.79050315,6.87166888 1.98214559,8.26476279 2.74015555,9.58185512 C2.94777753,9.93163559 3.23221417,10.3090129 3.5869453,10.7089994 C4.17752179,11.3749196 4.94653811,12.0862394 5.85617417,12.8273544 C7.11233096,13.8507929 9.65858244,15.6292133 9.58280954,15.555334 C9.53938013,15.5129899 9.48608859,15.5 9.50042471,15.5 C9.5105974,15.5 9.48275828,15.5074148 9.44985848,15.5291774 Z"></path>
                            </motion.svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AddBlog