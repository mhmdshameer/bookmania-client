import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { LibraryBooks as LibraryIcon } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./Searchbar";
import { useDispatch } from "react-redux";

const Navbar = ({setSearchWord}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user =JSON.parse( localStorage.getItem("profile"));
   
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  

  const userRole = user?.result?.role;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#001" }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <LibraryIcon
              sx={{ color: "#D9A05B", fontSize: "2rem", marginRight: "0.5rem" }}
            />
            <Typography
              variant="h4"
              sx={{
                color: "#D9A05B",
                fontFamily: "Merriweather, Georgia, serif", // Elegant, classic font
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Bookmania
            </Typography>
          </Box>
        </Link>

        <SearchBar onSearch={(searchWord)=> setSearchWord(searchWord)} />

        {user ? (
          <>
            <IconButton sx={{ marginLeft: 2 }} onClick={()=> navigate(`/user/${user.result._id}`)}>
              <img
                src={user?.result?.profile || "images/defaultAvatar.png"}
                alt="Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  borderBlockColor: "#D9A05B",
                  objectFit: "cover",
                }}
              />
            </IconButton>
            <Typography
              variant="body1"
              sx={{ color: "#E1E5EE", marginLeft: 1 }}
            >
              {user?.result?.username}
            </Typography>
            <Button
              onClick={handleLogOut}
              variant="outlined"
              sx={{ marginLeft: 2, color: "#D9A05B" }}
            >
              Log out
            </Button>
            {userRole === "admin" &&
              (location.pathname === "/adminpage" ? (
                <Link to="/form">
                  <Button
                    variant="contained"
                    sx={{
                      marginLeft: 2,
                      backgroundColor: "#D9A05B",
                      color: "#2E3B4E",
                    }}
                  >
                    Add Book
                  </Button>
                </Link>
              ) : (
                <Link to="/adminpage">
                  <Button
                    variant="contained"
                    sx={{
                      marginLeft: 2,
                      backgroundColor: "#D9A05B",
                      color: "#2E3B4E",
                    }}
                  >
                    Admin
                  </Button>
                </Link>
              ))}
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button
                variant="outlined"
                sx={{ marginLeft: 2, color: "#D9A05B" }}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="contained"
                sx={{
                  marginLeft: 2,
                  backgroundColor: "#D9A05B",
                  color: "#2E3B4E",
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
