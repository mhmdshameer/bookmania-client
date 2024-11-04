import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as api from '../api/index.js';
import { Container, Grid, Card, CardContent, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Box } from '@mui/material';

const User = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]); // Stores details of each book
  const user = useSelector((state) => state.userReducer.users.find(user => user._id === id));

  useEffect(() => {
    if (user) {
      fetchBooks();
    }
  }, [user]);

  const fetchBooks = async () => {
    try {
      const bookDetails = await Promise.all(
        user.book.map(async (bookId) => {
          const { data } = await api.fetchPost(bookId);
          return data;
        })
      );
      setBooks(bookDetails);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  if (!user) return <Typography variant="h6">Loading user data...</Typography>;

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {/* Left Side: User Profile */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Avatar
                src={user.profileImage || '/defaultProfile.png'} // Replace with your default image path
                alt={user.username}
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {user.username}
                </Typography>
                <Typography color="textSecondary">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side: User Books */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" color="secondary" gutterBottom>
                  Books Taken
                </Typography>
                {books.length ? (
                  <List>
                    {books.map((book) => (
                      <React.Fragment key={book._id}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar
                              src={book.selectedFile} // Book image
                              alt={book.name}
                              variant="rounded"
                              sx={{ width: 60, height: 60 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={book.name}
                            secondary={`Author: ${book.author}`}
                          />
                        </ListItem>
                        <Divider component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Typography color="textSecondary">No books taken</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default User;
