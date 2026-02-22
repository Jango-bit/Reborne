import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, UserRound, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoReborne from "/assets/Images/ReborneLogo.png";
import allProducts from "../data/allProducts";
import { useQuery } from "@tanstack/react-query";
import { newRequest, USER_PROFILE } from "@/api/api";

export default function Header({ navLinks = [] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => newRequest.get(USER_PROFILE).then((res) => res?.data),
    retry: false,
  });

  /* ================= SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= NAV CLICK ================= */
  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);

    if (path === "home") {
      if (location.pathname !== "/") navigate("/");
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById("About")?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      } else {
        document.getElementById("About")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  /* ================= ADMIN REDIRECT ================= */
  useEffect(() => {
    if (data?.isAdmin && !location.pathname.includes("/admin")) {
      navigate("/admin");
    }
  }, [data?.isAdmin, location.pathname, navigate]);

  /* ================= SEARCH ================= */
  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={`fixed top-0 w-full z-50 border-b backdrop-blur-lg transition-all ${
        isScrolled
          ? "bg-white/80 border-neutral-300 shadow-md py-2"
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            <img
              src={LogoReborne}
              alt="Reborne"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            />
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-[0.3em]">
              REBORNE
            </h1>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-10 text-sm">
            {navLinks.map((item) => (
              <div key={item.value}>
                {item.onClick ? (
                  <button onClick={() => handleNavClick(item.value)}>
                    {item.name}
                  </button>
                ) : (
                  <Link to={item.path}>{item.name}</Link>
                )}
              </div>
            ))}
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSearchOpen(true)}>
              <Search size={22} />
            </button>

            {/* DESKTOP LOGIN ICON */}
            <Link
              to="/auth/login"
              className="hidden sm:flex p-2 rounded-full hover:bg-neutral-200"
            >
              <UserRound size={22} />
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-4 flex flex-col gap-4 border-t pt-4"
            >
              {navLinks.map((item) => (
                <div key={item.value}>
                  {item.onClick ? (
                    <button onClick={() => handleNavClick(item.value)}>
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* MOBILE LOGIN */}
              <Link
                to="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm"
              >
                <UserRound size={18} />
                Login
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <div
            className="fixed inset-0 bg-black/30 flex justify-center pt-24"
            onClick={() => setIsSearchOpen(false)}
          >
            <div
              className="bg-white p-6 rounded-xl w-[90%] max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full border-b outline-none"
              />

              <div className="mt-4 max-h-60 overflow-y-auto">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      navigate(`/products/${p.id}`);
                      setIsSearchOpen(false);
                      setSearchTerm("");
                    }}
                    className="cursor-pointer py-2"
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}