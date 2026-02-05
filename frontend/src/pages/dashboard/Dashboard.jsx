import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { getDashboardStats } from "../../api/dashboard.api";

const StatCard = ({ title, value }) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    qualifiedLeads: 0,
    tasksDueToday: 0,
    completedTasks: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <>
      <Typography variant="h5" mb={2}>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Leads" value={stats.totalLeads} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Qualified Leads" value={stats.qualifiedLeads} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Tasks Due Today" value={stats.tasksDueToday} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Completed Tasks" value={stats.completedTasks} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
