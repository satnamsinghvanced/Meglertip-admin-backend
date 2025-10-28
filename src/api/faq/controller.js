const FAQ = require("../../../models/faq");

exports.createFAQ = async (req, res) => {
  try {
    const { question, answer, categoryId } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and Answer are required" });
    }

    const faq = await FAQ.create({ question, answer, categoryId });
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find()
      .populate("categoryId", "_id categoryName")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getFAQById = async (req, res) => {
  try {
     const {id} = req.query;
    const faq = await FAQ.findById(id).populate("categoryId");

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.updateFAQ = async (req, res) => {
  try {
    const {id} = req.query;
    const { question, answer, categoryId } = req.body;

    const faq = await FAQ.findByIdAndUpdate(
      id,
      { question, answer, categoryId },
      { new: true, runValidators: true }
    ).populate("categoryId");

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
     const {id} = req.query;
    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
