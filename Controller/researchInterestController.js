const ResearchInterest = require("../model/researchInterestModel");

// ➕ Add Research Interest
exports.addInterest = async (req, res) => {
  try {
    const { gmail, title } = req.body;
    if (!gmail || !title)
      return res.status(400).json({ success: false, message: "All fields required" });

    const newInterest = new ResearchInterest({ gmail, title });
    await newInterest.save();

    res.status(201).json({ success: true, message: "Research Interest added", data: newInterest });
  } catch (err) {
    console.error("Error adding interest:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// 📥 Get Interests by Gmail
exports.getInterestsByGmail = async (req, res) => {
  try {
    const { gmail } = req.params;
    const data = await ResearchInterest.find({ gmail }).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    console.error("Error fetching interests:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// ✏️ Update
exports.updateInterest = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ResearchInterest.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, message: "Updated successfully", data: updated });
  } catch (err) {
    console.error("Error updating:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// ❌ Delete
exports.deleteInterest = async (req, res) => {
  try {
    const { id } = req.params;
    await ResearchInterest.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};
