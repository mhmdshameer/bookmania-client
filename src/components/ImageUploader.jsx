import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CancelIcon from "@mui/icons-material/Cancel"; // Cancel icon for removal

const ImageUploader = ({ setPostData, postData }) => {
  const [imagePreview, setImagePreview] = useState(postData.selectedFile);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPostData({ ...postData, selectedFile: reader.result });
      setImagePreview(reader.result); // Set the image preview
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImage = () => {
    setPostData({ ...postData, selectedFile: null });
    setImagePreview(null); // Reset the image preview when cancelled
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px 0",
      }}
    >
      {/* If image is selected, show preview with cancel button */}
      {imagePreview ? (
        <Box position="relative" width="100%">
          <img
            src={imagePreview}
            alt="Uploaded"
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          {/* Cancel button */}
          <IconButton
            onClick={handleCancelImage}
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            <CancelIcon />
          </IconButton>
        </Box>
      ) : (
        // If no image is selected, show the upload button
        <IconButton
          color="primary"
          component="label"
          sx={{
            border: "2px dashed #D9A05B",
            borderRadius: "10px",
            padding: "20px",
            transition: "0.3s",
            "&:hover": { borderColor: "#B68A44" },
          }}
        >
          <PhotoCamera fontSize="large" />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </IconButton>
      )}
      <Typography variant="caption" color="textSecondary">
        Upload Image
      </Typography>
    </Box>
  );
};

export default ImageUploader;
