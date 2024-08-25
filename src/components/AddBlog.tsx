import React from 'react'
import { MdOutlineAdd } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link';



export default function AddBlog() {
  return (
    <div className='fixed text-5xl top-4 right-8  text-[#6941c6] rounded-full'>
      <Link href={`/admin`}>
        <TooltipProvider >
          <Tooltip>
            <TooltipTrigger><MdOutlineAdd className=''/></TooltipTrigger>
            <TooltipContent>
              <p>Create a blog</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </Link>
    </div>
  )
}
