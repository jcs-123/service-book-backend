const ProgramsCoordinated = require("../model/programsCoordinatedModel");
const fs = require("fs");
const path = require("path");

// 🟢 ADD a new coordinated program
exports.addProgram = async (req, res) => {
  try {
    const {
      gmail,
      title,
      category,
      organisedBy,
      fromDate,
      toDate,
      academicYear,
    } = req.body;

    const certificate = req.file ? `/uploads/${req.file.filename}` : null;

    const program = new ProgramsCoordinated({
      gmail,
      title,
      category,
      organisedBy,
      fromDate,
      toDate,
      academicYear,
      certificate,
    });

    await program.save();

    res.status(201).json({
      success: true,
      message: "Program added successfully",
      data: program,
    });
  } catch (error) {
    console.error("❌ Error adding program:", error);
    res.status(500).json({
      success: false,
      message: "Error adding program",
      error: error.message,
    });
  }
};

// 🟢 GET all programs for a user (by Gmail)
exports.getProgramsByGmail = async (req, res) => {
  try {
    const { gmail } = req.params;
    const programs = await ProgramsCoordinated.find({ gmail }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: programs });
  } catch (error) {
    console.error("❌ Error fetching programs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching programs",
      error: error.message,
    });
  }
};

// 🟢 UPDATE an existing record (with optional new file)
exports.updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    if (req.file) {
      const newFilePath = `/uploads/${req.file.filename}`;
      updateFields.certificate = newFilePath;

      // Delete old file if exists
      const existing = await ProgramsCoordinated.findById(id);
      if (existing && existing.certificate) {
        const oldFilePath = path.join(__dirname, "..", existing.certificate);
        fs.unlink(oldFilePath, (err) => {
          if (err) console.warn("⚠️ Old file delete skipped:", err.message);
        });
      }
    }

    const updated = await ProgramsCoordinated.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updated)
      return res.status(404).json({ success: false, message: "Program not found" });

    res.json({
      success: true,
      message: "Program updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("❌ Error updating program:", error);
    res.status(500).json({
      success: false,
      message: "Error updating program",
      error: error.message,
    });
  }
};

// 🟢 DELETE a coordinated program
exports.deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await ProgramsCoordinated.findById(id);

    if (!program)
      return res.status(404).json({ success: false, message: "Program not found" });

    // Delete uploaded file
    if (program.certificate) {
      const filePath = path.join(__dirname, "..", program.certificate);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("⚠️ File delete skipped:", err.message);
      });
    }

    await ProgramsCoordinated.findByIdAndDelete(id);

    res.json({ success: true, message: "Program deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting program:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting program",
      error: error.message,
    });
  }
};


// ======================================================
// 📊 FORMATTED PROGRAMS COORDINATED DATA (for Admin Excel Export)
// ======================================================
exports.getAllProgramsCoordinatedFormatted = async (req, res) => {
  console.log("\n🟢 /api/programs-coordinated/get called");

  try {
    const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

    const programs = await ProgramsCoordinated.find(
      {},
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );

    const formatted = programs.map((p, index) => {
      const fileURL = p.certificate ? `${BASE_URL}${p.certificate}` : "";
      const viewLink = fileURL ? `=HYPERLINK("${fileURL}", "View File")` : "";

      return {
        "Sl No": index + 1,
        "Gmail": p.gmail || "",
        "Title": p.title || "",
        "Category": p.category || "",
        "Organised By": p.organisedBy || "",
        "From Date": p.fromDate
          ? new Date(p.fromDate).toLocaleDateString("en-GB")
          : "",
        "To Date": p.toDate
          ? new Date(p.toDate).toLocaleDateString("en-GB")
          : "",
        "Academic Year": p.academicYear || "",
        "Certificate": viewLink,
      };
    });

    console.log(`✅ ${formatted.length} program(s) formatted successfully`);

    res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("❌ Error fetching formatted coordinated programs:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching programs coordinated",
      error: error.message,
    });
  }
};

