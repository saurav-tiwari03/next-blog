"use client";

import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import AddBlog from "@/components/AddBlog";

// Define the blog type
type Blog = {
  [x: string]: any;
  _id: string;
  title: string;
  description: string;
  tags: string[];
};

export default function Page() {
  // Initialize blogs with the Blog[] type
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true); // New state variable for loading

  const getAllBlogs = async () => {
    try {
      const response = await axios.get<Blog[]>(`${process.env.NEXT_PUBLIC_API_URL}/allblogs`);
      // Set blogs with the type Blog[]
      setBlogs(response.data);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : description;
  };

  return (
    <div>
      <div className="">
        <AddBlog />
      </div>
      <div>
        <h1 className="text-center text-5xl font-Inter text-[#6941C6] font-semibold my-4">Realm of Resources & Insights</h1>
        <h2 className="text-xl text-[#6941C6] font-Poppins text-center">&quot;Unlocking Knowledge, One Insight at a Time&quot;</h2>
      </div>
      <div className="flex items-center justify-center my-2">
        <div className="relative flex items-center font-semibold gap-2">
          <Input className="w-auto pl-8" placeholder="Search Blog"/>
          <FaSearch className="absolute left-2"/>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        {isLoading ? ( // Conditionally render loader
          <div className="flex items-center justify-center h-full">
            <div className="loader"></div> {/* Add your loader component here */}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 w-[90%] items-center justify-center">
            {blogs.map((blog) => (
              <div className="drop-shadow duration-300 h-[400px] w-[300px] flex flex-col justify-between p-4" key={blog._id}>
                <div className="flex gap-2 flex-wrap text-[#6941c6] font-semibold">
                  {blog.tags[0]}
                </div>
                <Link href={`/blog/${blog._id}`} className="text-2xl  font-Inter font-medium hover:underline">{truncateDescription(blog.title,4)}</Link>
                <p className="text-[#667085]">{truncateDescription(blog.description, 25)}</p>
                <div className="flex items-center justify-start">
                  <CgProfile className="text-4xl" />
                  <div>
                    <Link href={'/user/1'}>Saurav Tiwari</Link>
                    <p>21/07/2024</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button>👍{blog.likes.length}</button>
                  <button>💬{blog.comments.length}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
