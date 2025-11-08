

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import allProducts from "../data/allProducts";

export default function AllProductsPage() {
  // 🔍 Search, filter & sort state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("Featured");

  // 🧠 Filtering Logic
  const filteredProducts = allProducts
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category === "All" ? true : p.category === category))
    .filter((p) => (brand === "All" ? true : p.brand === brand))
    .sort((a, b) => {
      if (sort === "Price: Low → High") return a.priceValue - b.priceValue;
      if (sort === "Price: High → Low") return b.priceValue - a.priceValue;
      return 0;
    });

  return (
    <div className="relative min-h-screen bg-neutral-50 py-28 px-6 md:px-20 overflow-hidden">
      {/* 🌈 Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-center mb-4 tracking-tight text-gray-900 uppercase"
      >
        <span className="bg-gradient-to-r from-black via-gray-700 to-gray-900 bg-clip-text text-transparent">
          Our Collection
        </span>
      </motion.h1>

      <p className="text-center text-gray-500 text-lg mb-16">
        Explore our exclusive range of fashion essentials — from classic tees to premium denim.
      </p>

      {/* 🔍 Filter & Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-[1400px] mx-auto mb-12 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div className="flex flex-wrap justify-center gap-4">
          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-3 focus:ring-2 focus:ring-black"
          >
            <option>All</option>
            <option>Shirts</option>
            <option>T-Shirts</option>
            <option>Jeans</option>
            <option>Sneakers</option>
            <option>Accessories</option>
          </select>

          {/* Brand Filter */}
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-3 focus:ring-2 focus:ring-black"
          >
            <option>All</option>
            <option>Nike</option>
            <option>Adidas</option>
            <option>Zara</option>
            <option>Levi’s</option>
            <option>H&M</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-3 focus:ring-2 focus:ring-black"
          >
            <option>Featured</option>
            <option>Price: Low → High</option>
            <option>Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            {/* Wrap whole card with Link */}
            <Link
              to={`/products/${product.id}`}
              className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 block"
            >
              {/* ❤️ Wishlist Icon */}
              <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md rounded-full p-2 hover:bg-black hover:text-white transition">
                <Heart size={18} />
              </div>

              {/* 🖼️ Product Image */}
              <div className="overflow-hidden rounded-t-3xl relative">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>
              </div>

              {/* 🧾 Product Info */}
              <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-black transition">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                <p className="mt-3 text-lg font-semibold text-gray-800">
                  ₹{product.price}
                </p>
              </div>

              {/* ✨ Click overlay for interaction */}
              <div className="absolute inset-0 rounded-3xl bg-black/5 opacity-0 group-hover:opacity-100 transition duration-300" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 📦 Load More Button */}
      <div className="text-center mt-16">
        <button className="px-8 py-3 border border-gray-800 rounded-full hover:bg-black hover:text-white transition font-medium">
          Load More
        </button>
      </div>

      {/* 💨 Floating Background Lights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-gray-200 via-gray-300 to-white rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.6 }}
        className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-gray-300 via-gray-200 to-white rounded-full blur-3xl"
      />
    </div>
  );
}
