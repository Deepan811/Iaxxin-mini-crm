import api from "./axios";

export const getCompaniesApi = async () => {
  const res = await api.get("/companies");
  return res.data;
};

export const getCompanyByIdApi = async (id) => {
  const res = await api.get(`/companies/${id}`);
  return res.data;
};
