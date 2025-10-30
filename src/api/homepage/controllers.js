const Homepage = require("../../../models/homepage");

const validSections = [
  "heroSection",
  "bannerSection1",
  "bannerSection2",
  "bannerSection3",
  "bannerSection4",
  "citySection",
  "bannerSectionCards1",
  "bannerSectionCards2",
  "bannerSectionCards3",
  "bannerSectionCards4",
  "bannerSectionCards5",
  "bannerSectionCards6",
  "articleSection",
];

exports.createHomepage = async (req, res) => {
  try {
    const existing = await Homepage.findOne();
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Homepage already exists",
        homepageId: existing._id,
      });
    }

    const homepage = new Homepage(req.body);
    await homepage.save();

    res.status(201).json({
      success: true,
      message: "Homepage created successfully",
      data: homepage[section],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSection = async (req, res) => {
  try {
    const { homepageId, section } = req.params;
    let data = { ...req.body };

    if (!validSections.includes(section)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid section name" });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res
        .status(404)
        .json({ success: false, message: "Homepage not found" });
    }
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const field = file.fieldname;
        data[field] = `/uploads/${file.filename}`;
      });
    }

    homepage[section] = data;
    await homepage.save();

    res.status(201).json({
      success: true,
      message: `${section} created successfully`,
      data: homepage[section],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSection = async (req, res) => {
  try {
    const { homepageId, section } = req.params;

    if (!validSections.includes(section)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid section name" });
    }

    const homepage = await Homepage.findById(homepageId).select(section);
    if (!homepage) {
      return res
        .status(404)
        .json({ success: false, message: "Homepage not found" });
    }

    res.status(200).json({ success: true, data: homepage[section] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { homepageId, section } = req.params;
    let data = { ...req.body };

    if (!validSections.includes(section)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid section name" });
    }

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const field = file.fieldname;
        data[field] = `/uploads/${file.filename}`;
      });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res
        .status(404)
        .json({ success: false, message: "Homepage not found" });
    }

    homepage[section] = { ...homepage[section].toObject(), ...data };
    await homepage.save();

    res.status(200).json({
      success: true,
      message: `${section} updated successfully`,
      data: homepage[section],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { homepageId, section } = req.params;

    if (!validSections.includes(section)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid section name" });
    }

    const homepage = await Homepage.findByIdAndUpdate(
      homepageId,
      { $unset: { [section]: "" } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `${section} deleted successfully`,
      data: homepage[section],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
