import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowLeft, ArrowUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { basicRequest, PRODUCTS } from "@/api/api";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("default");
  const { isLoading, error, data } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () =>
      basicRequest.get(`${PRODUCTS}/${id}`, {}).then((res) => res?.data),
    staleTime: 0,
    cacheTime: 0,
    enabled: !!id,
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const { data: similarProducts } = useQuery({
    queryKey: ["similarProducts", id],
    queryFn: () =>
      basicRequest
        .get(PRODUCTS, {
          params: {
            search: data?.category?.name,
            limit: 10,
          },
        })
        .then((res) => res?.data),
    staleTime: 0,
    cacheTime: 0,
    enabled: !!data?._id,
  });
  if (!data) {
    return (
      <div className="text-center py-40 text-gray-700 text-xl">
        Product not found 😢
      </div>
    );
  }

  const phoneNumber = "917356179857";
  const message = `👋 Hello! I'm interested in this product:\n\n🛍️ *${data?.name}*\n🏷️ Brand: ${data?.brand}\n💰 Price: ${data?.price}\n\nCan you share more details?`;
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-100 via-white to-neutral-50 flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 pt-28 pb-16 space-y-14">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-200"
      >
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <motion.img
            src={data?.images?.[0]?.url}
            alt={data?.name}
            className="w-full h-[250px] sm:h-80 md:h-[400px] object-cover"
            whileHover={{
              scale: 1.04,
              transition: { duration: 0.4 },
            }}
          />
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-5 sm:p-7 md:p-8 space-y-4"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug">
            {data?.name}
          </h1>

          <div className="flex items-center gap-2 text-neutral-600 text-sm sm:text-base">
            <Star className="text-yellow-500 fill-yellow-400" size={16} />
            <span>{data?.brand}</span>
          </div>

          <p className="text-neutral-700 text-sm sm:text-base leading-relaxed line-clamp-4">
            {data?.description}
          </p>

          <p className="text-xl sm:text-2xl font-semibold text-green-700">
            {data?.price}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-3">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-full font-medium hover:bg-green-700 transition-all text-sm sm:text-base"
            >
              <img
                src="/assets/icon/whatsapp.svg"
                alt="whatsapp"
                className="size-8"
              />{" "}
              WhatsApp
            </motion.a>
          </div>

          <div className="pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-all text-sm font-medium"
            >
              <ArrowLeft size={14} />
              Back to Products
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* 🛍️ Similar Products */}

      {similarProducts?.products?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-6xl border-t border-neutral-200 pt-10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Similar Products
            </h2>

            {/* 🔽 Sort Dropdown */}
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <ArrowUpDown size={16} />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-neutral-300 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-neutral-400 transition"
              >
                <option value="default">Sort by</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {similarProducts?.products?.map((item) => (
              <motion.div
                key={item?._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white border border-neutral-200 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all"
                onClick={() => navigate(`/products/${item._id}`)}
              >
                <img
                  src={item?.images?.[0]?.url}
                  alt={item?.images?.[0]?.alt}
                  className="w-full h-40 sm:h-48 object-cover rounded-t-xl"
                />
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-semibold text-neutral-800 truncate">
                    {item?.name}
                  </h3>
                  <p className="text-green-700 text-sm font-medium mt-1">
                    {item?.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
