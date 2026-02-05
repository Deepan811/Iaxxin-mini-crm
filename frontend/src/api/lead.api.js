import api from "./axios";

export const getLeadsApi = async (params = {}) => {
  const res = await api.get("/leads", { params });
  return res.data;
};

export const createLeadApi = async (data) => {
  const res = await api.post("/leads", data);
  return res.data;
};

export const deleteLeadApi = async (id) => {
  const res = await api.delete(`/leads/${id}`);
  return res.data;
};
