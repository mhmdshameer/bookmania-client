import React, { useEffect, useState } from 'react';
import * as api from "../api/index.js";
import { Typography, Avatar, Button, Card, CardContent, CardActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#334256',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await api.fetchUsers();
      console.log(data);
      setUsers(data);
    };
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
     await api.deleteUser(userId);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{  alignItems: 'center',padding: '20px', color: '#ffffff', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '20px', fontWeight: 600, width: '100%' }}>
          User List
        </Typography>
        {users.map((user) => (
          <Card 
            key={user._id} 
            sx={{
              width: '170px', // Set width to 170px
              height: '300px', // Set height to 300px
              margin: '10px', // Add margin for spacing
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              boxShadow: 3,
              display: 'flex',
              flexDirection: 'column', // Column for layout
              justifyContent: 'space-between', // Space between content
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                alt={user.username} 
                src={user.profile} 
                sx={{ width: 56, height: 56, marginBottom: '10px', borderRadius: '50%', objectFit: 'cover' }} 
              />
              <Typography variant="h6" sx={{ fontWeight: 500, textAlign: 'center' }}>
                {user.username}
              </Typography>
              <Typography variant="body2" sx={{ color: '#cccccc', textAlign: 'center' }}>
                {user.email}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', padding: '8px' }}>
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => handleDelete(user._id)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#ff1744',
                  },
                  width: '100%', // Full width for the button
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
