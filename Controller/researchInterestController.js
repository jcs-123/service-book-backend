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

exports.getAllResearchInterests = async (req, res) => {
  console.log("\n🟢 /api/researchinterest/get called");

  try {
    // Fetch all research interests excluding system fields
    const interests = await ResearchInterest.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    // 🧠 Format data for readability / Excel export
    const formattedData = interests.map((i) => ({
      Gmail: i.gmail || "",
      "Research Interest Title": i.title || "",
    }));

    console.log(`✅ ${formattedData.length} research interest record(s) fetched successfully`);

    res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData,
    });
  } catch (err) {
    console.error("❌ Error fetching research interests:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching research interests",
      error: err.message,
    });
  }
};