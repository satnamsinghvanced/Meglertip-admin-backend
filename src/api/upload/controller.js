const uploadImage = require("../../../service/multer")


exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      fileUrl: req.file.path
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};
