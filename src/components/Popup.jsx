import React, { useEffect } from 'react';

const Popup = ({ children, onClose }) => {
  useEffect(() => {
    // Add class to body to disable scrolling
    document.body.classList.add('overflow-hidden');
    // Remove class from body to enable scrolling when component is unmounted
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4">{children}</div>
        <button
          onClick={onClose}
          className="rounded bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
