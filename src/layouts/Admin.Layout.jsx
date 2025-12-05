import Header from "@/components/Header";
import { adminNavLinks } from "@/constants/layout";
import Footer from "@/pages/Footer";
import React, { useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import {
  Menu,
  Boxes,
  Layers,
  Users,
  ShoppingBag,
  CreditCard,
  LogIn,
  LogOut,
} from "lucide-react";
export const AdminLayout = () => {
  let token = localStorage.getItem("token");
  const [open, setOpen] = useState(true);

  const menuItems = [
    {
      id: 1,
      name: "Products",
      icon: <Boxes size={20} />,
      link: "/admin/product",
    },
    {
      id: 2,
      name: "Categories",
      icon: <Layers size={20} />,
      link: "/admin/category",
    },
    { id: 3, name: "Users", icon: <Users size={20} />, link: "#" },
    { id: 4, name: "Orders", icon: <ShoppingBag size={20} />, link: "#" },
    { id: 5, name: "Payments", icon: <CreditCard size={20} />, link: "#" },
    {
      id: 6,
      name: "Logout",
      icon: <LogOut size={20} />,
      onclick: () => {
        localStorage.clear();
        window.location.href = "/auth/ogin"; // optional redirect
      },
    },
  ];
  return token ? (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header navLinks={adminNavLinks} />

      <div className="flex w-full min-h-screen bg-gray-50 font-sans pt-24">
        {/* ---------------- Sidebar ---------------- */}
        <div
          className={`${
            open ? "w-64" : "w-20"
          } bg-white  shadow-sm transition-all duration-300`}
        >
          <div className="flex items-center justify-between p-5">
            <h1
              className={`text-2xl font-bold tracking-wide ${
                !open && "hidden"
              }`}
            >
              REBORNE
            </h1>

            <button onClick={() => setOpen(!open)} className="text-gray-700">
              <Menu size={22} />
            </button>
          </div>

          {/* Menu List */}
          <ul className="mt-5">
            {menuItems.map((item) => (
              <Link
                to={item?.link}
                onClick={() => item?.onclick?.()}
                key={item.id}
                className="flex items-center gap-4 px-6 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 transition rounded-md"
              >
                {item.icon}
                {open && (
                  <span className="text-md font-medium">{item.name}</span>
                )}
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex-1 px-10">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};
