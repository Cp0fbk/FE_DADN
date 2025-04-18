import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import axios from "axios";

export default function ProfileForm() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (token) {
      axios
        .get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        })
        .then((response) => {
          setUser({
            username: response.data.user.username,
            email: response.data.user.email,
            password: "" 
          });
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
        });
    }
  }, []);

  const handleEditClick = () => {
    setIsEditingPassword(true);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
        <FaPen /> Edit Profile
      </h2>
      <div className="w-24 h-24 bg-gray-600 rounded-full mb-4 overflow-hidden">
        <img src="/avatar.jpg" alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <form className="space-y-3">
        {/* Username field */}
        <div>
          <label className="block text-gray-400 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            // onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
            disabled
          />
        </div>

        {/* Email field */}
        <div>
          <label className="block text-gray-400 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            // onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
            disabled
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center justify-between">
          <label className="text-gray-400 mb-1">Password</label>
          <FaPen
            onClick={handleEditClick}
            className={`cursor-pointer ${isEditingPassword ? "text-blue-500" : "text-gray-400"}`}
          />
        </div>
        <div>
          <div className="relative">
            <input
              type={isEditingPassword ? "password" : "text"}
              name="password"
              value={user.password}
              // onChange={handleChange}
              disabled={!isEditingPassword}
              placeholder="*******"
              className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 pr-10"
            />
          </div>
        </div>

        <button className="w-full bg-blue-500 p-2 rounded-md hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  );
}
