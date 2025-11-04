import React, { useState, useEffect } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import LogoReborne from "../assets/Images/ReborneLogo.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-neutral-300 shadow-sm py-2"
          : "bg-neutral-100 border-neutral-200 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8">
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                <img
                  src={LogoReborne}
                  alt="Reborne Logo"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-light tracking-widest hidden sm:block transition-all duration-300 group-hover:tracking-wider">
                REBORNE
              </h1>
            </a>

            <nav className="hidden lg:flex gap-8 text-sm font-light tracking-wide">
              {["Home", "Catalog", "About"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="relative py-2 hover:opacity-70 transition-opacity duration-300 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button
              className="p-2 hover:bg-neutral-200 rounded-full transition-all duration-300 hover:scale-110 group"
              aria-label="Search"
            >
              <Search
                size={20}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
            </button>

            <button
              className="hidden sm:flex p-2 hover:bg-neutral-200 rounded-full transition-all duration-300 hover:scale-110 group"
              aria-label="Account"
            >
              <User
                size={20}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
            </button>

            <button
              className="relative p-2 hover:bg-neutral-200 rounded-full transition-all duration-300 hover:scale-110 group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart
                size={20}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-neutral-200 rounded-full transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100 mt-3"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-4 py-3 border-t border-neutral-300">
            {["Home", "Catalog", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm hover:opacity-70 transition-all duration-300 hover:translate-x-2 flex items-center gap-2"
              >
                {item}
              </a>
            ))}
            <a
              href="#"
              className="text-sm hover:opacity-70 transition-all duration-300 hover:translate-x-2 flex items-center gap-2"
            >
              <User size={16} /> Account
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
