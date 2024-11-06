import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const UploadAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: "3px solid #E2E8D9",
  marginBottom: theme.spacing(2),
}));

const UploadButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: "#E2E8D9",
  "&:hover": {
    backgroundColor: "#D1D9C2",
  },
}));

const EditUserModal = ({ open, onClose, user, onSave }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(user.profile || null);

  useEffect(()=>{
    if(user){
        setUsername(user.username || '');
        setEmail(user.email || '');
        setProfile(user.profile || '');
    }
  },[user])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result); // Use base64 for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ username, email, password, profile });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={4} alignItems="center">
          {/* Left side with avatar upload */}
          <Grid item xs={12} sm={5} position="relative" display="flex" justifyContent="center">
            <UploadAvatar src={profile || "/defaultProfile.png"} alt="User Avatar" />
            <UploadButton component="label">
              <PhotoCameraIcon />
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </UploadButton>
          </Grid>
          
          {/* Right side with text fields */}
          <Grid item xs={12} sm={7}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  backgroundColor: "#5A8D68",
                  mt: 2,
                  "&:hover": { backgroundColor: "#4B7858" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
