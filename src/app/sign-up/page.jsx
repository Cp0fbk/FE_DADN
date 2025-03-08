import React from "react";

export default function SignUp() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-300 px-4">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden" 
        style={{ backgroundImage: "url('/home.jpg')" }}>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main Container */}
      <div className="relative bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-3xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 bg-white bg-opacity-90 md:bg-opacity-100 rounded-lg">
          <h2 className="text-2xl font-semibold">Get Started</h2>
          <p className="text-gray-500 text-sm mb-6">
            Welcome to S-Home Website - Let's create your account
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm font-bold">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-bold">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded mt-1"
                placeholder="Enter your password"
              />
            </div>

            <button className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700">
              Sign up
            </button>
          </form>

          <p className="text-gray-500 text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/" className="text-black font-medium">
              Log in
            </a>
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-white hidden md:flex justify-center items-center p-3">
          <img
            src="/smarthome.jpg"
            alt="Banner"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
