import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { getCompaniesApi } from "../../api/company.api";
import { useNavigate } from "react-router-dom";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getCompaniesApi();
      setCompanies(data);
    };
    fetchCompanies();
  }, []);

  return (
    <>
      <Typography variant="h5" mb={2}>
        Companies
      </Typography>

      <List>
        {companies.map((c) => (
          <ListItem
            button="true"
            key={c._id}
            onClick={() => navigate(`/companies/${c._id}`)}
          >
            <ListItemText
              primary={c.name}
              secondary={`${c.industry || ""} ${c.location || ""}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CompanyList;
