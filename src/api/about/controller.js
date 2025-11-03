const About = require("../../../models/about");

exports.createAbout = async (req, res) => {
  try {
    const { heading, subHeading, heading1, subHeading1 } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const about = await About.create({
      heading,
      subHeading,
      image: imagePath,
      heading1,
      subHeading1,
    });

    res.status(201).json({
      success: true,
      message: "About created successfully",
      data: about,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAbout = async (req, res) => {
  try {
    const abouts = await About.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "All About records fetched successfully.",
      data: abouts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSingleAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about)
      return res
        .status(404)
        .json({ success: false, message: "About record not found" });

    res.status(200).json({
      success: true,
      message: "About record fetched successfully.",
      data: about,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const { heading, subHeading, heading1, subHeading1 } = req.body;
    const updateData = { heading, subHeading, heading1, subHeading1 };

    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const about = await About.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!about)
      return res
        .status(404)
        .json({ success: false, message: "About record not found" });

    res.status(200).json({
      success: true,
      message: "About updated successfully",
      data: about,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    const about = await About.findByIdAndDelete(req.params.id);
    if (!about)
      return res
        .status(404)
        .json({ success: false, message: "About record not found" });

    res.status(200).json({
      success: true,
      message: "About deleted successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
