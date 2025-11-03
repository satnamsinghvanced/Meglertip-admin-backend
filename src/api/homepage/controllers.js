const Homepage = require("../../../models/homepage");

const validSections = [
  "heroSection",
  "howDoesItWorkHeading",
  "howDoesItWorkContent",
  "articlesHeading",
  "articleContent",
  "whyChooseMeglerTipHeading",
  "whyChooseMeglerTipContent",
  "factorsAffectingContent",
  "salesGuide",
  "realEstateAgents",
  "summaryOfBenefit",
  "latestInsights",
  "latestInsightButton",
  "faqHeading",
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
      data: homepage,
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
      return res.status(400).json({ success: false, message: "Invalid section name" });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
    }

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const field = file.fieldname;
        data[field] = `uploads/${file.filename}`;
      });
    }

    if (Array.isArray(homepage[section])) {
      homepage[section].push(data);
    } else {
      homepage[section] = data;
    }

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
      return res.status(400).json({ success: false, message: "Invalid section name" });
    }

    const homepage = await Homepage.findById(homepageId).select(section);
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
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
      return res.status(400).json({ success: false, message: "Invalid section name" });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
    }

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const field = file.fieldname;
        data[field] = `uploads/${file.filename}`;
      });
    }

    if (Array.isArray(homepage[section])) {
      homepage[section] = data;
    } else {
      homepage[section] = { ...homepage[section]?.toObject?.(), ...data };
    }

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
      return res.status(400).json({ success: false, message: "Invalid section name" });
    }

    const homepage = await Homepage.findById(homepageId);
    if (!homepage) {
      return res.status(404).json({ success: false, message: "Homepage not found" });
    }

    if (Array.isArray(homepage[section])) {
      homepage[section] = [];
    } else {
      homepage[section] = {};
    }

    await homepage.save();

    res.status(200).json({
      success: true,
      message: `${section} deleted successfully`,
      data: homepage[section],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
