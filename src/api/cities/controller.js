const County = require("../../../models/county");

exports.create = async (req, res) => {
  try {
    const {
      name,
      countyId,
      slug,
      excerpt,
      title,
      description,
      isRecommended,
      rank,
    } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !countyId ||
      !slug ||
      !excerpt ||
      !title ||
      !description ||
      !imageFile
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields and an image file are required.",
      });
    }

    const existingCity = await County.findOne({
      $or: [
        { title: title.trim() },
        { slug: slug.trim() },
        { name: name.trim() },
      ],
    });

    if (existingCity) {
      return res.status(400).json({
        success: false,
        message: "City already exists.",
      });
    }

    const newCity = await County.create({
      name: name.trim(),
      countyId,
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      title: title.trim(),
      description: description.trim(),
      image: `uploads/${imageFile.filename}`,
      isRecommended: isRecommended === "true" || isRecommended === true,
      rank: rank ? parseInt(rank) : 0,
    });

    res.status(201).json({
      success: true,
      message: "City created successfully.",
      data: newCity,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { search, countyId, isRecommended, sortBy, sortOrder } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
      ];
    }

    if (countyId) {
      filter.countyId = countyId;
    }

    if (isRecommended !== undefined) {
      filter.isRecommended = isRecommended === "true";
    }

    const sortField = sortBy || "createdAt";
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const total = await County.countDocuments(filter);

    const cities = await County.find(filter)
      // .populate("countyId", "name slug")
      .skip(skip)
      .limit(limit)
      .sort({ [sortField]: sortDirection });

    res.status(200).json({
      success: true,
      message: "County fetched successfully.",
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCities: total,
      data: cities,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await County.findById(id).populate("countyId", "name slug");
    if (!city) {
      return res
        .status(404)
        .json({ success: false, message: "City not found." });
    }
    res.status(200).json({
      success: true,
      message: "City fetched successfully.",
      data: city,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      countyId,
      slug,
      excerpt,
      title,
      description,
      isRecommended,
      rank,
    } = req.body;
    const imageFile = req.file;

    const updatedFields = {
      ...(name && { name }),
      ...(countyId && { countyId }),
      ...(slug && { slug }),
      ...(excerpt && { excerpt }),
      ...(title && { title }),
      ...(description && { description }),
      ...(isRecommended !== undefined && {
        isRecommended: isRecommended === "true" || isRecommended === true,
      }),
      ...(rank !== undefined && { rank: parseInt(rank) }),
    };

    if (imageFile) {
      updatedFields.image = `uploads/${imageFile.filename}`;
    }

    const updatedCity = await County.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedCity) {
      return res
        .status(404)
        .json({ success: false, message: "City not found." });
    }

    res.status(200).json({
      success: true,
      message: "City updated successfully.",
      data: updatedCity,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCity = await County.findByIdAndDelete(id);
    if (!deletedCity) {
      return res
        .status(404)
        .json({ success: false, message: "City not found." });
    }
    res.status(200).json({
      success: true,
      message: "City deleted successfully.",
      data: deletedCity,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
