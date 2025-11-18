const Theme = require("../../../models/theme");

exports.createTheme = async (req, res) => {
  try {
    const theme = await Theme.create(req.body);
    res.status(200).json({
      success: true,
      message: "Theme created successfully.",
      data: theme,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    res.status(200).json({
      success: true,
      message: "All themes and colors fetched successfully.",
      data: themes,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getThemeById = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme)
      return res
        .status(404)
        .json({ success: false, message: "Theme not found" });

    res.status(200).json({
      success: true,
      message: "Themes and colors fetched successfully.",
      data: theme,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!theme)
      return res
        .status(404)
        .json({ success: false, message: "Theme not found" });

    res.status(200).json({
      success: true,
      message: "Theme updated successfully.",
      data: theme,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.deleteTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndDelete(req.params.id);

    if (!theme)
      return res
        .status(404)
        .json({ success: false, message: "Theme not found" });

    res.status(200).json({
      success: true,
      message: "Theme deleted successfully.",
      data: theme,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
