import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

const menu = [
  { label: "Dashboard", path: "/" },
  { label: "Leads", path: "/leads" },
  { label: "Companies", path: "/companies" },
  { label: "Tasks", path: "/tasks" }
];

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 200 }}>
      <List sx={{ width: 200 }}>
        {menu.map((item) => (
          <ListItem
            key={item.path}
            component={NavLink}
            to={item.path}
            style={({ isActive }) => ({
              background: isActive ? "#e0e0e0" : "transparent"
            })}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
