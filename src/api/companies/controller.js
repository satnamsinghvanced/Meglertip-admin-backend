const Company = require("../../../models/companies");

exports.createCompany = async (req, res) => {
  try {
    const { companyName, city, address, phone, website } = req.body;

    const existingCompany = await Company.findOne({ companyName });
    if (existingCompany) {
      return res
        .status(400)
        .json({ success: false, message: "Company already exists" });
    }

    const newCompany = new Company({
      companyName,
      city,
      address,
      phone,
      website,
    });

    await newCompany.save();

    res.status(201).json({
      message: "Company created successfully.",
      data: newCompany,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({
      success: true,
      message: "Companies fetched successfully.",
      data: companies,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.query;
    const company = await Company.findById(id);

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    res.status(200).json({
      success: true,
      message: "Company fetched successfully.",
      data: company,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.query;

    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCompany) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      data: updatedCompany,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
      data: deletedCompany,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
