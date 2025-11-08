import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react";
import ReborneHome from "../assets/Images/Home1.png.jpg";
import ReborneHome1 from "../assets/Images/Home2.png.jpg";
import CenterPage from "./CenterPage";
import Products from "../data/Products";
import AboutPage from "../pages/AboutPage";

export default function LandingPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [ReborneHome, ReborneHome1];

  // 🔹 Auto change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* ❌ Removed <Header /> */}

      {/* 🔹 HERO SECTION */}
      <section className="pt-28 pb-16 flex items-center justify-center bg-neutral-100 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center px-4 text-center">
          {/* Rotating Image */}
          <div className="relative w-64 sm:w-80 md:w-96 lg:w-[500px]">
            <img
              src={images[currentImage]}
              alt="Reborne Home Banner"
              className="w-full h-auto object-contain drop-shadow-md transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Title */}
          <h1 className="mt-10 text-3xl sm:text-4xl md:text-5xl font-light tracking-widest text-neutral-800">
            REBORNE COLLECTION
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-neutral-500 max-w-xl">
            Elevate your essentials — sustainable, minimal, and bold. Explore
            the latest collection made for those who reinvent.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-neutral-800 transition-all duration-300">
              <ShoppingCart size={18} /> Shop Now
            </button>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-3 border border-neutral-300 rounded-full hover:bg-neutral-200 transition"
            >
              <Heart
                size={20}
                className={isLiked ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={() =>
            setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
          }
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition"
        >
          <ChevronRight size={22} />
        </button>
      </section>

      {/* 🔹 CENTER PAGE SECTION */}
      <div className="mt-20">
        <CenterPage />
      </div>

      {/* 🔹 PRODUCTS SECTION */}
      <div className="mt-20">
        <Products />
      </div>

      {/* 🔹 ABOUT SECTION */}
      <div id="About" className="mt-20">
        <AboutPage />
      </div>
    </div>
  );
}
