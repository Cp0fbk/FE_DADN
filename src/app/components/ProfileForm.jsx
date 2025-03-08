import React from "react";
import { FaPen } from "react-icons/fa";

export default function ProfileForm({ user, handleChange }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
        <FaPen /> Edit Profile
      </h2>
      <div className="w-24 h-24 bg-gray-600 rounded-full mb-4 overflow-hidden">
        <img src="/avatar.jpg" alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <form className="space-y-3">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-400 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
          />
        </div>
        <button className="w-full bg-blue-500 p-2 rounded-md hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  );
}
