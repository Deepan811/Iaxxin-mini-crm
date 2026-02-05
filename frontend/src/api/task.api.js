import api from "./axios";

export const getTasksApi = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const updateTaskStatusApi = async (id, status) => {
  const res = await api.put(`/tasks/${id}/status`, { status });
  return res.data;
};
