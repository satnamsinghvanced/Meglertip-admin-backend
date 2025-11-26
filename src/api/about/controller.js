const About = require("../../../models/about");

// Create About
exports.createAbout = async (req, res) => {
  try {
    const {
      heading,
      subHeading,
      heading1,
      subHeading1,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
    } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const about = await About.create({
      heading,
      subHeading,
      image: imagePath,
      heading1,
      subHeading1,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
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

// Get About
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne() || {};
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single About
exports.getSingleAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about)
      return res.status(404).json({
        success: false,
        message: "About record not found",
      });

    res.status(200).json({
      success: true,
      message: "About record fetched successfully.",
      data: about,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update About
exports.updateAbout = async (req, res) => {
  try {
    const {
      heading,
      subHeading,
      image,
      heading1,
      subHeading1,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
    } = req.body;

    let about = await About.findOne();
    if (!about) {
      about = new About({
        heading,
        subHeading,
        image,
        heading1,
        subHeading1,
        metaTitle,
        metaDescription,
        metaKeywords,
        metaImage,
      });
    } else {
      Object.assign(about, {
        heading,
        subHeading,
        image,
        heading1,
        subHeading1,
        metaTitle,
        metaDescription,
        metaKeywords,
        metaImage,
      });
    }

    await about.save();

    res.json({
      success: true,
      message: "About page updated",
      data: about,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete About
exports.deleteAbout = async (req, res) => {
  try {
    const about = await About.findByIdAndDelete(req.params.id);
    if (!about)
      return res.status(404).json({
        success: false,
        message: "About record not found",
      });

    res.status(200).json({
      success: true,
      message: "About deleted successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
