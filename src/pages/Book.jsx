import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../api/index.js";
import { CircularProgress, Container, Box, Typography, Button, Avatar } from "@mui/material";
import { useDispatch } from "react-redux";

const Book = ({setCurrentId}) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user =JSON.parse( localStorage.getItem("profile")); 

  // Function to fetch the post
  const getPost = async (id) => {
    try {
      const { data } = await api.fetchPost(id);
      setPost(data); 
    } catch (error) {
      console.error("Error fetching post:", error); 
    }
  };

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [id]);
  const handleEdit = () =>{
    setCurrentId(id);
    navigate("/form");
  }
  const handleDelete = async () =>{
      await api.deletePost(id);
      navigate("/")
    dispatch({type:"DELETE_POST",payload:id})
  }
  const handleTakeBook = async () => {
    
  }

  return (
    <Container
      sx={{
        width: "80%",
        height: "auto",
        margin: "50px auto",
        display: "flex",
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Low opacity for the container
        borderRadius: "8px",
        boxShadow: 3,
        padding: "20px",
        backdropFilter: "blur(10px)", // Optional: adds a blur effect to the background
      }}
    >
      {post ? (
        <>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            <Avatar
              alt={post.title}
              src={post.selectedFile} // Assuming the post contains an image URL
              sx={{
                width: "200px",
                height: "300px",
                objectFit: "cover",
                borderRadius: "5px",
                boxShadow: 2,
              }}
            />
          </Box>
          <Box
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h3" sx={{ color: "#D9A05B", fontWeight: "bold" }}>
              {post.title}
            </Typography>
            <Typography variant="h6" sx={{ color: "#E1E5EE", marginBottom: "10px" }}>
              Author: {post.author}
            </Typography>
            <Typography variant="body2" sx={{ color: "#E1E5EE", marginBottom: "20px" }}>
              Description:{post.desc}
            </Typography>
            <Typography variant="body1" sx={{ color: "#A8A8A8", marginBottom: "10px" }}>
              Pages: {post.pages}
            </Typography>
            <Typography variant="h5" sx={{ color: "#D9A05B", marginBottom: "20px" }}>
              Price: ${post.price}
            </Typography>
            <Button
              variant="contained"
              onClick={handleTakeBook}
              sx={{
                backgroundColor: "#D9A05B",
                color: "#2E3B4E",
                "&:hover": {
                  backgroundColor: "#B68A44",
                },
              }}
            >
              Take the Book
            </Button>
            {user?.result?.role === "admin" && (
              <Box sx={{ display: "flex", marginTop: "20px" }}>
                <Button
                  variant="outlined"
                  onClick={handleEdit}
                  sx={{
                    marginRight: "10px",
                    borderColor: "#D9A05B",
                    color: "#D9A05B",
                    "&:hover": {
                      backgroundColor: "#D9A05B",
                      color: "#2E3B4E",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleDelete}
                  sx={{
                    borderColor: "#A64D4D",
                    color: "#A64D4D",
                    "&:hover": {
                      backgroundColor: "#A64D4D",
                      color: "#fff",
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <Container
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Container>
      )}
    </Container>
  );
};

export default Book;
