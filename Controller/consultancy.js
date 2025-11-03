const Consultancy = require("../model/consultancy");
 
/**
 * 📥 ADD Consultancy Project
 * @route   POST /api/consultancy
 */
exports.addConsultancy = async (req, res) => {
  try {
    const { email, title, organisedBy, academicYear, isFunded, fundAmount } = req.body;

    if (!email || !title || !organisedBy || !academicYear) {
      return res.status(400).json({
        success: false,
        message: "Email, Title, Organised By, and Academic Year are required!",
      });
    }

    const newConsultancy = new Consultancy({
      email,
      title,
      organisedBy,
      academicYear,
      isFunded,
      fundAmount,
    });

    await newConsultancy.save();

    res.status(201).json({
      success: true,
      message: "Consultancy project added successfully ✅",
      data: newConsultancy,
    });
  } catch (err) {
    console.error("❌ Error adding consultancy:", err);
    res.status(500).json({
      success: false,
      message: "Server error while adding consultancy project ❌",
      error: err.message,
    });
  }
};

/**
 * 📤 GET Consultancy Projects by Email
 * @route   GET /api/consultancy/:email
 */
exports.getConsultancyByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const data = await Consultancy.find({ email }).sort({ createdAt: -1 });

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No consultancy records found for this user ❌",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("❌ Error fetching consultancy:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching consultancy records ❌",
      error: err.message,
    });
  }
};

/**
 * ✏️ UPDATE Consultancy Project
 * @route   PUT /api/consultancy/:id
 */
exports.updateConsultancy = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Consultancy.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Consultancy project not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      message: "Consultancy project updated successfully ✅",
      data: updated,
    });
  } catch (err) {
    console.error("❌ Error updating consultancy:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating consultancy ❌",
      error: err.message,
    });
  }
};

/**
 * 🗑️ DELETE Consultancy Project
 * @route   DELETE /api/consultancy/:id
 */
exports.deleteConsultancy = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Consultancy.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Consultancy record not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      message: "Consultancy record deleted successfully ✅",
    });
  } catch (err) {
    console.error("❌ Error deleting consultancy:", err);
    res.status(500).json({
      success: false,
      message: "Server error while deleting consultancy ❌",
      error: err.message,
    });
  }
};
