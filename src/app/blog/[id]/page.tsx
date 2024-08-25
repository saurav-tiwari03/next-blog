/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Blog = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  likes: string[];
  comments: Comment[];
};

type Comment = {
  _id: string;
  text: string;
  user: string;
  date: string;
};

export function Component ({params}:{params:{id:string}}) {
  return;
}

export default function Page({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBlogById = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog/${params.id}`);
      console.log(res.data);
      setBlog(res.data);
      setComments(res.data.comments);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blog/${params.id}/comment`, { text: comment });
      setComments([...comments, res.data]);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <Link href='/home'>
          <Badge variant={"outline"}>Home</Badge>
        </Link>
      </div>
      <div className="min-h-[500px] w-[80%] bg-[#f9f5ff] p-4 relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="loader"></div>
          </div>
        ) : (
          blog && (
            <div>
              <div className="flex items-center justify-between my-4">
                <div>
                  <div className="flex gap-2 flex-wrap text-[#6941c6] font-semibold">
                    <div>
                      <Link className="hover:underline hover:text-[#7b5aca]" href={`/user/${blog._id}`}>{/* Add dynamic user name here */}Saurav Tiwari</Link>
                      <p className="text-sm">{/* Add dynamic date here */}21/07/2024</p>
                    </div>
                  </div>
                </div>
                <h1 className="flex gap-2 flex-wrap text-[#6941c6] font-semibold">{blog.tags[0]}</h1>
              </div>
              <h1 className="text-5xl font-Inter font-semibold">{blog.title}</h1>
              <p className="text-[#667085]">{blog.description}</p>
              <div className="mt-4">
                <h2 className="text-2xl font-semibold">Add a Comment</h2>
                <Textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment here..."
                />
                <button 
                  onClick={handleCommentSubmit} 
                  className="mt-2 px-4 py-2 bg-[#6941c6] hover:bg-[#7b5aca] duration-200 font-Poppins font-semibold text-white rounded"
                >
                  Submit
                </button>
              </div>

              <div className="absolute bottom-1 w-full">
                <div className="flex items-center justify-between w-[95%]">
                  <h2 className="text-2xl font-semibold">Comments {comments.length}</h2>
                  <button className="flex items-center mt-2 px-4 py-2 bg-[#6941c6] hover:bg-[#7b5aca] duration-200 font-Poppins font-semibold text-white rounded">
                    Like {blog.likes.length}
                  </button>
                </div>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment._id} className="bg-white p-2 rounded shadow">
                      <p>{comment.text}</p>
                      <p className="text-sm text-gray-500">- {comment.user}, {new Date(comment.date).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
