import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"})

export const signUp = (formData) => API.post("/user/signup",formData);


export const createPost = async (newPost) => {
    try {
      const response = await API.post("/posts", newPost);
      return response;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error; // Or handle it as needed
    }
  };