import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const ImageUploader = ({ setPostData, postData }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPostData({ ...postData, selectedFile: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px 0' }}>
      <IconButton color="primary" component="label" sx={{ border: '2px dashed #D9A05B', borderRadius: '10px', padding: '20px', transition: '0.3s', '&:hover': { borderColor: '#B68A44' } }}>
        <PhotoCamera fontSize="large" />
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
      </IconButton>
      <Typography variant="caption" color="textSecondary">
        Upload Image
      </Typography>
      {postData.selectedFile && (
        <Box mt={2}>
          <img
            src={postData.selectedFile}
            alt="Uploaded"
            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '5px' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageUploader;
