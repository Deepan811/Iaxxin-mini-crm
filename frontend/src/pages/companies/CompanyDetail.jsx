import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem } from "@mui/material";
import { getCompanyByIdApi } from "../../api/company.api";

const CompanyDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await getCompanyByIdApi(id);
      setData(res);
    };
    fetchCompany();
  }, [id]);

  if (!data) return null;

  return (
    <>
      <Typography variant="h5">{data.company.name}</Typography>
      <Typography variant="subtitle1" mb={2}>
        Leads
      </Typography>

      <List>
        {data.leads.map((lead) => (
          <ListItem key={lead._id}>{lead.name}</ListItem>
        ))}
      </List>
    </>
  );
};

export default CompanyDetail;
