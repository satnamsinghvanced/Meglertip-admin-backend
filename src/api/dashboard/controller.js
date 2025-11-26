const User = require("../../../models/user");
const Partner = require("../../../models/partners");

exports.getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const topPartners = await User.aggregate([
      { $unwind: "$partnerIds" },  

      {
        $group: {
          _id: "$partnerIds",
          totalLeads: { $sum: 1 },
        },
      },

      { $sort: { totalLeads: -1 } },
      { $limit: 5 },

      {
        $lookup: {
          from: "collaboratepartners", 
          localField: "_id",
          foreignField: "_id",
          as: "partner",
        },
      },

      { $unwind: "$partner" },

      {
        $project: {
          _id: 1,
          totalLeads: 1,
          partnerName: "$partner.name",
        },
      },
    ]);

    const leadsCurrentMonth = await User.aggregate([
      { $unwind: "$partnerIds" },

      {
        $match: { createdAt: { $gte: currentMonthStart } },
      },

      { $group: { _id: "$partnerIds", leads: { $sum: 1 } } },
    ]);

    const leadsLastMonth = await User.aggregate([
      { $unwind: "$partnerIds" },

      {
        $match: {
          createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd },
        },
      },

      { $group: { _id: "$partnerIds", leads: { $sum: 1 } } },
    ]);

    const lastMonthMap = {};
    leadsLastMonth.forEach((l) => {
      lastMonthMap[l._id] = l.leads;
    });

    const growthData = await Promise.all(
      leadsCurrentMonth.map(async (curr) => {
        const partner = await Partner.findById(curr._id).select("name email");

        const prev = lastMonthMap[curr._id] || 0;

        const growth =
          prev === 0 ? 100 : ((curr.leads - prev) / prev) * 100;

        return {
          partnerId: curr._id,
          partnerName: partner?.name || "",
          leadsThisMonth: curr.leads,
          lastMonthLeads: prev,
          growthPercent: Number(growth.toFixed(2)),
        };
      })
    );

    const totals = {
     totalLeads: await User.countDocuments({
  partnerIds: { $exists: true, $ne: [] }
}),
      totalPartners: await Partner.countDocuments(),
      leadsThisMonth: leadsCurrentMonth.reduce((a, b) => a + b.leads, 0),
    };

    res.json({
      success: true,
      topPartners,
      growthData,
      totals,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
      error,
    });
  }
};