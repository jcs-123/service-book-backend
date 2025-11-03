// Controller/publicationController.js
const Publication = require("../model/Publications"); // adjust if needed

// ➕ Create Publication
exports.addPublication = async (req, res) => {
  try {
    const { gmail, category, title, nameOfPublication, patentNo, indexing, academicYear, date, period } = req.body;
    const document = req.file ? `/uploads/${req.file.filename}` : null;

    const newPub = new Publication({
      gmail,
      category,
      title,
      nameOfPublication,
      patentNo,
      indexing,
      academicYear,
      date,
      period,
      document,
    });

    await newPub.save();
    res.json({ success: true, message: "Publication added successfully" });
  } catch (error) {
    console.error("Error adding publication:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// 📥 Get Publications by Gmail
exports.getPublicationsByGmail = async (req, res) => {
  try {
    const { gmail } = req.params;
    const publications = await Publication.find({ gmail }).sort({ createdAt: -1 });
    res.json({ success: true, data: publications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching data", error });
  }
};

// 🗑️ Delete Publication
exports.deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    await Publication.findByIdAndDelete(id);
    res.json({ success: true, message: "Publication deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting", error });
  }
};

// 🟢 UPDATE Publication (for Edit)
exports.updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    if (req.file) {
      updateFields.document = `/uploads/${req.file.filename}`;
    }

    const updated = await Publication.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Publication not found" });
    }

    res.json({ success: true, message: "Publication updated successfully", data: updated });
  } catch (error) {
    console.error("Error updating publication:", error);
    res.status(500).json({ success: false, message: "Error updating publication", error });
  }
};
