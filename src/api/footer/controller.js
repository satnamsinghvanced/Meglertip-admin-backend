const Footer = require("../../../models/footer");

exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();

    return res.status(200).json({
      success: true,
      message: "Footer fetched successfully",
      data: footer,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveFooter = async (req, res) => {
  try {
    const existing = await Footer.findOne();

    if (existing) {
      const updated = await Footer.findByIdAndUpdate(existing._id, req.body, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: "Footer updated successfully",
        data: updated,
      });
    }

    const created = await Footer.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Footer created successfully",
      data: created,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
exports.updateFooterSettings = async (req, res) => {
  try {
    const data = req.body;

    let settings = await FooterSettings.findOne();

    // If no document exists, create a new one
    if (!settings) {
      settings = await FooterSettings.create(data);
      return res.status(201).json({
        success: true,
        message: "Footer settings created successfully",
        data: settings,
      });
    }

    // Update existing document
    settings = await FooterSettings.findOneAndUpdate({}, data, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Footer settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Error updating footer settings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
