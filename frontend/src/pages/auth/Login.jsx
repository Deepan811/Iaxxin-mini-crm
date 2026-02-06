import { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material"; // Import Grid
import { loginApi } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader"; // Import the Loader component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setIsLoading(true); // Start loading

    try {
      const data = await loginApi({ email, password });
      login(data);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", position: "relative" }} // Ensures the grid takes full viewport height for vertical centering, relative for loader positioning
    >
      {isLoading && <Loader />} {/* Conditionally render the Loader */}
      <Grid item xs={12} sm={8} md={4}> {/* Responsive width */}
        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}> {/* Added padding, shadow, and border radius for better visual */}
          <Typography variant="h5" mb={2} textAlign="center">
            Mini CRM Login
          </Typography>

          {error && <Typography color="error" textAlign="center">{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading} // Disable input when loading
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading} // Disable input when loading
            />
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }} disabled={isLoading}>
              Login
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
