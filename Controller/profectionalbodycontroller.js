const ProfessionalBodyMembership = require("../model/ProfessionalBodyMembership");

/* ======================================================
   📥 ADD PROFESSIONAL BODY MEMBERSHIP
====================================================== */
exports.addMembership = async (req, res) => {
  try {
    const { gmail, bodyName, type, memberId, memberSince, description } = req.body;

    if (!gmail || !bodyName) {
      return res.status(400).json({
        success: false,
        message: "Gmail and Professional Body Name are required!",
      });
    }

    const newMembership = new ProfessionalBodyMembership({
      gmail,
      bodyName,
      type,
      memberId,
      memberSince,
      description,
    });

    await newMembership.save();

    res.status(201).json({
      success: true,
      message: "✅ Membership added successfully!",
      data: newMembership,
    });
  } catch (err) {
    console.error("❌ Error adding membership:", err);
    res.status(500).json({
      success: false,
      message: "Server error while adding membership",
      error: err.message,
    });
  }
};

/* ======================================================
   📄 GET ALL MEMBERSHIPS BY GMAIL
====================================================== */
exports.getMemberships = async (req, res) => {
  try {
    const { gmail } = req.params;
    const memberships = await ProfessionalBodyMembership.find({ gmail }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships,
    });
  } catch (err) {
    console.error("❌ Error fetching memberships:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching memberships",
      error: err.message,
    });
  }
};

/* ======================================================
   ✏️ UPDATE MEMBERSHIP
====================================================== */
exports.updateMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ProfessionalBodyMembership.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Membership not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "✅ Membership updated successfully!",
      data: updated,
    });
  } catch (err) {
    console.error("❌ Error updating membership:", err);
    res.status(500).json({
      success: false,
      message: "Error updating membership",
      error: err.message,
    });
  }
};

/* ======================================================
   🗑️ DELETE MEMBERSHIP
====================================================== */
exports.deleteMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ProfessionalBodyMembership.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Membership not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "🗑️ Membership deleted successfully!",
    });
  } catch (err) {
    console.error("❌ Error deleting membership:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting membership",
      error: err.message,
    });
  }
};
