const Patent = require("../model/patentModel");

// ➕ Add Patent
exports.addPatent = async (req, res) => {
  try {
    const newPatent = new Patent(req.body);
    await newPatent.save();
    res.status(201).json({ success: true, message: "Patent added successfully", data: newPatent });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding patent", error: err.message });
  }
};

// 📥 Get Patents by Gmail
exports.getPatentsByGmail = async (req, res) => {
  try {
    const data = await Patent.find({ gmail: req.params.gmail }).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching patents", error: err.message });
  }
};

// ✏️ Update Patent
exports.updatePatent = async (req, res) => {
  try {
    const updated = await Patent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Patent updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating patent", error: err.message });
  }
};

// ❌ Delete Patent
exports.deletePatent = async (req, res) => {
  try {
    await Patent.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Patent deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting patent", error: err.message });
  }
};
