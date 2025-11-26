const Partners = require("../../../models/partners");
const Form = require("../../../models/forms");

exports.createPartner = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    const existing = await Partners.findOne({ email });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    const partner = await Partners.create(req.body);
    res.status(201).json({
      success: true,
      message: "Partner created successfully.",
      data: partner,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getPartners = async (req, res) => {
  try {
    const {
      isActive,
      isPremium,
      city,
      name,
      postalCode,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};
    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }
    if (isPremium !== undefined) {
      query.isPremium = isPremium === "true";
    }
    if (city) {
      query.city = { $regex: city, $options: "i" };
    }
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (postalCode) {
      query.postalCodes = { $regex: postalCode, $options: "i" };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { postalCodes: { $regex: search, $options: "i" } },
      ];
    }
    const skip = (page - 1) * limit;
    const total = await Partners.countDocuments(query);
    const partners = await Partners.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Partners fetched successfully.",
      data: partners,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Partner ID is required" });
    const partner = await Partners.findById(id);
    if (!partner)
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    res.status(200).json({
      success: true,
      message: "Partner details fetched successfully.",
      data: partner,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Partner ID is required" });
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
      });

    if (req.body.email) {
      const existing = await Partners.findOne({
        email: req.body.email,
        _id: { $ne: id },
      });
      if (existing)
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
    }
    const partner = await Partners.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!partner)
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });

    res.status(200).json({
      success: true,
      message: "Partner updated successfully.",
      data: partner,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Partner ID is required" });
    const partner = await Partners.findByIdAndDelete(id);
    if (!partner)
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    res.status(200).json({
      success: true,
      message: "Partner deleted successfully.",
      data: partner,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.questionForPartner = async (req, res) => {
  try {
    const form = await Form.findOne();

    if (!form) {
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });
    }

    const questions = form.steps
      .sort((a, b) => a.stepOrder - b.stepOrder)
      .flatMap((step) => step.fields)
      // .filter(field => field.label && field.label.trim() !== "")
      .map((field, index) => ({
        index: index + 1, // Start index from 1
        question: field.name,
        // name: field.name    // Optional: helps match answers later
      }));

    res.json({ success: true, questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
