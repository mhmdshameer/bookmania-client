import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { LibraryBooks as LibraryIcon, MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./Searchbar";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Navbar = ({ setSearchWord }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userRole = user?.result?.role;

  const [anchor, setAnchor] = useState(null);

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleMenuClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#0D1B2A" }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <LibraryIcon
                sx={{ color: "#E5E4E2", fontSize: "2rem", marginRight: "0.5rem" }}
              />
              <Typography
                variant="h5" 
                sx={{
                  color: "#E5E4E2",
                  fontFamily: "Merriweather, Georgia, serif",
                  fontWeight: "bold",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  fontSize: { xs: "1.5rem", sm: "2rem" },
                }}
              >
                Bookmania
              </Typography>
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "flex" } }}>
            <SearchBar onSearch={(searchWord) => setSearchWord(searchWord)} />
          </Box>

          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              color="inherit"
              onClick={handleMenuClick}
            >
              <MoreVertIcon sx={{ color: "#D9A05B", marginRight: "10px" }} />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
            {user ? (
              <>
                <IconButton onClick={() => navigate(`/user/${user.result._id}`)}>
                  <Avatar
                    src={user?.result?.profile || "images/defaultAvatar.png"}
                    alt="Profile"
                    sx={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      border: "2px solid #D9A05B",
                    }}
                  />
                </IconButton>
                <Typography variant="body1" sx={{ color: "#E1E5EE", marginLeft: 1 }}>
                  {user?.result?.username}
                </Typography>
                <Button
                  onClick={handleLogOut}
                  variant="outlined"
                  sx={{ marginLeft: 2, color: "#E5E4E2", }}
                >
                  Log out
                </Button>
                {userRole === "admin" && (
                  <Link to={location.pathname === "/adminpage" ? "/form" : "/adminpage"}>
                    <Button
                      variant="contained"
                      sx={{
                        marginLeft: 2,
                        backgroundColor: "#E5E4E2",
                        color: "#2E3B4E",
                      }}
                    >
                      {location.pathname === "/adminpage" ? "Add Book" : "Admin"}
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button
                    variant="outlined"
                    sx={{ marginLeft: 2, color: "#E5E4E2" }}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="contained"
                    sx={{
                      marginLeft: 2,
                      backgroundColor: "#E5E4E2",
                      color: "#2E3B4E",
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchor={anchor}
        open={Boolean(anchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: "#001",
            color: "#D9A05B",
          },
        }}
      >
        {user ? (
          <>
            <MenuItem onClick={() => navigate(`/user/${user.result._id}`)}>
              {user?.result?.username}
            </MenuItem>
            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            {userRole === "admin" && location.pathname !== "/adminpage" && (
              <MenuItem onClick={() => navigate("/adminpage")}>Admin Page</MenuItem>
            )}
            {userRole === "admin" && location.pathname !== "/form" && (
              <MenuItem onClick={() => navigate("/form")}>Add Book</MenuItem>
            )}
          </>
        ) : (
          <>
            <MenuItem onClick={() => navigate("/signin")}>Sign In</MenuItem>
            <MenuItem onClick={() => navigate("/signup")}>Sign Up</MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default Navbar;
