const Lead = require("../../../models/user");
const Partner = require("../../../models/partners");
const formSelect = require("../../../models/formSelect");
const mongoose = require("mongoose");

exports.getAllLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "";

    const skip = (page - 1) * limit;

    // Build initial filter
    let filter = {};
    if (status) filter.status = status;

    if (search) {
      const orFilters = [
        { "dynamicFields.values.name": { $regex: search, $options: "i" } },
        { "dynamicFields.values.email": { $regex: search, $options: "i" } },
        { "dynamicFields.values.phone": { $regex: search, $options: "i" } },
      ];

      // Add uniqueId filter if search is numeric
      if (!isNaN(search)) {
        orFilters.push({ uniqueId: Number(search) });
      }

      filter.$or = orFilters;
    }

    // Count total documents
    const total = await Lead.countDocuments(filter);

    // Fetch leads with partners populated
    let leads = await Lead.find(filter)
      .populate("partnerIds.partnerId", "name email phone wishes leadTypes")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Filter partnerIds inside each lead (without removing lead)
    if (search) {
      const lowerSearch = search.toLowerCase();
      leads = leads.map((lead) => ({
        ...lead.toObject(),
        partnerIds: lead.partnerIds.filter(
          (p) =>
            p.name?.toLowerCase().includes(lowerSearch) ||
            p.email?.toLowerCase().includes(lowerSearch)
        ),
      }));
    }

    res.json({
      success: true,
      leads,
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

exports.updateLeadStatus = async (req, res) => {
  try {
    const { leadId, status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      leadId,
      { status },
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error updating lead status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateLeadProfit = async (req, res) => {
  try {
    const { leadId, profit } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      leadId,
      { profit },
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Lead profit updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error updating lead profit:", error);
  }
};
exports.updateLeadPartnerPrice = async (req, res) => {
  try {
    const { leadId, partnerId, leadPrice } = req.body;

    if (!leadId || !partnerId || leadPrice === undefined) {
      return res.status(400).json({
        success: false,
        message: "leadId, partnerId and leadPrice are required",
      });
    }

    const lead = await Lead.findOneAndUpdate(
      {
        _id: leadId,
        "partnerIds.partnerId": partnerId,
      },
      {
        $set: {
          "partnerIds.$.leadPrice": leadPrice,
        },
      },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead or Partner not found",
      });
    }

    // 🔢 Recalculate total profit
    const totalProfit = lead.partnerIds.reduce(
      (sum, p) => sum + (p.leadPrice || 0),
      0
    );

    lead.profit = totalProfit;
    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Partner lead price updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error updating partner lead price:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Lead ID is required",
      });
    }

    const lead = await Lead.findById(id).populate(
      "partnerIds.partnerId",
      "name email"
    ); // ← fixes your partner issue

    const FormId = await formSelect.findById(lead.dynamicFields[0].formId);
    const formNumber = FormId.formNumber;

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }
    const finalLead = {
      ...lead.toObject(),
      formNumber: formNumber,
    };
    res.status(200).json({
      success: true,
      message: "Lead details fetched successfully.",
      data: finalLead,
      // formNumber: formNumber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
exports.getPartnerLeadInvoiceSummary = async (req, res) => {
  try {
    const { partnerId, startDate, endDate, filter } = req.query;

    if (!partnerId)
      return res
        .status(400)
        .json({ success: false, message: "partnerId is required" });

    // Date filter
    let dateFilter = {};
    if (filter === "currentMonth") {
      const start = new Date();
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      dateFilter = { $gte: start };
    } else if (filter === "previousMonth") {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1); // 1st day of previous month
      const end = new Date(
        now.getFullYear(),
        now.getMonth(),
        0,
        23,
        59,
        59,
        999
      ); // last day of previous month

      dateFilter = { $gte: start, $lte: end };
    }

    if (startDate || endDate) {
      dateFilter = {};
      if (startDate) dateFilter.$gte = new Date(startDate);
      if (endDate) dateFilter.$lte = new Date(endDate);
    }

    const result = await Lead.aggregate([
      // Match leads for the given partner and date range
      {
        $match: {
          "partnerIds.partnerId": new mongoose.Types.ObjectId(partnerId),
          ...(Object.keys(dateFilter).length && { createdAt: dateFilter }),
        },
      },
      // Unwind partnerIds to handle multiple partners
      { $unwind: "$partnerIds" },
      // Match only the requested partner
      {
        $match: {
          "partnerIds.partnerId": new mongoose.Types.ObjectId(partnerId),
        },
      },
      // Extract leadType from dynamicFields
      {
        $addFields: {
          leadType: {
            $ifNull: [
              { $first: "$dynamicFields.values.selectedFormTitle" },
              "Unknown",
            ],
          },
        },
      },
      // Group by leadType
      {
        $group: {
          _id: "$leadType",
          count: { $sum: 1 },
          pricePerLead: { $first: "$partnerIds.leadPrice" },
          leadIds: { $push: "$uniqueId" },
          totalPrice: { $sum: "$partnerIds.leadPrice" },
        },
      },
      // Final aggregation to combine everything per partner
      {
        $group: {
          _id: new mongoose.Types.ObjectId(partnerId), // partnerId as _id
          leadTypes: {
            $push: {
              leadType: "$_id",
              count: "$count",
              pricePerLead: "$pricePerLead",
              totalPrice: "$totalPrice",
              leadIds: "$leadIds",
            },
          },
          totalLeads: { $sum: "$count" },
          grandTotal: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result[0] || {
        _id: partnerId,
        leadTypes: [],
        totalLeads: 0,
        grandTotal: 0,
      },
    });
  } catch (error) {
    console.error("Invoice summary error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to generate invoice summary" });
  }
};
