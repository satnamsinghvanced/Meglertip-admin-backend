const FormBuilder = require("../../../models/forms");

exports.createForm = async (req, res) => {
  try {
    const form = new FormBuilder(req.body);
    await form.save();
    res.status(201).json({ success: true, form });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

exports.updateForm = async (req, res) => {
  try {
    const form = await FormBuilder.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, form });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const form = await FormBuilder.findById(req.query.id);
    if (!form) return res.status(404).json({ msg: "Form not found" });
    res.json(form);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.getForm = async (req, res) => {
  try {
    const form = await FormBuilder.find();
    if (!form) return res.status(404).json({ msg: "Form not found" });
    res.json(form);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};    