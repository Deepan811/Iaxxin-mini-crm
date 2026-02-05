import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Mini CRM</Typography>
        <div>
          <Typography component="span" sx={{ mr: 2 }}>
            {user?.name}
          </Typography>
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
