const Experience = require("../model/experience");
const fs = require("fs");
const path = require("path");

/**
 * 📥 ADD Experience
 * Method: POST /api/experience
 */
exports.addExperience = async (req, res) => {
  try {
    const {
      email,
      title,
      organization,
      fromDate,
      toDate,
      designation,
      employmentNature,
      dutyNature,
    } = req.body;

    let certificate = "";
    if (req.file) certificate = req.file.filename;

    const newExp = new Experience({
      email,
      title,
      organization,
      fromDate,
      toDate,
      designation,
      employmentNature,
      dutyNature,
      certificate,
    });

    await newExp.save();

    res.status(201).json({
      success: true,
      message: "Experience added successfully ✅",
      data: newExp,
    });
  } catch (error) {
    console.error("❌ Error adding experience:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding experience ❌",
      error: error.message,
    });
  }
};

/**
 * 📤 GET Experiences by Email
 * Method: GET /api/experience/:email
 */
exports.getExperiencesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const exp = await Experience.find({ email }).sort({ createdAt: -1 });

    if (!exp || exp.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No experience records found for this user ❌",
      });
    }

    res.status(200).json({ success: true, data: exp });
  } catch (error) {
    console.error("❌ Error fetching experiences:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching experiences ❌",
      error: error.message,
    });
  }
};

/**
 * ✏️ UPDATE Experience
 * Method: PUT /api/experience/:id
 */
exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) updates.certificate = req.file.filename;

    const existing = await Experience.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Experience not found ❌",
      });
    }

    // Delete old file if a new one is uploaded
    if (req.file && existing.certificate) {
      const oldPath = path.join("uploads", existing.certificate);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const updated = await Experience.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({
      success: true,
      message: "Experience updated successfully ✅",
      data: updated,
    });
  } catch (error) {
    console.error("❌ Error updating experience:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating experience ❌",
      error: error.message,
    });
  }
};

/**
 * 🗑️ DELETE Experience
 * Method: DELETE /api/experience/:id
 */
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const exp = await Experience.findById(id);
    if (!exp) {
      return res.status(404).json({
        success: false,
        message: "Experience not found ❌",
      });
    }

    // Delete certificate file if exists
    if (exp.certificate) {
      const filePath = path.join("uploads", exp.certificate);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Experience.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully ✅",
    });
  } catch (error) {
    console.error("❌ Error deleting experience:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting experience ❌",
      error: error.message,
    });
  }
};

exports.getAllExperiences = async (req, res) => {
  console.log("\n🟢 /api/experience/get called");

  try {
    const BASE_URL = process.env.BASE_URL || "https://service-book-backend.onrender.com";

    // Fetch all experiences and exclude system fields
    const experiences = await Experience.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });

    // 🧠 Map & rename fields + format for Excel
    const formatted = experiences.map((exp) => {
      const fileURL = exp.certificate ? `${BASE_URL}/uploads/${exp.certificate}` : "";
      const viewLink = fileURL ? `=HYPERLINK("${fileURL}", "View File")` : "";

      return {
        Gmail: exp.email || "",
        "Project / Work Title": exp.title || "",
        Organization: exp.organization || "",
        "From Date": exp.fromDate || "",
        "To Date": exp.toDate || "",
        Designation: exp.designation || "",
        "Nature of Employment": exp.employmentNature || "",
        "Nature of Duty": exp.dutyNature || "",
        Certificate: viewLink, // ✅ Clickable Excel link
      };
    });

    console.log(`✅ ${formatted.length} Experience record(s) fetched successfully`);

    res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (err) {
    console.error("❌ Error fetching experiences:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching experiences",
      error: err.message,
    });
  }
};