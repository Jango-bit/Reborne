import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../pages/Footer";
import { publicNavLinks } from "@/constants/layout";
import { newRequest, USER_PROFILE } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export default function Layout() {

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header navLinks={publicNavLinks} />

      <main className="grow pt-[100px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
