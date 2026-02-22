import { LOGIN, newRequest } from "@/api/api";
import { useUserLogin } from "@/hook/useUserLogin";
import { Eye, EyeOff, LogIn, User } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const token = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isLoading } = useUserLogin(
    newRequest,
    LOGIN,
    "/admin"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // ✅ SEND JSON (NOT FormData)
  const onSubmit = (data) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  // ✅ If token exists → redirect
  if (token) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <User size={32} className="text-gray-800 bg-gray-100 p-1 rounded-lg mb-2" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Let’s Get You Back In
          </h2>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Connect to your account and keep things moving.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              disabled={isLoading}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-gray-500 focus:border-gray-500"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password", { required: "Password is required" })}
                disabled={isLoading}
                className="w-full py-2 outline-none"
              />
              {showPassword ? (
                <Eye
                  className="cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeOff
                  className="cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2 px-4 rounded-lg text-white bg-gray-800 hover:bg-gray-900 disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : (
              <>
                <LogIn size={18} className="mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};