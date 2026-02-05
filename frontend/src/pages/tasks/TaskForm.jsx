import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  useMediaQuery // Import useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme
import api from "../../api/axios";

const TaskForm = ({ open, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    lead: "",
    assignedTo: "",
    dueDate: ""
  });

  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);

  const theme = useTheme(); // Initialize useTheme
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is 'sm' or smaller

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      const leadsRes = await api.get("/leads");
      const usersRes = await api.get("/users");
      setLeads(leadsRes.data);
      setUsers(usersRes.data);
    };

    fetchData();
  }, [open]);

  const handleSubmit = async () => {
    await api.post("/tasks", form);

    setForm({
      title: "",
      lead: "",
      assignedTo: "",
      dueDate: ""
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={fullScreen}>
      <DialogTitle>Create Task</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <TextField
          select
          fullWidth
          label="Lead"
          margin="normal"
          value={form.lead}
          onChange={(e) =>
            setForm({ ...form, lead: e.target.value })
          }
        >
          {leads.map((l) => (
            <MenuItem key={l._id} value={l._id}>
              {l.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Assign To"
          margin="normal"
          value={form.assignedTo}
          onChange={(e) =>
            setForm({ ...form, assignedTo: e.target.value })
          }
        >
          {users.map((u) => (
            <MenuItem key={u._id} value={u._id}>
              {u.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="date"
          fullWidth
          label="Due Date"
          margin="normal"
          value={form.dueDate}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Save Task
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
