import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { LibraryBooks as LibraryIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./Searchbar";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const user = useSelector((state)=> state.authReducers.authData);


  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const userRole = user?.result?.role ;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#4A6E9A " }}>
      <Toolbar>
        <Link to="/" style={{textDecoration: "none"}} >
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <LibraryIcon
              sx={{ color: "#F2B95C ", fontSize: "2rem", marginRight: "0.5rem" }}
            />
            <Typography
              variant="h4"
              sx={{
                color: "#F2B95C ",
                fontFamily: "Merriweather, Georgia, serif", // Elegant, classic font
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Bookmania
            </Typography>
          </Box>
        </Link>

        <SearchBar />

        {user ? (
          <>
            <IconButton sx={{ marginLeft: 2 }}>
              <img
                src={user?.result?.profile || "images/defaultAvatar.png"}
                alt="Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </IconButton>
            <Typography
              variant="body1"
              sx={{ color: "#F2B95C", marginLeft: 1 }}
            >
              {user?.result?.username}
            </Typography>
            <Button
              onClick={handleLogOut}
              variant="outlined"
              sx={{ marginLeft: 2, color: "#F2B95C " }}
            >
              Log out
            </Button>
            {userRole === "admin" && (
              <Link to="/adminpage">
                <Button
                  variant="contained"
                  sx={{
                    marginLeft: 2,
                    backgroundColor: "#F2B95C",
                    color: "#4A6E9A",
                  }}
                >
                  Admin
                </Button>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button
                variant="outlined"
                sx={{ marginLeft: 2, color: "#F2B95C " }}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="contained"
                sx={{
                  marginLeft: 2,
                  backgroundColor: "#F2B95C ",
                  color: "#4A6E9A",
                }}
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
