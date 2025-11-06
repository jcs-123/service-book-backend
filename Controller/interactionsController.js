const Interactions = require("../model/interactionsModel");

// ➕ Add Interaction
exports.addInteraction = async (req, res) => {
  try {
    const { gmail, title, academicYear } = req.body;
    const certificate = req.file ? `/uploads/${req.file.filename}` : null;

    const newInteraction = new Interactions({
      gmail,
      title,
      academicYear,
      certificate,
    });

    await newInteraction.save();
    res.status(201).json({ success: true, message: "Interaction added" });
  } catch (err) {
    console.error("Error adding interaction:", err);
    res.status(500).json({ success: false, message: "Error adding interaction" });
  }
};

// 📥 Get by Gmail
exports.getByGmail = async (req, res) => {
  try {
    const { gmail } = req.params;
    const data = await Interactions.find({ gmail }).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    console.error("Error fetching:", err);
    res.status(500).json({ success: false, message: "Error fetching interactions" });
  }
};

// ✏️ Update Interaction
exports.updateInteraction = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };
    if (req.file) updateFields.certificate = `/uploads/${req.file.filename}`;

    const updated = await Interactions.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, message: "Interaction updated", data: updated });
  } catch (err) {
    console.error("Error updating:", err);
    res.status(500).json({ success: false, message: "Error updating interaction" });
  }
};

// ❌ Delete Interaction
exports.deleteInteraction = async (req, res) => {
  try {
    const { id } = req.params;
    await Interactions.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting:", err);
    res.status(500).json({ success: false, message: "Error deleting interaction" });
  }
};

// ======================================================
// 🌍 FORMATTED INTERACTIONS DATA (for Admin Excel Export)
// ======================================================
exports.getAllInteractionsFormatted = async (req, res) => {
  console.log("\n🟢 /api/interactions/get called");

  try {
    const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

    const interactions = await Interactions.find(
      {},
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );

    const formatted = interactions.map((i, index) => {
      const fileURL = i.certificate ? `${BASE_URL}${i.certificate}` : "";
      const viewLink = fileURL ? `=HYPERLINK("${fileURL}", "View File")` : "";

      return {
        "Sl No": index + 1,
        Gmail: i.gmail || "",
        Title: i.title || "",
        "Academic Year": i.academicYear || "",
        Certificate: viewLink,
      };
    });

    console.log(`✅ ${formatted.length} interaction(s) formatted successfully`);
    res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("❌ Error fetching formatted interactions:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching interactions",
      error: error.message,
    });
  }
};
