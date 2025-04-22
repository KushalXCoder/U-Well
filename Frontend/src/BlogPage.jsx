import React, { useContext, useEffect, useState } from 'react';
import BlogImage from "/Blog.avif";
import Profile from "/Profile.svg";
import { motion } from "motion/react";
import Blog from './Blog';
import { AuthContext } from './authContext.jsx';
import Plus from "/Plus.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogPage = () => {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [blogs, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_ROUTE}/get-blogs`, {withCredentials: true});
        setBlog(response.data.blogs);
      } catch (error) {
        console.log("Error fetching blogs", error);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <section className='blog-section w-full bg-[#fffbf0] px-40 pt-10 flex flex-col items-center relative'>
        {blogs.map((blog, index) => (
          <Blog key={index} blog={blog}/>
        ))}
        {user.role === "admin" && (
          <motion.button
          className='add-blog flex justify-center items-center gap-3 text-xl bg-[#2e4ba3] w-[120px] py-2 font-display absolute top-5 right-5 rounded-md text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          onClick={() => navigate("/add-blog")}
          >
            Add Blog
          </motion.button>
        )}
    </section>
  )
}

export default BlogPage