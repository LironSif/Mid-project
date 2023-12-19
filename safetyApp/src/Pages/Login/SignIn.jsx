import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Link, Box } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Auth/firebase.jsx'; 
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../UserDataContext.jsx';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {getUserData} = useUserData()

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Signed in:', userCredential.user);
      getUserData(email)
      navigate('/Home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
    <Container component="main" maxWidth="xs">
        <Typography
          component="h1"
          variant="h5"
          textAlign="center"
          sx={{
            marginTop: '20px',
            marginBottom: '30px',
            color: '#1976d2', // Example color
            fontWeight: 'bold',
            fontSize: '24px' // Example font size
          }}
        >
          Sign In
        </Typography>
        {error && <Typography color="error" textAlign="center">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link href="/signup" variant="body2" display="block" textAlign="center">
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </Container>
    </Box>
  );
};

export default SignIn;
