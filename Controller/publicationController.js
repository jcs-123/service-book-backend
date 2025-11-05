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

exports.getAllPublicationsFormatted = async (req, res) => {
  console.log("🟢 /api/publications/get called");

  try {
    const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

    const publications = await Publication.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    if (!publications.length) {
      return res.status(404).json({
        success: false,
        message: "No publication records found ❌",
      });
    }

    const formattedPublications = publications.map((p, index) => {
      const fileURL = p.document ? `${BASE_URL}/uploads/${p.document}` : "";
      const viewLink = fileURL ? `=HYPERLINK("${fileURL}", "View File")` : "";

      return {
        "No.": index + 1,
        Gmail: p.gmail || "",
        Category: p.category || "",
        Title: p.title || "",
        "Name of Publication": p.nameOfPublication || "",
        "Patent No": p.patentNo || "",
        Indexing: p.indexing || "",
        "Academic Year": p.academicYear || "",
        Date: p.date
          ? new Date(p.date).toLocaleDateString("en-GB")
          : "",
        Period: p.period || "",
        Document: viewLink,
      };
    });

    console.log(`✅ ${formattedPublications.length} publication(s) formatted successfully`);

    res.status(200).json({
      success: true,
      count: formattedPublications.length,
      data: formattedPublications,
    });
  } catch (err) {
    console.error("❌ Error fetching formatted publications:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching publications",
      error: err.message,
    });
  }
};
