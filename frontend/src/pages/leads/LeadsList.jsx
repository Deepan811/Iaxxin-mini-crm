import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, TextField, Select, MenuItem, Box, Typography,
  Grid, Card, CardContent, CardActions, useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getLeadsApi, deleteLeadApi } from "../../api/lead.api";
import LeadForm from "./LeadForm";

const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [editLead, setEditLead] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const fetchLeads = async () => {
    const data = await getLeadsApi({ search, status });
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, [search, status]);

  const handleDelete = async (id) => {
    await deleteLeadApi(id);
    fetchLeads();
  };

  return (
    <>
      <Typography variant="h5" mb={2}>Leads</Typography>

      <Grid container spacing={2} mb={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Select
            fullWidth
            value={status}
            displayEmpty
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Contacted">Contacted</MenuItem>
            <MenuItem value="Qualified">Qualified</MenuItem>
            <MenuItem value="Lost">Lost</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button fullWidth variant="contained" onClick={() => { setEditLead(null); setOpen(true); }}>
            Add Lead
          </Button>
        </Grid>
      </Grid>

      {isSmallScreen ? (
        // Card view for small screens
        <Box>
          {leads.map((lead) => (
            <Card key={lead._id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{lead.name}</Typography>
                <Typography color="textSecondary">{lead.email}</Typography>
                <Typography>Status: {lead.status}</Typography>
                <Typography>Assigned To: {lead.assignedTo?.name || "-"}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    setEditLead(lead);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(lead._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        // Table view for larger screens
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead.assignedTo?.name || "-"}</TableCell>
                  <TableCell>
                    <Button
                    size="small"
                        onClick={() => {
                            setEditLead(lead);
                            setOpen(true);
                        }}
                        >
                        Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={() => handleDelete(lead._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      <LeadForm open={open} editData={editLead} onClose={() => {
        setOpen(false);
        fetchLeads();
      }} />
    </>
  );
};

export default LeadsList;
