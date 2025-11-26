const Lead = require("../../../models/user"); 
const Partner = require("../../../models/partners");

exports.getAllLeads = async (req, res) => {
  try {
   const leads = await Lead.find({ partnerIds: { $exists: true, $ne: [] } })
  .populate("partnerIds", "name email phone")
  .sort({ createdAt: -1 });


    const formatted = leads.map((lead) => ({
      ...lead.toObject(),
      partner: lead.partnerIds?.[0] || null,
    }));

    res.json({
      success: true,
      leads: formatted,
    });
  } catch (err) {
    console.error("Lead list error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};
