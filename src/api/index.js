import axios from "axios"

const API = axios.create({baseURL: "http://localhost:5000"})

API.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
  });  

export const signUp = (formData) => API.post("/user/signup",formData);
export const signIn = (formData) => API.post("/user/signin",formData);
export const fetchUsers = () => API.get("/user");
export const deleteUser = (id) => API.delete(`/user/${id}`);

export const fetchPosts = () => API.get("/posts");
export const createPost = async (newPost) => {
    try {
      const response = await API.post("/posts", newPost);
      return response;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error; // Or handle it as needed
    }
  };