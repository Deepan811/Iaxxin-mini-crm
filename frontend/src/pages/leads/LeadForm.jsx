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
import { createLeadApi } from "../../api/lead.api";

const LeadForm = ({ open, onClose, editData }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "New",
    assignedTo: "",
    company: ""
  });

  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  const theme = useTheme(); // Initialize useTheme
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is 'sm' or smaller

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      const usersRes = await api.get("/users");
      const companiesRes = await api.get("/companies");
      setUsers(usersRes.data);
      setCompanies(companiesRes.data);
    };

    fetchData();

    // EDIT MODE: prefill data
    if (editData) {
      setForm({
        name: editData.name,
        email: editData.email,
        status: editData.status,
        assignedTo: editData.assignedTo?._id || "",
        company: editData.company?._id || ""
      });
    } else {
      // CREATE MODE: reset
      setForm({
        name: "",
        email: "",
        status: "New",
        assignedTo: "",
        company: ""
      });
    }
  }, [open, editData]);

  const handleSubmit = async () => {
    if (editData) {
      await api.put(`/leads/${editData._id}`, form);
    } else {
      await createLeadApi(form);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={fullScreen}>
      <DialogTitle>
        {editData ? "Edit Lead" : "Add Lead"}
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <TextField
          select
          fullWidth
          label="Status"
          margin="normal"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Contacted">Contacted</MenuItem>
          <MenuItem value="Qualified">Qualified</MenuItem>
          <MenuItem value="Lost">Lost</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          label="Assigned To"
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
          select
          fullWidth
          label="Company"
          margin="normal"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
        >
          {companies.map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          {editData ? "Update Lead" : "Save Lead"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LeadForm;
