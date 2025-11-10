const County = require("../../../models/county");

exports.createCounty = async (req, res) => {
  try {
    const { name, slug, excerpt } = req.body;
    if (!name || !slug || !excerpt) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await County.findOne({
      $or: [{ name: name.trim() }, { slug: slug.trim() }],
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "County with that name or slug already exists." });
    }
    const county = await County.create({
      name: name.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
    });

    res.status(201).json({
      success: true,
      message: "County created successfully.",
      data: county,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCounties = async (req, res) => {
  try {
    const counties = await County.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "County fetched successfully.",
      data: counties,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCountyById = async (req, res) => {
  try {
    const county = await County.findById(req.params.id);
    if (!county) return res.status(404).json({ message: "County not found" });
    res.status(200).json({
      success: true,
      message: "County fetched successfully.",
      data: county,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCounty = async (req, res) => {
  try {
    const { name, slug, excerpt } = req.body;

    const county = await County.findByIdAndUpdate(
      req.params.id,
      { name, slug, excerpt },
      { new: true, runValidators: true }
    );

    if (!county) return res.status(404).json({ message: "County not found" });
    res.status(200).json({
      success: true,
      message: "County updated successfully.",
      data: county,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.deleteCounty = async (req, res) => {
  try {
    const county = await County.findByIdAndDelete(req.params.id);
    if (!county) return res.status(404).json({ message: "County not found" });
    res.status(200).json({
      success: true,
      message: "County deleted successfully",
      data: county,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
