import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box, // Added Box
  Card, // Added Card
  CardContent, // Added CardContent
  CardActions, // Added CardActions
  useMediaQuery // Added useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Added useTheme
import { getTasksApi, updateTaskStatusApi } from "../../api/task.api";
import { useAuth } from "../../context/AuthContext";
import TaskForm from "./TaskForm";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const theme = useTheme(); // Initialize useTheme
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Detect small screens

  const fetchTasks = async () => {
    const data = await getTasksApi();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    await updateTaskStatusApi(taskId, "Completed");
    fetchTasks();
  };

  return (
    <>
      <Typography variant="h5" mb={2}>
        Tasks
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Add Task
      </Button>

      <TaskForm
        open={open}
        onClose={() => {
          setOpen(false);
          fetchTasks();
        }}
      />

      {isSmallScreen ? (
        // Card view for small screens
        <Box>
          {tasks.map((task) => {
            const isAssignedUser = task.assignedTo?._id === user?._id;
            return (
              <Card key={task._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography color="textSecondary">Lead: {task.lead?.name || "-"}</Typography>
                  <Typography>Assigned To: {task.assignedTo?.name || "-"}</Typography>
                  <Typography>Status: {task.status}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    size="small"
                    disabled={!isAssignedUser || task.status === "Completed"}
                    onClick={() => handleComplete(task._id)}
                  >
                    Mark Done
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      ) : (
        // Table view for larger screens
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Lead</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tasks.map((task) => {
                const isAssignedUser =
                  task.assignedTo?._id === user?._id;

                return (
                  <TableRow key={task._id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.lead?.name || "-"}</TableCell>
                    <TableCell>{task.assignedTo?.name || "-"}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        disabled={
                          !isAssignedUser || task.status === "Completed"
                        }
                        onClick={() => handleComplete(task._id)}
                      >
                        Mark Done
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default Tasks;
