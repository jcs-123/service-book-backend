const Achievement = require("../model/Achievement");

// ======================================================
// 📥 Add New Achievement
// ======================================================
exports.addAchievement = async (req, res) => {
  try {
    const { gmail, title, academicYear, remarks } = req.body;

    if (!gmail || !title) {
      return res.status(400).json({
        success: false,
        message: "Gmail and Title are required!",
      });
    }

    const newAchievement = new Achievement({
      gmail,
      title,
      academicYear,
      remarks,
    });

    await newAchievement.save();

    res.status(201).json({
      success: true,
      message: "Achievement added successfully ✅",
      data: newAchievement,
    });
  } catch (err) {
    console.error("❌ Error adding achievement:", err);
    res.status(500).json({
      success: false,
      message: "Server error while adding achievement",
      error: err.message,
    });
  }
};

// ======================================================
// 📤 Get All Achievements by Gmail
// ======================================================
exports.getAchievementsByGmail = async (req, res) => {
  try {
    const { gmail } = req.params;
    const achievements = await Achievement.find({ gmail }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: achievements,
    });
  } catch (err) {
    console.error("❌ Error fetching achievements:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching achievements",
      error: err.message,
    });
  }
};

// ======================================================
// ✏️ Edit / Update Achievement
// ======================================================
exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAchievement = await Achievement.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAchievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Achievement updated successfully ✅",
      data: updatedAchievement,
    });
  } catch (err) {
    console.error("❌ Error updating achievement:", err);
    res.status(500).json({
      success: false,
      message: "Error updating achievement",
      error: err.message,
    });
  }
};

// ======================================================
// 🗑️ Delete Achievement
// ======================================================
exports.deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAchievement = await Achievement.findByIdAndDelete(id);

    if (!deletedAchievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Achievement deleted successfully 🗑️",
    });
  } catch (err) {
    console.error("❌ Error deleting achievement:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting achievement",
      error: err.message,
    });
  }
};
