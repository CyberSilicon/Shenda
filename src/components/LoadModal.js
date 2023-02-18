import React from "react";

const LoadModal = () => {
  return (
    <div>
      <div className="flex h-screen justify-center items-center bg-white z-50 fixed left-0 top-0 right-0">
        <div className="text-center">
          <div className=" bg-black p-12 rounded-3xl animate-pulse">
            loading...
          </div>
        </div>
      </div>
      <div className="flex h-screen justify-center items-end z-50 fixed left-0 top-0 right-0">
        <div>
          <h1 className="text-sm m-20 text-gray-400">Welcome to</h1>
        </div>
      </div>
      <div className="flex h-screen justify-center items-end z-50 fixed left-0 top-0 right-0">
        <div>
          <h1 className="font-bold text-2xl m-10">Evaxio</h1>
        </div>
      </div>
    </div>
  );
};

export default LoadModal;
