import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as api from '../api/index.js';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Box,
  Paper,
  IconButton,
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import EmailIcon from '@mui/icons-material/Email';

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
        py: 5,
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: 4,
            backgroundColor: 'white',
          }}
        >
          <Grid container>
            <Grid item xs={12} md={4} sx={{ backgroundColor: '#E2E8D9', color: 'white', padding: 3, textAlign: 'center' }}>
              <Avatar
                src={user.profile || '/defaultProfile.png'}
                alt={user.username}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  border: '3px solid white',
                }}
              />
              <Typography variant="h5" gutterBottom sx={{color:"#A65E3D"}}>
                {user.username}
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                <EmailIcon sx={{ mr: 1, fontSize: '1.3rem', color: '#6B5B53' }} />
                <Typography variant="body2" color="#6B5B53">
                  {user.email}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={8} sx={{backgroundColor:"#3A4750"}} >
                  <Typography variant="h6" color="#E2E8D9" gutterBottom sx={{margin:"20px"}}>
                    Books Taken
                  </Typography>
                  {books.length ? (
                    <List sx={{ maxHeight: '400px', overflowY: 'auto', paddingTop: 1 }}>
                      {books.map((book) => (
                        <React.Fragment key={book._id}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar
                                src={book.selectedFile || '/defaultBookCover.png'}
                                alt={book.title}
                                variant="rounded"
                                sx={{ width: 50, height: 50,  }}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle1" color="#D1A054">
                                  {book.title}
                                </Typography>
                              }
                              secondary={
                                <>
                                  <Typography variant="body2" color="#B0B8B4">
                                    <strong>Author:</strong> {book.author}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" sx={{ marginY: 1 }} />
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <Box textAlign="center" mt={3} color="text.secondary">
                      <BookIcon sx={{ fontSize: 40, mb: 1, color: '#BDBDBD' }} />
                      <Typography color="textSecondary">No books taken</Typography>
                    </Box>
                  )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default User;
