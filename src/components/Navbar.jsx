import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedProfile = localStorage.getItem("profile");
        return storedProfile ? JSON.parse(storedProfile) : null;
    });


    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/');
        setUser(null);
    };

    // Safely access userRole
    const userRole = user ? user.result.role : null;

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1E293B' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ color: '#FBD38D', marginLeft: 2 }}>
                        Bookmania
                    </Typography>
                </Box>
                
                <SearchBar />
                
                {user ? (
                    <>
                        <IconButton sx={{ marginLeft: 2 }}>
                            <img 
                                src={user.result.profile || 'images/defaultAvatar.png'} 
                                alt="Profile" 
                                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: "cover" }} 
                            />
                        </IconButton>
                        <Typography variant="body1" sx={{ color: '#FBD38D', marginLeft: 1 }}>
                            {user.result.username}
                        </Typography>
                        <Button onClick={handleLogOut} variant="outlined" sx={{ marginLeft: 2, color: '#FBD38D' }}>
                            Log out
                        </Button>
                        {userRole === 'admin' && (
                            <Link to="/adminpage">
                                <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: '#FBD38D', color: '#1E293B' }}>
                                    Admin
                                </Button>
                            </Link>
                        )}
                    </>
                ) : (
                    <>
                        <Link to="/signin">
                            <Button variant="outlined" sx={{ marginLeft: 2, color: '#FBD38D' }}>
                                Sign In
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: '#FBD38D', color: '#1E293B' }}>
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
