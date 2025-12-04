const FormBuilder = require("../../../models/forms");
const FormSelect = require("../../../models/formSelect");

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
exports.addStepToForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const { stepTitle, stepDescription, fields } = req.body;

    if (!stepTitle)
      return res.status(400).json({ success: false, msg: "Step Title required" });

    const formSelect = await FormSelect.findById(formId);
    if (!formSelect)
      return res.status(404).json({ success: false, msg: "FormSelect not found" });

    let form = await FormBuilder.findOne({ formId: formSelect._id });

    if (!form) {
      form = new FormBuilder({
        formName: formSelect.formTitle,
        description: formSelect.formDescription,
        formId: formSelect._id,
        steps: []
      });

      await form.save();
    }

    const step = {
      stepTitle,
      stepDescription,
      stepOrder: form.steps.length + 1,
      fields
    };

    form.steps.push(step);
    await form.save();

    return res.status(201).json({
      success: true,
      msg: "Step added successfully",
      data: form.steps
    });

  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};


// GET ALL STEPS OF A FORM
exports.getStepsOfForm = async (req, res) => {
  try {
    const { formId } = req.params;

    const form = await FormSelect.findById(formId);
    if (!form)
      return res.status(404).json({ success: false, msg: "Form not found" });
    const formSteps = await FormBuilder.findOne({formId:form._id});
    if (!formSteps){
      return res.status(404).json({ success: false, msg: "Form steps not found" });
    }

    return res.json({ success: true, data: formSteps });

  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};
exports.updateStep = async (req, res) => {
  try {
    const { formId, stepId } = req.params;
    const { stepTitle, stepDescription, fields } = req.body;

    // Fetch the FormBuilder document
    const form = await FormBuilder.findOne({formId:formId});
    if (!form)
      return res.status(404).json({ success: false, msg: "Form not found" });

    // Locate the step
    const stepIndex = form.steps.findIndex(
      (s) => s._id.toString() === stepId
    );

    if (stepIndex === -1)
      return res
        .status(404)
        .json({ success: false, msg: "Step not found" });

    // Update only provided fields
    if (stepTitle !== undefined)
      form.steps[stepIndex].stepTitle = stepTitle;

    if (stepDescription !== undefined)
      form.steps[stepIndex].stepDescription = stepDescription;

    if (fields !== undefined)
      form.steps[stepIndex].fields = fields; // full replacement of fields array

    // Save
    await form.save();

    return res.json({
      success: true,
      msg: "Step updated successfully",
      steps: form.steps,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};
