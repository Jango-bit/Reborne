import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../pages/Footer"; 

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header />

      <main className="flex-grow pt-[100px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
