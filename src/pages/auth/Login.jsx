import { basicRequest, basicXFormRequest, LOGIN, newRequest } from "@/api/api";
import { useUserLogin } from "@/hook/useUserLogin";
import { Eye, EyeOff, LogIn, User } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export const Login = () => {
  let token = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isLoading } = useUserLogin(newRequest, LOGIN, "#/admin");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    //TODO: add shemas
    //resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data?.email);
    formData.append("password", data?.password);
    mutate(formData);
  };

  return !token ? (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transition duration-300 hover:shadow-3xl">
        <div className="flex flex-col items-center mb-8">
          <User
            size={32}
            className="text-gray-800 bg-gray-100 p-1 rounded-lg mb-2"
          />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Let’s Get You Back In
          </h2>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Connect to your account and keep things moving.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <input
                type="email"
                required
                placeholder="you@example.com"
                {...register("email")}
                className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition"
                disabled={isLoading}
              />
            </div>
            {errors?.email && (
              <span className="text-xs font-medium text-red-500">
                {errors?.email?.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="appearance-none flex justify-between items-center w-full px-3  border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="********"
                {...register("password")}
                className="w-full h-full py-2"
                disabled={isLoading}
              />
              {showPassword ? (
                <Eye
                  onClick={() => setShowPassword(false)}
                  className="cursor-pointer text-[#B5B5B5]"
                />
              ) : (
                <EyeOff
                  onClick={() => setShowPassword(true)}
                  className="cursor-pointer text-[#B5B5B5]"
                />
              )}
            </div>
            {errors?.password && (
              <span className="text-xs font-medium text-red-500">
                {errors?.password?.message}
              </span>
            )}
          </div>

          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-500 transition duration-150"
            >
              Forgot your password?
            </a>
          </div> */}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition duration-200 bg-gray-800 hover:bg-gray-900 focus:ring-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={18} className="mr-2" />
                Sign in as
              </>
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => setView("main")}
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            &larr; Back to Main Website
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/admin" replace />
  );
};
