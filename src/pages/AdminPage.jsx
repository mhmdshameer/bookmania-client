import React, { useEffect } from "react";
import * as api from "../api/index.js";
import {
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: "#1F2732",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const AdminPage = () => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getUsers = async () => {
      const { data } = await api.fetchUsers();
      dispatch({ type: "FETCH_USERS", payload: data });
    };
    getUsers();
  }, []);
  const navigate = useNavigate()

  const users = useSelector((state) => state.userReducer.users);


  const handleDelete = async (userId) => {
   const {data} = await api.deleteUser(userId);
   console.log(data)
   dispatch({ type: "DELETE_USER", payload: userId });
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          alignItems: "center",
          padding: "20px",
          color: "#A7BDAF ",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          cursor: 'pointer'
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ marginBottom: "20px", fontWeight: 600, width: "100%" }}
        >
          User List
        </Typography>
        {users
          .filter((user) => user.role !== "admin")
          .map((user) => (
            <Card
              key={user._id}
              onClick={()=>navigate(`/user/${user._id}`)}
              sx={{
                width: "170px", 
                height: "200px", 
                margin: "10px", 
                backgroundColor: "rgba(46, 59, 78, 0.8)",
                borderRadius: "8px",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column", // Column for layout
                justifyContent: "space-between", // Space between content
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt={user.username}
                  src={user.profile}
                  sx={{
                    width: 56,
                    height: 56,
                    marginBottom: "10px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    textAlign: "center",
                    color: "#F0EBD2",
                  }}
                >
                  {user.username}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#A8A8A8", textAlign: "center" }}
                >
                  {user.email}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", padding: "8px" }}>
                <Button
                  variant="contained"
                  color="#A64D4D"
                  onClick={() => handleDelete(user._id)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#8A3B3B",
                    },
                    width: "100%", // Full width for the button
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </ThemeProvider>
  );
};

export default AdminPage;
