import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  res.status(201).json(lead);
};

export const getLeads = async (req, res) => {
  const { search = "", status } = req.query;

  const query = {
    isDeleted: false,
    name: { $regex: search, $options: "i" }
  };

  if (status) query.status = status;

  const leads = await Lead.find(query)
    .populate("assignedTo", "name")
    .populate("company", "name")
    .sort({ createdAt: -1 });

  res.json(leads);
};

export const getLeadById = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  res.json(lead);
};

export const updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(lead);
};

export const deleteLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  lead.isDeleted = true;
  await lead.save();

  res.json({ message: "Lead deleted (soft)" });
};
