import React, { useState } from 'react';
import BlogImage from "/Blog.avif";
import Profile from "/Profile.svg";
import { motion } from "motion/react";
import { useNavigate } from 'react-router-dom';

const Blog = ({blog}) => {

  const [liked, setLiked] = useState(false);
  let blogName = "";
  const navigate = useNavigate();

  const redirectBlog = (e) => {
    console.log(`${blog.title} clicked`);
    blogName = blog.title;
    const encodedName = encodeURIComponent(blogName);
    navigate(`/blog/${encodedName}`);
  }

  return (
    <div
    className="main-blog-section flex flex-col items-center border border-[rgba(200,200,200,1)] w-4/5 mb-10 cursor-pointer"
    onClick={(e) => redirectBlog(e)}
    >
          <div className="blog-image overflow-y-hidden w-full">
              <img src={BlogImage} alt="Blog Image" className='w-full'/>
          </div>
          <div className="main-blog-content flex flex-col px-5 py-5">
            <div className="author font-display flex items-center gap-3">
              <div className="image">
                <img src={Profile} alt="Profile Picture" className='h-10'/>
              </div>
              <div className="other-details">
                <h1>{blog.author}</h1>
                <p>{blog.date.replace("T00:00:00.000Z","")}</p>
              </div>
            </div>
            <div className="main-blog-details py-4">
              <h1 className='title text-3xl font-display font-bold text-[#2e4ba3]'>{blog.title}</h1>
              <p className='font-display text-lg mt-3 text-[#2e4ba3]'>{blog.description}...</p>
            </div>
            <div className="main-blog-bottom font-display">
              <div className="line h-[1px] w-full bg-black"></div>
              <div className="other-details flex gap-5 pt-3">
                <p className='views'>{blog.views} views</p>
                <div className='likes flex items-center gap-1'>
                  {blog.likes}
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
  )
}

export default Blog