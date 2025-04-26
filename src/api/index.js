import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const API = axios.create({ baseURL: API_URL });

// API.interceptors.request.use((request) => {
//   console.log("Starting Request", request);
//   return request;
// });

export const signUp = (formData) => API.post("/user/signup", formData);
export const signIn = (formData) => API.post("/user/signin", formData);
export const fetchUsers = () => API.get("/user");
export const fetchUser = (id) => API.get(`/user/${id}`);
export const fetchSearchUsers = (searchText) =>
  API.get(`/user/searchUsers?searchText=${searchText}`);
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const updateUser =  (id, updatedUser) =>
  API.patch(`/user/${id}`, updatedUser);

export const takeBook = (userId,bookId) => API.patch("/posts/takeBook",{userId,bookId});
export const returnBook = (userId,bookId) => API.patch("/posts/returnBook",{userId,bookId});
export const fetchPosts = () => API.get("/posts");
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchSearchPosts = (searchText) =>
  API.get(`/posts/searchPosts?searchText=${searchText}`);
export const createPost =  (newPost) => API.post("/posts", newPost);
export const deletePost =  (id) => API.delete(`/posts/${id}`);
export const updatePost =  (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
