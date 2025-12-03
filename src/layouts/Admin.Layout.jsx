import Header from "@/components/Header";
import { adminNavLinks } from "@/constants/layout";
import Footer from "@/pages/Footer";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  let token = localStorage.getItem("token");
  return token ? (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header navLinks={adminNavLinks} />

      <main className="grow pt-[100px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};
