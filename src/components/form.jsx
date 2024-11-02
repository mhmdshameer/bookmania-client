import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ImageUploader from "./ImageUploader";
import { useNavigate } from "react-router-dom";
import { createPost } from "../action/posts";

const theme = createTheme();

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    author: "",
    genre:"",
    price:"",
    pages: "",
    selectedFile: "",
  });
//   const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const post = useSelector((state) => {
    return currentId ? state.posts.posts.find((p) => p._id === currentId) : null;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    // setCurrentId(null);
    setPostData({
        title: "",
        author:"",
        genre:"",
        price:"",
        pages: "",
        selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (currentId) {
    //   dispatch(updatePost(currentId, postData));
    // } else {
      dispatch(
        createPost({
          ...postData,
         navigate
        })
      );
    // }
    clear();
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          padding: theme.spacing(2),
          backgroundColor: "white",
          margin: "auto",
          marginTop: "30px",
          width: {
            xs: "100%", 
            sm: "500px",
            md: "600px", 
            lg: "700px", 
          },
        }}
      >
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" align="center">
            {currentId ? "Edit" : "Create"} new book
          </Typography>

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            sx={{ marginBottom: 2 }}
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="author"
            variant="outlined"
            label="Author"
            sx={{ marginBottom: 2 }}
            fullWidth
            value={postData.author}
            onChange={(e) =>
              setPostData({ ...postData, author: e.target.value })
            }
          />
          <TextField
            name="genre"
            variant="outlined"
            label="Genre"
            sx={{ marginBottom: 2 }}
            fullWidth
            value={postData.genre}
            onChange={(e) =>
              setPostData({ ...postData, genre: e.target.value })
            }
          />
          <TextField
            name="pages"
            variant="outlined"
            label="Pages"
            sx={{ marginBottom: 2 }}
            fullWidth
            value={postData.pages}
            onChange={(e) =>
              setPostData({ ...postData, pages: e.target.value })
            }
          />
          <TextField
            name="price"
            variant="outlined"
            label="Price"
            sx={{ marginBottom: 2 }}
            fullWidth
            value={postData.price}
            onChange={(e) =>
              setPostData({ ...postData, price: e.target.value })
            }
          />
        
          <ImageUploader setPostData={setPostData} postData={postData} />
          <Button
            sx={{ marginBottom: `${theme.spacing(1)} !important` }} // Adding '!important' like you had
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </ThemeProvider>
  );
};

export default Form;
