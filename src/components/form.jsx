import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../action/posts";
import ImageUploader from "./ImageUploader";

const theme = createTheme();

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    author: "",
    desc: "",
    genre: "",
    price: "",
    pages: "",
    selectedFile: "",
  });
  
  const navigate = useNavigate();
  const post = useSelector((state) => {
    return currentId ? state.postReducer.posts.find((p) => p._id === currentId) : null;
  });
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  console.log(postData)

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      author: "",
      desc: "",
      genre: "",
      price: "",
      pages: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId,postData))
    }else{
      dispatch(createPost({ ...postData, }));
    }
    clear();
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          padding: theme.spacing(2),
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly opaque for elegance
          margin: "auto",
          marginTop: "30px",
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Column for small screens, row for medium+
          width: {
            xs: "100%", 
            sm: "500px",
            md: "700px", 
          },
        }}
      >
        {/* Image Uploader on the left */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: { xs: 0, md: '20px' }, marginBottom: { xs: '20px', md: 0 } }}>
          <ImageUploader setPostData={setPostData} postData={postData} />
        </Box>
        {/* Form Fields on the right */}
        <Box sx={{ flex: 2 }}>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
              {currentId ? "Edit" : "Create"} New Book
            </Typography>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              sx={{ marginBottom: 2 }}
              fullWidth
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            />
            <TextField
              name="author"
              variant="outlined"
              label="Author"
              sx={{ marginBottom: 2 }}
              fullWidth
              value={postData.author}
              onChange={(e) => setPostData({ ...postData, author: e.target.value })}
            />
            <TextField
              name="desc"
              variant="outlined"
              label="Description"
              sx={{ marginBottom: 2 }}
              fullWidth
              multiline
              rows={4}
              value={postData.desc}
              onChange={(e) => setPostData({ ...postData, desc: e.target.value })}
            />
            <TextField
              name="genre"
              variant="outlined"
              label="Genre"
              sx={{ marginBottom: 2 }}
              fullWidth
              value={postData.genre}
              onChange={(e) => setPostData({ ...postData, genre: e.target.value })}
            />
            <TextField
              name="pages"
              variant="outlined"
              label="Pages"
              sx={{ marginBottom: 2 }}
              fullWidth
              value={postData.pages}
              onChange={(e) => setPostData({ ...postData, pages: e.target.value })}
            />
            <TextField
              name="price"
              variant="outlined"
              label="Price"
              sx={{ marginBottom: 2 }}
              fullWidth
              value={postData.price}
              onChange={(e) => setPostData({ ...postData, price: e.target.value })}
            />
            <Button
              sx={{ marginBottom: 1 }}
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
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default Form;
