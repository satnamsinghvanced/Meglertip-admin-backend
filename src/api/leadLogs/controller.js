const Lead = require("../../../models/user"); 
const Partner = require("../../../models/partners");

exports.getAllLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const search = req.query.search || "";
    const status = req.query.status || "";

    const skip = (page - 1) * limit;

    let filter = {};

    if (status) filter.status = status;

    if (search) {
      filter.$or = [
        { "dynamicFields.name": { $regex: search, $options: "i" } },
        { "dynamicFields.email": { $regex: search, $options: "i" } },
        { "dynamicFields.phone": { $regex: search, $options: "i" } },
      ];
    }

    const total = await Lead.countDocuments(filter);

    const leads = await Lead.find(filter)
      .populate("partnerIds", "name email phone wishes leadTypes")
      .skip(skip)
      .limit(limit);

    const formatted = leads.map((lead) => {
      const leadObj = lead.toObject();
      const partner = lead.partnerIds?.[0] || null;

      let computedProfit = 0;

      if (partner) {
        const leadPreference = lead.dynamicFields?.preferranceType;

        // Check partner wishes
        const preferenceWish = partner.wishes?.find(
          (w) => w.question === "preferranceType"
        );

        const isSupported =
          preferenceWish &&
          preferenceWish.expectedAnswer?.includes(leadPreference);

        if (isSupported) {
          // Pick highest priced leadType
          if (partner.leadTypes?.length) {
            const highestPrice = Math.max(
              ...partner.leadTypes.map((lt) => lt.price || 0)
            );
            computedProfit = highestPrice;
          }
        }
      }

      return {
        ...leadObj,
        partner,
        profit: computedProfit,
      };
    });

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


