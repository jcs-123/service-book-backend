const Mooc = require("../Model/moocModel");

// ➕ Add MOOC Course
exports.addMooc = async (req, res) => {
  try {
    const newMooc = new Mooc(req.body);
    await newMooc.save();
    res.status(201).json({ success: true, message: "Course added successfully", data: newMooc });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding course", error: err.message });
  }
};

// 📥 Get all courses by Gmail
exports.getMoocsByGmail = async (req, res) => {
  try {
    const data = await Mooc.find({ gmail: req.params.gmail }).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching courses", error: err.message });
  }
};

// ✏️ Update MOOC
exports.updateMooc = async (req, res) => {
  try {
    const updated = await Mooc.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Course updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating course", error: err.message });
  }
};

// ❌ Delete MOOC
exports.deleteMooc = async (req, res) => {
  try {
    await Mooc.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting course", error: err.message });
  }
};
