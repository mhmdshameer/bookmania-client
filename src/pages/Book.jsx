import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../api/index.js";
import {
  CircularProgress,
  Container,
  Box,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Book = ({ setCurrentId }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const authData = useSelector((state) => state.authReducers.authData);
  console.log("authData:", authData);

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
  const user1 = useSelector((state) => state.userReducer.user);
  const post1 = useSelector((state) => state);
  console.log("user:", user1, "Post:", post1);
  const handleEdit = () => {
    setCurrentId(id);
    navigate("/form");
  };
  const handleDelete = async () => {
    await api.deletePost(id);
    navigate("/");
    dispatch({ type: "DELETE_POST", payload: id });
  };
  const handleBook = async () => {
    console.log("Initial books:", authData?.result.book);
    const userId = user?.result?._id;
    const bookId = id;
  
    if (authData?.result.book.includes(bookId)) {
      console.log("Start returning book with ID:", bookId);
      await api.returnBook(userId, bookId);
      console.log("API returned successfully. Dispatching RETURN action.");
      dispatch({ type: "RETURN", payload: { userId, bookId } });
    } else {
      try {
        console.log("Start taking book with ID:", bookId);
        const response = await api.takeBook(userId, bookId);
        console.log("API returned successfully with message:", response.data.message);
        console.log("Dispatching TAKE action for book ID:", bookId);
        dispatch({ type: "TAKE", payload: { userId, bookId } });
      } catch (error) {
        console.error("Error taking book:", error);
      }
    }
  };
  

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
            <Typography
              variant="h3"
              sx={{ color: "#D9A05B", fontWeight: "bold" }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#E1E5EE", marginBottom: "10px" }}
            >
              Author: {post.author}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#E1E5EE", marginBottom: "20px" }}
            >
              Description:{post.desc}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#A8A8A8", marginBottom: "10px" }}
            >
              Pages: {post.pages}
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: "#D9A05B", marginBottom: "20px" }}
            >
              Price: ${post.price}
            </Typography>
            <Button
              variant="contained"
              onClick={handleBook}
              sx={{
                backgroundColor: "#D9A05B",
                color: "#2E3B4E",
                "&:hover": {
                  backgroundColor: "#B68A44",
                },
              }}
            >
              {authData?.result.book?.includes(id)
                ? "Return Book"
                : "Take Book"}
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
