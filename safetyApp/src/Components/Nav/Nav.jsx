import React from "react";
import { AppBar, Toolbar, Button, Typography, Box, IconButton, Drawer, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from "react-router-dom";
import { useUserData } from "../../UserDataContext";
import { auth } from '../../Auth/firebase.jsx';

const Nav = () => {
  const { isLogin, logOut, mockUserData } = useUserData();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  const buttonStyle = {
    color: 'inherit',
    marginRight:3,
    component: NavLink,
    sx: {
      marginRight: 2,
      ':hover': {
        borderColor: 'white',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '1px'
      },
      '&.active': {
        backgroundColor: 'white',
        color: theme.palette.primary.main, 
        borderRadius:"5px",
        
      }
    }
  };

  const logoutButtonStyle = {
    sx: {
      backgroundColor: theme.palette.secondary.dark, 
      borderRadius:"10px",
      color:"white",
      ':hover': {
        backgroundColor: theme.palette.primary.dark, 
        borderColor: 'white',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius:"10px",
      }
    }
  };

  const renderMenuLinks = () => (
    <>
      <Button {...buttonStyle} to="/Dashboard">Dashboard</Button>
      <Button {...buttonStyle} to="/Identifier">Identifier</Button>
      <Button {...buttonStyle} to="/Contact">Contact Us</Button>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Mobile Menu Icon */}
        {isSmallScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Left-aligned Links */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Button {...buttonStyle} to="/Home">Home</Button>
          {!isSmallScreen && renderMenuLinks()}
        </Box>

        {/* Mobile Drawer for Links */}
        {isSmallScreen && (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {renderMenuLinks()}
          </Drawer>
        )}

        {/* Auth Buttons */}
        {isLogin ? (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="h6" sx={{ marginRight: 2 }}>
              {`Hi, ${mockUserData?.name ? mockUserData.name : auth.currentUser?.email}`}
            </Typography>
            <Button {...logoutButtonStyle} onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button {...buttonStyle} to="/Login">Login</Button>
            <Button {...buttonStyle} to="/SignUp">Signup</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
