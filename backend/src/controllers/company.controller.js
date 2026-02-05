import Company from "../models/Company.js";
import Lead from "../models/Lead.js";

// Create company
export const createCompany = async (req, res) => {
  const company = await Company.create(req.body);
  res.status(201).json(company);
};

// Get all companies
export const getCompanies = async (req, res) => {
  const companies = await Company.find().sort({ createdAt: -1 });
  res.json(companies);
};

// Get company details + associated leads
export const getCompanyById = async (req, res) => {
  const company = await Company.findById(req.params.id);

  const leads = await Lead.find({
    company: req.params.id,
    isDeleted: false
  });

  res.json({
    company,
    leads
  });
};
