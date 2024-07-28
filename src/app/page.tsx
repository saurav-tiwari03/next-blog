import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-Inter text-4xl">Welcome to our <Link href='/home' className="hover:underline ">blog</Link></h1>
    </main>
  );
}
