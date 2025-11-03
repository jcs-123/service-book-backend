const Positions = require("../model/positionsModel");

// ➕ Add
exports.addPosition = async (req, res) => {
  try {
    const { gmail, position, academicYear, period, startDate, endDate } =
      req.body;
    const newPos = new Positions({
      gmail,
      position,
      academicYear,
      period,
      startDate,
      endDate,
    });
    await newPos.save();
    res.status(201).json({ success: true, message: "Position added successfully" });
  } catch (error) {
    console.error("Error adding position:", error);
    res.status(500).json({ success: false, message: "Error adding position" });
  }
};

// 📥 Get all by Gmail
exports.getPositionsByGmail = async (req, res) => {
  try {
    const { gmail } = req.params;
    const data = await Positions.find({ gmail }).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ success: false, message: "Error fetching positions" });
  }
};

// ✏️ Update
exports.updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Positions.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated)
      return res.status(404).json({ success: false, message: "Position not found" });
    res.json({ success: true, message: "Position updated successfully", data: updated });
  } catch (error) {
    console.error("Error updating position:", error);
    res.status(500).json({ success: false, message: "Error updating position" });
  }
};

// ❌ Delete
exports.deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    await Positions.findByIdAndDelete(id);
    res.json({ success: true, message: "Position deleted successfully" });
  } catch (error) {
    console.error("Error deleting position:", error);
    res.status(500).json({ success: false, message: "Error deleting position" });
  }
};
