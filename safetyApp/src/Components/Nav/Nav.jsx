import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { NavLink, useNavigate } from "react-router-dom";
import { useUserData } from "../../UserDataContext";
import { auth } from '../../Auth/firebase.jsx';


const Nav = () => {
  const { isLogin, logOut } = useUserData();
  const navigate = useNavigate();
  const {mockUserData} = useUserData()

console.log(mockUserData)
  
  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo  */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={NavLink} to="/Home">Home</Button>
        </Typography>

        
        <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
          <Button color="inherit" component={NavLink} to="/Dashboard">Dashboard</Button>
          <Button color="inherit" component={NavLink} to="/Identifier">Identifier</Button>
          <Button color="inherit" component={NavLink} to="/Contact">Contact Us</Button>
        </Box>

        {isLogin ? (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="h6" sx={{ marginRight: 2 }}>
            {`Hi,  ${auth.currentUser.email}`}
            {/* ${mockUserData.name ? mockUserData.name : */}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="inherit" component={NavLink} to="/Login">Login</Button>
            <Button color="inherit" component={NavLink} to="/SignUp">Signup</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
