const faqPage = require("../../../models/faqPage")

exports.createFaqPage = async (req, res) => {
  try {
    const { title, description, ...restOfData } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required fields.",
      });
    }

    const existingFaq = await faqPage.findOne({ title });
    if (existingFaq) {
      return res.status(409).json({
        success: false,
        message: `FAQ page with title '${title}' already exists.`,
      });
    }

    const newFaqPage = await faqPage.create({
      title,
      description,
      ...restOfData, 
    });

    return res.status(201).json({
      success: true,
      message: "FAQ Page created successfully.",
      data: newFaqPage,
    });
  } catch (error) {
    console.error("Error creating FAQ Page:", error);

    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating the FAQ page.",
    });
  }
};

exports.getFaqPage = async (req, res) => {
  try {
    const page = await faqPage.findOne();

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "No FAQ page found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "FAQ page fetched successfully.",
      data: page,
    });
  } catch (error) {
    console.error("Error fetching FAQ page:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while fetching the FAQ page.",
    });
  }
};

exports.updateFaqPage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPage = await faqPage.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPage) {
      return res.status(404).json({
        success: false,
        message: "FAQ page not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "FAQ page updated successfully.",
      data: updatedPage,
    });
  } catch (error) {
    console.error("Error updating FAQ page:", error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating the FAQ page.",
    });
  }
};