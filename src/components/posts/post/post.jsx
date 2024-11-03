import React from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const openPost = () => {
     navigate(`/book/${post._id}`);
  };

  return (
    <Card
      onClick={openPost}
      raised
      elevation={8}
      sx={{
        width: "170px",
        height: "300px",
        borderRadius: "10px",
        backgroundColor:"rgba(46, 59, 78, 0.8)",
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.04)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={post.selectedFile || "https://via.placeholder.com/150"}
        alt={post.title}
        sx={{
          height: "95%", // Adjusted to occupy a comfortable portion of the card
          width: "95%", // Provide space around the image within the card
          objectFit: "contain", // Ensure image fits without stretching
          borderRadius: "8px", // Slight rounding for a softer look
        }}
      />
      <Box
        sx={{
          marginTop: "12px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            fontFamily: "'Roboto', sans-serif",
            color: "#F5B769 ",
            marginBottom: "4px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%", // Ensures the title fits within the card width
          }}
        >
          {post.title.length > 20
            ? `${post.title.slice(0, 20)}...`
            : post.title}
        </Typography>

        <Typography
          variant="body2"
          noWrap
          sx={{
            fontSize: "0.85rem",
            fontFamily: "'Roboto', sans-serif",
            color: "#666",
          }}
        >
          {post.author.length > 20
            ? `${post.author.slice(0, 20)}...`
            : post.author}
        </Typography>
      </Box>
    </Card>
  );
};

export default Post;
