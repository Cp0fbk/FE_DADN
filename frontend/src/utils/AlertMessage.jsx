import React, { useEffect, useState } from "react";
import { X } from "lucide-react"; // đảm bảo đã cài `lucide-react`

const AlertMessage = ({ alertMsg }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Khi alertMsg thay đổi, hiển thị lại alert
    if (alertMsg) setIsVisible(true);
  }, [alertMsg]);

  const handleCloseAlert = () => {
    setIsVisible(false);
  };

  if (!isVisible || !alertMsg) return null;

  return (
    <div className="relative bg-yellow-100 text-red-600 p-4 pr-10 rounded-lg shadow-md w-fit max-w-sm border-l-4 border-yellow-500 mb-3">
      {/* Nút đóng */}
      <button
        onClick={handleCloseAlert}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition-colors p-1 rounded-full"
        aria-label="Close"
      >
        <X size={16} />
      </button>

      {/* Nội dung */}
      <p className="text-sm font-medium whitespace-pre-line">
        {alertMsg}
      </p>
    </div>
  );
};

export default AlertMessage;
