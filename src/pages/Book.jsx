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

  const handleEdit = () => {
    setCurrentId(id);
    navigate("/form");
  };

  const handleDelete = async () => {
    await api.deletePost(id);
    dispatch({ type: "DELETE_POST", payload: id });
    console.log("Book deleted");
    navigate("/");
  };

  const currentUser = JSON.parse(localStorage?.getItem("profile"))?.result;
  const handleBook = async () => {
    const userId = user?.result?._id;
    const bookId = id;

    if (authData?.result.book.includes(bookId)) {
      await api.returnBook(userId, bookId);
      dispatch({ type: "RETURN", payload: { userId, bookId } });
    } else {
      try {
        await api.takeBook(userId, bookId);
        dispatch({ type: "TAKE", payload: { userId, bookId } });
      } catch (error) {
        console.error("Error taking book:", error);
      }
    }
  };

  return (
    <Container
      sx={{
        width: { xs: "100%", sm: "80%" },
        height: { xs: "100vh", sm: "auto" },
        margin: "100px auto",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "8px",
        boxShadow: 3,
        padding: "20px",
        backdropFilter: "blur(10px)",
        alignItems: "center",
        justifyContent: "center",
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
              marginBottom: { xs: "20px", sm: "0" },
              marginLeft: { sm: "20px" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Avatar
              alt={post.title}
              src={post.selectedFile}
              sx={{
                width: { xs: "150px", sm: "200px" },
                height: { xs: "225px", sm: "300px" },
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
              alignItems: { xs: "center", sm: "flex-start" },
              textAlign: { xs: "center", sm: "left" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#D9A05B",
                fontWeight: "bold",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#E1E5EE",
                marginBottom: "10px",
              }}
            >
              Author: {post.author}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#E1E5EE",
                marginBottom: "20px",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Description: {post.desc}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#A8A8A8",
                marginBottom: "10px",
              }}
            >
              Pages: {post.pages}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#D9A05B",
                marginBottom: "20px",
              }}
            >
              Price: ${post.price}
            </Typography>

            {currentUser ? (
              <Button
                variant="contained"
                onClick={handleBook}
                disabled={
                  !post.available && !authData?.result.book.includes(id)
                }
                sx={{
                  backgroundColor: authData?.result.book.includes(id)
                    ? "#D9A05B"
                    : !post.available
                    ? "#999999"
                    : "#D9A05B",
                  color: "#2E3B4E",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": {
                    backgroundColor: authData?.result.book.includes(id)
                      ? "#B68A44"
                      : !post.available
                      ? "#999999"
                      : "#B68A44",
                  },
                }}
              >
                {authData?.result.book.includes(id)
                  ? "Return Book"
                  : !post.available
                  ? "Not Available"
                  : "Take Book"}
              </Button>
            ) : null}
            {user?.result?.role === "admin" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  marginTop: "20px",
                  alignItems: { xs: "center", sm: "flex-start" },
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleEdit}
                  sx={{
                    marginBottom: { xs: "10px", sm: "0" },
                    marginRight: { sm: "10px" },
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
