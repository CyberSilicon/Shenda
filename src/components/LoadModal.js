import React from "react";

const LoadModal = () => {
  return (
    <div>
      <div className="flex h-screen justify-center items-center bg-white z-50 fixed left-0 top-0 right-0">
        <div className="text-center">
          <div>
            <img src="loading.gif" alt="Loading..." />
          </div>
        </div>
      </div>
      <div className="flex h-screen justify-center items-end z-50 fixed left-0 top-0 right-0">
        <div>
          <h1 className="text-base m-auto mb-10 text-slate-500 font-semibold">
            Welcome to Shenda
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoadModal;
