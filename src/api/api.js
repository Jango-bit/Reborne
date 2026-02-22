import axios from "axios";
// Axios instances
const baseConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};
console.log(baseConfig,"hsg")
export const basicRequest = axios.create(baseConfig);

export const basicXFormRequest = axios.create({
  ...baseConfig,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
export const basicFormRequest = axios.create({
  ...baseConfig,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const XFormRequest = axios.create({
  ...baseConfig,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const newRequest = axios.create({
  ...baseConfig,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const newFormRequest = axios.create({
  ...baseConfig,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Request interceptors
const attachToken = (config) => {
  const token = localStorage.getItem("token");
  console.log(token)
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};
newRequest.interceptors.request.use(attachToken);
newFormRequest.interceptors.request.use(attachToken);
XFormRequest.interceptors.request.use(attachToken);

// Response interceptors
const handleUnauthorized = (error) => {
  console.log(error?.status)
  if (error && error?.status === 401) {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Optionally, you can also redirect the user to a login page or show a notification
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

XFormRequest.interceptors.response.use(
  (response) => response,
  handleUnauthorized
);

export const LOGIN = "users/login";
export const USER_PROFILE = "users";
export const PRODUCTS = "products";
export const CATEGORY = "categories";
export const ORDERS = "orders";
// export const LOGIN = "users/login";
