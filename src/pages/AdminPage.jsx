import React, { useEffect, useState } from "react";
import * as api from "../api/index.js";
import {
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: "linear-gradient(135deg, #001, rgb(2, 2, 26), #081628)",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const AdminPage = ({ searchWord }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [del, setDel] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (searchWord) {
        const { data } = await api.fetchSearchUsers(searchWord);
        setUsers(data);
      } else {
        const { data } = await api.fetchUsers();
        dispatch({ type: "FETCH_USERS", payload: data });
        setUsers(data);
      }
    };
    getUsers();
  }, [searchWord, del]);

  const handleDelete = async (userId) => {
    await api.deleteUser(userId);
    dispatch({ type: "DELETE_USER", payload: userId });
    const { data } = await api.fetchSearchUsers(searchWord);
    setUsers(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: theme.palette.background.default,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 2, sm: 4 },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: "1200px" },
            borderRadius: 2,
            padding: { xs: 2, sm: 3 },
            boxShadow: { xs: 2, md: 5 },
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#A7BDAF",
              marginBottom: 3,
            }}
          >
            User List
          </Typography>
          <Grid container spacing={2}>
            {users
              ?.filter((user) => user.role !== "admin")
              .map((user) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
                  <Card
                    onClick={() => navigate(`/user/${user._id}`)}
                    sx={{
                      backgroundColor: "#0005",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: 2,
                      cursor: "pointer",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 5,
                      },
                    }}
                  >
                    <Avatar
                      alt={user.username}
                      src={user.profile}
                      sx={{
                        width: 64,
                        height: 64,
                        marginBottom: 1,
                        border: "2px solid #A7BDAF",
                      }}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#F0EBD2",
                          overflowWrap: "break-word",
                        }}
                      >
                        {user.username}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#A8A8A8",
                          overflowWrap: "break-word",
                          fontSize: "0.9rem",
                        }}
                      >
                        {user.email}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ width: "100%", justifyContent: "center" }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(user._id);
                        }}
                        sx={{
                          width: "100%",
                          fontWeight: "bold",
                          backgroundColor: "#D9534F",
                          "&:hover": {
                            backgroundColor: "#C9302C",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPage;
