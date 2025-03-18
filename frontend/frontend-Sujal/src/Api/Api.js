import axios from "axios";

const config = {
  headers: {
    // authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
};

const api = axios.create({
  baseURL: "http://localhost:3000",
  // withCredentials: true,
  // ...config,
  // withCredentials: true,
  // headers: {
  //   "Content -Type": "application/json",
  // },
});

export const tesApi = () => api.get("/test");
// register user api
export const registerUserApi = (data) => api.post("/api/users/create", data);

// Login user API
export const loginUserApi = (data) => api.post("/api/users/login", data);
export const HomepageApi = (data) => api.post("api/users/homepage", data);

// create product create api
export const createProductApi = (data) => api.post("/api/product/create", data);

// fetch all products
export const getAllProducts = (category) =>
  api.get(`/api/product/get_all_products?category=${category ?? ""}`, config);

//fetch single product
export const getSingleProduct = (id) =>
  api.get(`/api/product/get_single_product/${id}`, config);

// delete product (Task)
export const deleteProduct = (id) =>
  api.delete(`/api/product/delete_product/${id}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});

// update product
export const updateProduct = (id, data) =>
  api.put(`/api/product/update_product/${id}`, data, config);
// Function to send OTP to the user's email
export const sendOtpApi = (email) => api.post("/api/users/send-otp", { email });

// Function to verify the OTP entered by the user
export const verifyOtpApi = (email, otp) =>
  api.post("/api/users/verify-otp", { email, otp });

// Function to reset the user's password
export const resetPasswordApi = (email, newPassword) =>
  api.post("/api/users/reset-password", { email, newPassword });

// Function to search products
export const searchProducts = (searchQuery) =>
  api.get(`/api/product/search_products?query=${searchQuery}`, config);

export const getCartItems = (userId) =>
  api.get(`/api/cart/list?userId=${userId}`, config);

// addToCart
export const addToCart = (userId, products) =>
  api.post(`/api/cart/add`, { userId, products });

// remove from cart
export const removeFromCart = (userId, productId) =>
  api.post(`/api/cart/remove`, { userId, productId });
