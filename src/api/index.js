import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

export const signUp = (formData) => API.post("/user/signup", formData);
export const signIn = (formData) => API.post("/user/signin", formData);
export const fetchUsers = () => API.get("/user");
export const deleteUser = (id) => API.delete(`/user/${id}`);

export const takeBook = (userId,bookId) => API.post("/posts/takeBook",{userId,bookId});
export const fetchPosts = () => API.get("/posts");
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost =  (newPost) => API.post("/posts", newPost);
export const deletePost =  (id) => API.delete(`/posts/${id}`);
export const updatePost =  (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
