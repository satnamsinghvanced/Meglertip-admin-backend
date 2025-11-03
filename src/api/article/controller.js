const Article = require("../../../models/article");

exports.createArticle = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      description,
      createdBy,
      categoryId,
      showDate,
      language,
      originalSlug,
    } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const existingArticle = await Article.findOne({ slug: slug });
    if (existingArticle) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists. Please choose a different one.",
      });
    }
    const article = await Article.create({
      title,
      slug,
      image: imagePath,
      excerpt,
      description,
      createdBy,
      categoryId,
      showDate,
      language,
      originalSlug,
    });
    const addedArticle = await Article.findById(article._id)
      .populate("categoryId", "title")
      .populate("createdBy", "username");
    res.status(201).json({
      success: true,
      message: "Article created successfully",
      data: addedArticle,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.getArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const total = await Article.countDocuments();

    const articles = await Article.find()
      .populate("createdBy")
      .populate("categoryId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Articles fetched successfully.",
      data: articles,
      pagination: {
        total,                    
        page,                    
        pages: Math.ceil(total / limit), 
        limit,                    
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getSingleArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("createdBy")
      .populate("categoryId");
    if (!article)
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    res.status(200).json({
      success: true,
      message: "Article fetched successfully.",
      data: article,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      description,
      createdBy,
      categoryId,
      showDate,
      language,
      originalSlug,
    } = req.body;
    const existingArticle = await Article.findOne({
      slug: slug,
      _id: { $ne: req.params.id },
    });

    if (existingArticle) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists. Please choose a different one.",
      });
    }
    const updateData = {
      title,
      slug,
      excerpt,
      description,
      createdBy,
      categoryId,
      showDate,
      language,
      originalSlug,
    };

    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const article = await Article.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!article)
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    const updatedarticle = await Article.findById(req.params.id)
      .populate("categoryId", " title")
      .populate("createdBy", " username");
    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      data: updatedarticle,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article)
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    res
      .status(200)
      .json({
        success: true,
        message: "Article deleted successfully",
        data: article,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
