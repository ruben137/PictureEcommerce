import axios from "axios";

const API = axios.create({ baseURL: "https://picturecommerce.herokuapp.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchCartProducts = (user) => API.get(`/cart/${user}`)
export const addCartProduct=(user,product)=>API.post(`/cart/newCartProduct/${user}`,product)
export const addPrevICartItems=(user,products)=>API.post(`/cart/addPrevItems/${user}`,products)
export const removeCartProduct=(user,id)=>API.patch(`/cart/deleteCartItem/${user}/${id}`)
export const checkIfAvailable=(id)=>API.get(`/cart/isAvailable/item/${id}`)
export const clearCart=()=>API.patch(`/cart/clearCart`)

export const fetchProducts = (page) => API.get(`/products/home/${page}`)
export const fetchProduct = (id) => API.get(`/products/getProduct/${id}`)
export const fetchPurchases=()=>API.get("/products/purchases")
export const fetchPurchasedPic=(token)=>API.get(`/products/getPurchasedPic/${token}`)
export const fetchAdminProducts=()=>API.get(`/products/adminProducts`)
export const fetchFullProduct=(id)=>API.get(`/products/fullProduct/${id}`)
export const addProduct=(product)=>API.post(`/products/addProduct`,product)
export const updateProduct=(product)=>API.patch("/products/updateProduct",product)
export const deleteProduct=(id)=>API.delete(`/products/deleteProduct/${id}`)

export const buyProducts=(user,data)=>API.post(`/products/buyProducts/${user}`,data)
export const getPurchases=()=>API.get("/products/purchases")
export const getPurchasedPics=(token)=>API.get(`/products/getPurchasedPics/${token}`)

export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);



