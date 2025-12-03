import ScrollBack from "@/components/ScrollTo";
import { AdminLayout } from "@/layouts/Admin.Layout";
import Layout from "@/layouts/Layout";
import AboutPage from "@/pages/AboutPage";
import { Dashboard } from "@/pages/admin/Dashboard";
import { ProductCreate } from "@/pages/admin/product/ProductCreate";
import { ProjectList } from "@/pages/admin/product/ProjectList";
import AllProductsPage from "@/pages/AllProductsPage";
import { Login } from "@/pages/auth/Login";
import LandingPage from "@/pages/home/Landingpage";
import ProductPage from "@/pages/ProductPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Router>
      <ScrollBack />
      <Routes>
        <Route path="/auth" element={<Layout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="products" element={<AllProductsPage />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
         <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product" element={<ProjectList />} />
        <Route path="product/create" element={<ProductCreate />} />
      </Route>
      </Routes>
     

    </Router>
  );
};
