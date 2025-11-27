const Partners = require("../../../models/partners");
const Form = require("../../../models/forms");

exports.createPartner = async (req, res) => {
  try {
    const {
      name,
      email,
      preferences,
      address,
      city,
      isPremium,
      isActive,
      wishes,
      postalCodes
    } = req.body;

    const newPartner = new Partners({
      name,
      email,
      preferences,
      address,
      city,
      isPremium,
      isActive,
      wishes,

      postalCodes: {
        exact: postalCodes?.exact?.map((c) => ({ code: c })) || [],
        ranges: postalCodes?.ranges?.map((r) => ({
          from: r.from,
          to: r.to,
        })) || [],
      },
    });

    await newPartner.save();
    res.status(201).json({ success: true, data: newPartner });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
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

// UPDATE PARTNER
exports.updatePartner = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      preferences,
      address,
      city,
      isPremium,
      isActive,
      wishes,
      postalCodes
    } = req.body;

    const updateData = {
      name,
      email,
      preferences,
      address,
      city,
      isPremium,
      isActive,
      wishes,
      postalCodes: {
        exact: postalCodes?.exact?.map((c) => ({ code: c })) || [],
        ranges: postalCodes?.ranges?.map((r) => ({
          from: r.from,
          to: r.to,
        })) || [],
      },
    };

    const updated = await Partners.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }

    res.json({ success: true, data: updated });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating partner" });
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
