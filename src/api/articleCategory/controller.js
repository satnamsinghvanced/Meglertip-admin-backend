const ArticleCategory = require("../../../models/articleCategory");

exports.createArticleCategory = async (req, res) => {
  try {
    const { title, slug, description, categoryPosition , ...restOfData} = req.body;

    const existing = await ArticleCategory.findOne({ slug });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Slug already exists" });
    }

    const newCategory = new ArticleCategory({
      title,
      slug,
      description,
      categoryPosition,
      ...restOfData
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Article category created successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getArticleCategory = async (req, res) => {
  try {
    const categories = await ArticleCategory.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSingleArticleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ArticleCategory.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Article category not found" });
    }

    res.status(200).json({
      success: true,
      message:"Article category data fetched successfully.",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateArticleCategory = async (req, res) => {
  try {
    const { title, slug, description,  categoryPosition, ...restOfData} = req.body;

    const updatedCategory = await ArticleCategory.findByIdAndUpdate(
      req.params.id,
      { title, slug, description, categoryPosition, ...restOfData},
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Article category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteArticleCategory = async (req, res) => {
  try {
    const deleted = await ArticleCategory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Article category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
