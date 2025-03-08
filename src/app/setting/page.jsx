"use client";
import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import ActivityLog from "../components/ActivityLog";
import ProfileForm from "../components/ProfileForm";
import { ContactBox, MobileContactPopup } from "../components/Contact";
import { FaHeadset } from "react-icons/fa";

export default function Setting() {
  const [user, setUser] = useState({
    name: "Sara",
    fullName: "Tancredi",
    email: "SaraTancredi@gmail.com",
    phone: "(+98) 9123728167",
  });

  const [isContactOpen, setIsContactOpen] = useState(false);

  const activityLog = [
    {
      date: "01 Mar 2025",
      device: "Camera",
      action: "Camera activated",
      details: "Camera was turned on at 10:00 AM.",
    },
    {
      date: "01 Mar 2025",
      device: "Air Conditioner",
      action: "Air Conditioner turned on",
      details: "Temperature set to 24°C at 11:30 AM.",
    },
    {
      date: "01 Mar 2025",
      device: "Smart TV",
      action: "TV switched mode",
      details: "Smart TV switched to Netflix at 12:15 PM.",
    },
    {
      date: "01 Mar 2025",
      device: "Security System",
      action: "System armed",
      details: "Security system was armed at 01:00 PM.",
    },
    {
      date: "01 Mar 2025",
      device: "Smart TV",
      action: "TV switched mode",
      details: "Smart TV switched to Netflix at 12:15 PM.",
    },
    {
      date: "01 Mar 2025",
      device: "Security System",
      action: "System armed",
      details: "Security system was armed at 01:00 PM.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar />
      <div className="flex-1 p-6 md:ml-16">
        <Header name="Setting" />
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 bg-gray-800 p-4 rounded-lg shadow-lg">
            <ActivityLog logs={activityLog} />
          </div>
          <div className="md:w-1/2 flex flex-col gap-6 h-auto md:mb-0 mb-10">
            <ProfileForm
              user={user}
              handleChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
            <ContactBox />
          </div>
        </div>
        <button
          className="fixed bottom-6 right-6 md:hidden bg-green-700 p-4 rounded-full md:mb-0 mb-10"
          onClick={() => setIsContactOpen(true)}
        >
          <FaHeadset size={24} />
        </button>
        <MobileContactPopup
          isOpen={isContactOpen}
          closePopup={() => setIsContactOpen(false)}
        />
      </div>
    </div>
  );
}
