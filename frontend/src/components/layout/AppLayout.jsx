import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Box sx={{ p: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
