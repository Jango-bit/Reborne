import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, UserRound, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoReborne from "../assets/Images/ReborneLogo.png";
import allProducts from "../data/allProducts"; 

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Navigation handlers
  const handleHomeClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") navigate("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAboutClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(
        () =>
          document.getElementById("About")?.scrollIntoView({
            behavior: "smooth",
          }),
        500
      );
    } else {
      document.getElementById("About")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // 🔹 Nav links
  const navLinks = [
    { name: "Home", onClick: handleHomeClick },
    { name: "Products", path: "/products" },
    { name: "About", onClick: handleAboutClick },
  ];

  // ✅ FIX: use centralized allProducts for filtering
  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 border-b backdrop-blur-lg transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 border-neutral-300 shadow-md py-2"
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">
          {/* 🔸 Logo */}
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={handleHomeClick}
          >
            <motion.img
              src={LogoReborne}
              alt="Reborne Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.h1
              className="text-2xl sm:text-3xl font-semibold tracking-[0.3em] text-neutral-900 group-hover:text-black transition-all duration-300"
              whileHover={{ letterSpacing: "0.5em" }}
            >
              REBORNE
            </motion.h1>
          </div>

          {/* 🔸 Desktop Nav */}
          <nav className="hidden lg:flex gap-10 text-[15px] font-light tracking-wide">
            {navLinks.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                className="relative py-2 text-neutral-700 hover:text-black transition-colors duration-300"
              >
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="text-neutral-700 hover:text-black transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="text-neutral-700 hover:text-black transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </nav>

          {/* 🔸 Right Buttons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.button
              className="p-2 rounded-full hover:bg-neutral-200 transition-all duration-300"
              whileHover={{ scale: 1.15 }}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={22} />
            </motion.button>

            <motion.button
              className="hidden sm:flex p-2 rounded-full hover:bg-neutral-200 transition-all duration-300"
              whileHover={{ scale: 1.15 }}
            >
              <UserRound size={22} />
            </motion.button>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-neutral-200 transition-all duration-300"
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.button>
          </div>
        </div>

        {/* 🔹 Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="lg:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-neutral-300 pt-3"
            >
              {navLinks.map((item) => (
                <motion.div key={item.name} whileHover={{ x: 6 }}>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="text-sm text-neutral-700 hover:text-black transition-all duration-300 flex items-center gap-2"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm text-neutral-700 hover:text-black transition-all duration-300 flex items-center gap-2"
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* 🔍 Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[90px] left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-40"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsSearchOpen(false);
                setSearchTerm("");
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-[480px] max-h-[70vh] mt-6 p-6 relative overflow-hidden"
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchTerm("");
                }}
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-3 mb-5 border-b pb-2 border-neutral-300">
                <Search size={22} className="text-gray-600" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none text-gray-800 placeholder-gray-400"
                />
              </div>

              <div className="max-h-[55vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {searchTerm === "" ? (
                  <p className="text-gray-500 text-sm text-center pt-4">
                    Type something to search
                  </p>
                ) : filteredProducts.length > 0 ? (
                  <ul className="space-y-3">
                    {filteredProducts.map((product) => (
                      <li
                        key={product.id}
                        onClick={() => {
                          navigate(`/products/${product.id}`);
                          setIsSearchOpen(false);
                          setSearchTerm("");
                        }}
                        className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-all"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800 text-sm sm:text-base">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {product.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm text-center pt-4">
                    No products found
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
