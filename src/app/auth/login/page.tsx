"use client"
import {useState} from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { ImSpinner6 } from "react-icons/im";
import { useRouter } from 'next/navigation'



export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show,setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(!isLoading);
    try {
      const res = await axios.post(`http://localhost:3000/api/user/login`,{email,password})
      console.log(res.data);
      setIsLoading(!isLoading); 
      router.push('/home')
    } catch (error) {
      console.error(error);
      setIsLoading(!isLoading);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4 drop-shadow h-[350px] w-[400px] m-auto p-4">
        <h1 className="text-3xl text-[#6941c6] font-bold font-Inter`">Log in</h1>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <Input
            className=""
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='flex gap-1'>
            <Input
              className=""
              placeholder="Password"
              type={`${show ? 'text' : 'password'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='button' variant={'outline'} onClick={() => setShow(!show)}>Show</Button>
          </div>
          <Button  type="submit">{isLoading ? <ImSpinner6 className='animate-spin' /> : 'Sign up'}</Button>
        </form>
      </div>
    </div>
  );
}
