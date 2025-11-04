import React from "react";
import video from "../assets/Images/Video.mp4";

export default function CenterPage() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center min-h-screen bg-neutral-50 px-8 md:px-24 py-12 md:py-0">
      
      <div className="max-w-xl space-y-8 text-center md:text-left mb-10 md:mb-0 md:ml-[8rem]">
        <div className="w-20 h-[2px] bg-black mb-4 mx-auto md:mx-0 animate-pulse"></div>

        <h1 className="text-5xl md:text-6xl font-light tracking-wide text-neutral-900 leading-tight transition-all duration-500 hover:tracking-widest">
          Discover the{" "}
          <span className="bg-gradient-to-r from-gray-800 via-black to-gray-600 bg-clip-text text-transparent font-medium">
            Art of Simplicity
          </span>
          <div className="w-32 h-[2px] bg-gradient-to-r from-black to-gray-500 mt-3 animate-pulse"></div>
        </h1>

        <p className="text-neutral-600 text-lg leading-relaxed">
          Redefine your everyday essentials with our{" "}
          <span className="font-medium text-neutral-800">modern minimal</span>{" "}
          designs. Sustainable, comfortable, and bold — made for those who
          reinvent themselves with confidence and purpose.
        </p>

        <div className="flex gap-4 justify-center md:justify-start mt-6">
          <button className="bg-black text-white px-7 py-3 rounded-full hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-xl">
            Shop Now
          </button>
          <button className="border border-neutral-400 px-7 py-3 rounded-full hover:bg-neutral-200 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      <div className="flex justify-center md:justify-end w-full md:w-auto">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="h-[90vh] w-[60vh] object-cover rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 md:ml-[4rem]"
        />
      </div>
    </div>
  );
}
