import React, { useState } from "react";

const AlertMessage = ({ alertMsg }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleCloseAlert = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && alertMsg && (
        <div className="relative">
          <p className="text-xs mt-2 text-yellow-400 animate-pulse">
            {alertMsg}
          </p>
          <button
            onClick={handleCloseAlert}
            className="absolute top-0 right-0 text-red-500 text-xs"
          >
            Tắt
          </button>
        </div>
      )}
    </>
  );
};

export default AlertMessage;
