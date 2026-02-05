import Lead from "../models/Lead.js";
import Task from "../models/Task.js";

export const getDashboardStats = async (req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const totalLeads = await Lead.countDocuments({ isDeleted: false });

  const qualifiedLeads = await Lead.countDocuments({
    status: "Qualified",
    isDeleted: false
  });

  const tasksDueToday = await Task.countDocuments({
    dueDate: { $gte: todayStart, $lte: todayEnd },
    status: "Pending"
  });

  const completedTasks = await Task.countDocuments({
    status: "Completed"
  });

  res.json({
    totalLeads,
    qualifiedLeads,
    tasksDueToday,
    completedTasks
  });
};
