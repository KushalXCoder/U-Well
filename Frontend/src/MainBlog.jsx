import { useEffect, useState } from "react";
import Profile from "/Profile.svg";
import { useParams } from "react-router-dom";
import axios from "axios";

const MainBlog = () => {

    const { blogName } = useParams();
    const decodedName = decodeURIComponent(blogName);
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                console.log(decodedName);
                const response = await axios.get(`${import.meta.env.VITE_ROUTE}/blog/${decodedName}}`);
                console.log(response.data);
                setBlogData(response.data.blog);
            } catch (error) {
                console.log("Error fetching blog data", error);
            }
        }

        fetchBlog();
    }, [decodedName]);

    return blogData.length === 0 ? (
        <div>Loading...</div>
    ) : (
        <section className="main-blog-section w-full bg-[#fffbf0] px-15 font-display flex">
            <div className="main-blog-container w-5/6 py-8 flex flex-col gap-3">
                <div className="publishing-details flex items-center gap-3">
                    <div className="author">
                        <img src={Profile} alt="Profile Image" draggable="false"/>
                    </div>
                    <div className="other-detials">
                        <h1 className="font-bold text-lg">{blogData.author}</h1>
                        <h1 className="font-bold text-lg">{blogData.date.replace("T00:00:00.000Z", "")}</h1>
                    </div>
                </div>
                <h1 className="font-bold text-3xl">{blogData.title}</h1>
                <div className="blog-content flex flex-col gap-3">
                    <p>{blogData.content}</p>
                </div>
            </div>
            <div className="other-blogs w-1/6 border h-full">
                <h1></h1>
            </div>
        </section>
    )
};

export default MainBlog;