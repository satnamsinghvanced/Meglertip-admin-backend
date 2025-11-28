const Lead = require("../../../models/user"); 
const Partner = require("../../../models/partners");

exports.getAllLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const search = req.query.search || "";
    const status = req.query.status || "";

    const skip = (page - 1) * limit;

    let filter = {
      // partnerIds: { $exists: true, $ne: [] },
    };

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { "dynamicFields.name": { $regex: search, $options: "i" } },
        { "dynamicFields.email": { $regex: search, $options: "i" } },
        { "dynamicFields.phone": { $regex: search, $options: "i" } },
      ];
    }

    const total = await Lead.countDocuments(filter);

    const leads = await Lead.find(filter)
      .populate("partnerIds", "name email phone")
      // .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const formatted = leads.map((lead) => ({
      ...lead.toObject(),
      partner: lead.partnerIds?.[0] || null,
    }));

    res.json({
      success: true,
      leads: formatted,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Lead list error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};
