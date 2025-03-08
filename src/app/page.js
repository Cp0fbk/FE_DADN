"use client";
import { useState } from "react";
import Link from "next/link";
import { RiMenu3Line } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/home.jpg')" }}
    >
      <div className="bg-black/50 min-h-screen flex flex-col items-center text-black">
        {/* Navbar */}
        <nav className="w-full p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 backdrop-blur-lg">
          <Link href="/device-controller" className={`text-xl font-bold ${isOpen ? "text-gray-700" : "text-white"
            }`}>S-HOME</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-white">
            <Link href="/sign-up" className="hover:text-gray-300">
              Sign Up
            </Link>
            <Link href="#" className="hover:text-gray-300">
              About Us
            </Link>
            <Link href="#" className="hover:text-gray-300">
              Help
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-transform duration-300 ${isOpen ? "rotate-180 text-gray-700" : "text-white"
              }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <RiMenu3Line size={28} />
          </button>
        </nav>

        <div
          className={`fixed top-0 left-0 w-full bg-white shadow-md z-40 transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            }`}
          style={{ height: "40vh" }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6 text-xl">

            <Link href="/sign-up" className="hover:text-gray-300">
              Sign Up
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black">
              Price
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black">
              Help
            </Link>
          </div>
        </div>

        {/*Section */}
        <div className="flex flex-col items-center p-6 mt-20 text-center">
          <h1 className="text-6xl font-bold text-white">Control your home</h1>
          <p className="text-gray-300 mt-6 text-xl">
            A smart house with advanced features that you can control via a website.
          </p>
          <p className="text-gray-300 text-xl">
            Experience the future of home automation with cutting-edge technology that enhances convenience and security.
          </p>
        </div>
        {/* Login Form */}
        <div className="flex items-center justify-center mb-4 mx-4">
          <div className="backdrop-blur-sm bg-white/10 p-8 rounded-lg shadow-lg lg:w-96 text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">Sign in with email</h2>

            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-right text-blue-500 text-sm cursor-pointer">Forgot password?</div>
              <button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
                onClick={() => router.push("/device-controller")}>Get Started</button>
            </form>

            <div className="my-6 text-gray-300">Or sign in with</div>
            <div className="flex justify-center space-x-4">
              <button className="p-3 border rounded-lg"><FcGoogle size={24} /></button>
              <button className="p-3 border rounded-lg text-blue-600"><FaFacebook size={24} /></button>
              <button className="p-3 border rounded-lg text-black"><FaApple size={24} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
