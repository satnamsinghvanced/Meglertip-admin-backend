const Sitemap = require("../../../models/sitemap");

exports.getSitemap = async (req, res) => {
  try {
    const sitemap = await Sitemap.findOne();

    if (!sitemap) {
      return res.status(404).json({
        success: false,
        message: "Sitemap not found",
      });
    }

    res.json({
      success: true,
      data: sitemap,
    });
  } catch (error) {
    console.error("Get Sitemap Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.createSitemap = async (req, res) => {
  try {
    const exists = await Sitemap.findOne();
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Sitemap already exists",
      });
    }

    const sitemap = await Sitemap.create(req.body);

    res.status(201).json({
      success: true,
      message: "Sitemap created successfully",
      data: sitemap,
    });
  } catch (error) {
    console.error("Create Sitemap Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateSitemap = async (req, res) => {
  try {
    const sitemap = await Sitemap.findOne();

    if (!sitemap) {
      return res.status(404).json({
        success: false,
        message: "Sitemap not found",
      });
    }

    const updated = await Sitemap.findByIdAndUpdate(
      sitemap._id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Sitemap updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update Sitemap Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
