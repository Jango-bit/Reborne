import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import products from "../data/Product";
import { useQuery } from "@tanstack/react-query";
import { basicRequest, PRODUCTS } from "@/api/api";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 5;
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["productListing", currentPage, pageLimit],
    queryFn: () =>
      basicRequest
        .get(PRODUCTS, {
          params: {
            limit: pageLimit,
            page: currentPage,
          },
        })
        .then((res) => res?.data),
    staleTime: 0,
    cacheTime: 0,
  });

  return (
    <div className="relative bg-linear-to-b from-neutral-50 via-white to-neutral-100 min-h-screen py-24 px-4 md:px-16 overflow-hidden">
      {/* Animated Background Blur */}
      <motion.div
        className="absolute inset-0 bg-linear-to-tr from-gray-100 via-white to-gray-200 opacity-70 blur-3xl -z-10"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Heading Section */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-5xl md:text-6xl font-extrabold text-center mb-10 tracking-tight leading-tight bg-clip-text text-transparent bg-linear-to-r from-black via-gray-700 to-gray-900"
      >
        Discover the Art of
        <br />
        <span className="bg-linear-to-r from-gray-900 via-neutral-800 to-black bg-clip-text text-transparent">
          Modern Minimalism
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-neutral-600 text-center text-lg md:text-xl max-w-3xl mx-auto mb-16"
      >
        Redefine comfort and confidence with our minimal streetwear collection —
        where timeless design meets sustainable craftsmanship.
      </motion.p>

      {/* ✅ One Button to View All Products */}
      <div className="text-center mb-16">
        <button
          onClick={() => navigate("/products")}
          className="px-8 py-3 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-900 transition"
        >
          View All Products
        </button>
      </div>
      {/* Products Grid (optional preview) */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        {data?.products?.length > 0 &&
          data?.products?.map((product, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(`/products/${product?._id}`)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.07,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.04 }}
              className="cursor-pointer group text-center"
            >
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                <motion.img
                  src={product?.images?.[0]?.url}
                  alt={product?.images?.[0]?.alt}
                  className="w-full h-[340px] object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>

              <div className="mt-4">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 tracking-tight">
                  {product?.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {product?.category?.name ?? ""}
                </p>
                <p className="mt-2 text-gray-800 font-medium">
                  {product?.price}
                </p>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
