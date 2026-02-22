import axios from "axios";

/* ================= BASE CONFIG ================= */
const baseConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

/* ================= AXIOS INSTANCES ================= */
export const basicRequest = axios.create(baseConfig);

export const newRequest = axios.create({
  ...baseConfig,
  headers: {
    "Content-Type": "application/json",
  },
});

export const newFormRequest = axios.create({
  ...baseConfig,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */
const attachToken = (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

newRequest.interceptors.request.use(attachToken);
newFormRequest.interceptors.request.use(attachToken);

/* ================= RESPONSE INTERCEPTOR ================= */
const handleUnauthorized = (error) => {
  const status = error?.response?.status;

  if (status === 401) {
    localStorage.removeItem("token");
  }

  return Promise.reject(error);
};

newRequest.interceptors.response.use(
  (response) => response,
  handleUnauthorized
);

newFormRequest.interceptors.response.use(
  (response) => response,
  handleUnauthorized
);

/* ================= API ROUTES (FIXED) ================= */
export const LOGIN = "/api/users/login";
export const USER_PROFILE = "/api/users";
export const PRODUCTS = "/api/products";
export const CATEGORY = "/api/categories";
export const ORDERS = "/api/orders";