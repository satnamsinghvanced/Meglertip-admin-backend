const Partner = require("../../../models/partner");

const validateContactFields = (contactFields) => {
  if (!Array.isArray(contactFields) || contactFields.length === 0) {
    return {
      valid: false,
      message: "contactFields must be a non-empty array.",
    };
  }

  for (let field of contactFields) {
    if (!field.label || !field.placeholder || !field.name || !field.type) {
      return {
        valid: false,
        message:
          "Each contact field must have label, placeholder, name, and type.",
      };
    }

    if (!["text", "email", "tel", "textarea", "number"].includes(field.type)) {
      return {
        valid: false,
        message: `Invalid field type: ${field.type}. Valid types are text, email, tel, textarea, or number.`,
      };
    }
  }

  return { valid: true };
};

exports.create = async (req, res) => {
  try {
    const {
      heading,
      subHeading,
      contactFormTitle,
      contactFields,
      title,
      description,
    } = req.body;

    if (
      !heading ||
      !subHeading ||
      !contactFormTitle ||
      !title ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to create a partner.",
      });
    }

    const contactFieldsValidation = validateContactFields(contactFields);
    if (!contactFieldsValidation.valid) {
      return res.status(400).json({
        success: false,
        message: contactFieldsValidation.message,
      });
    }

    let imagePath = null;
    if (req.file) {
      imagePath = req.file.path;
    }
    const partnerData = {
      heading,
      subHeading,
      contactFormTitle,
      contactFields,
      title,
      image: imagePath,
      description,
    };

    const partner = new Partner(partnerData);
    const savedPartner = await partner.save();

    res.status(200).json({
      success: true,
      message: "Partner created successfully",
      data: savedPartner,
    });
  } catch (error) {
    console.error("Error creating partner:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPartner = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: partners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const partnerId = req.params.id;
    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }
    let updatedPartnerData = { ...req.body };

    if (updatedPartnerData.contactFields) {
      const contactFieldsValidation = validateContactFields(
        updatedPartnerData.contactFields
      );
      if (!contactFieldsValidation.valid) {
        return res.status(400).json({
          success: false,
          message: contactFieldsValidation.message,
        });
      }
    }

    if (req.file) {
      updatedPartnerData.image = req.file.path;
    } else {
      updatedPartnerData.image = partner.image;
    }

    const updatedPartner = await Partner.findByIdAndUpdate(
      partnerId,
      updatedPartnerData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Partner updated successfully",
      data: updatedPartner,
    });
  } catch (error) {
    console.error("Error updating partner:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }
    res.status(200).json({
      success: true,
      message: "Partner deleted successfully",
      data: partner,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
