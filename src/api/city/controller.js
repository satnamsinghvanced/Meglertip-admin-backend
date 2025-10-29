const City = require("../../../models/city");

exports.createCity = async (req, res) => {
  try {
    const { cityName, description, imageUrl } = req.body;

    const existingCity = await City.findOne({ cityName });
    if (existingCity) {
      return res
        .status(400)
        .json({ success: false, message: "City already exists" });
    }

    const newCity = new City({ cityName, description, imageUrl });
    await newCity.save();

    res.status(201).json({
      message: "City created successfully.",
      success: true,
      data: newCity,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json({
      message: "Cities fetch successfully.",
      success: true,
      data: cities,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCityById = async (req, res) => {
  try {
    const { id } = req.query;
    const city = await City.findById(id);

    if (!city) {
      return res
        .status(404)
        .json({ success: false, message: "City not found" });
    }
    res
      .status(200)
      .json({ message: "City fetch successfully.", success: true, data: city });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateCity = async (req, res) => {
  try {
    const { id } = req.query;
    const updatedCity = await City.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCity) {
      return res
        .status(404)
        .json({ success: false, message: "City not found" });
    }
    res.status(200).json({
      message: "City updated successfully.",
      success: true,
      data: updatedCity,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.query;
    const deleted = await City.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "City not found" });
    }
    res.status(200).json({
      message: "City deleted successfully",
      success: true,
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
