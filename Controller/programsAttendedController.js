const ProgramsAttended = require("../model/programsAttendedModel");
const fs = require("fs");
const path = require("path");

// 🟢 CREATE a new program record
exports.addProgram = async (req, res) => {
  try {
    const {
      gmail,
      category,
      subCategory,
      title,
      period,
      fundingAgency,
      organisedBy,
      fromDate,
      toDate,
    } = req.body;

    const certificate = req.file ? `/uploads/${req.file.filename}` : null;

    const newProgram = new ProgramsAttended({
      gmail,
      category,
      subCategory,
      title,
      period,
      fundingAgency,
      organisedBy,
      fromDate,
      toDate,
      certificate,
    });

    await newProgram.save();
    res.status(201).json({
      success: true,
      message: "Program added successfully!",
      data: newProgram,
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

// 🟢 READ: Get all programs for a user (by Gmail)
exports.getProgramsByGmail = async (req, res) => {
  try {
    const { gmail } = req.params;
    const programs = await ProgramsAttended.find({ gmail }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: programs,
    });
  } catch (error) {
    console.error("❌ Error fetching programs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching programs",
      error: error.message,
    });
  }
};

// 🟢 UPDATE: Edit an existing program (with optional new certificate)
exports.updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    // If new file uploaded, update the path
    if (req.file) {
      const newFilePath = `/uploads/${req.file.filename}`;
      updateFields.certificate = newFilePath;

      // Delete old file if it exists
      const existing = await ProgramsAttended.findById(id);
      if (existing && existing.certificate) {
        const oldFilePath = path.join(__dirname, "..", existing.certificate);
        fs.unlink(oldFilePath, (err) => {
          if (err) console.warn("Old file delete skipped:", err.message);
        });
      }
    }

    const updatedProgram = await ProgramsAttended.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedProgram) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Program updated successfully!",
      data: updatedProgram,
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

// 🟢 DELETE a program record
exports.deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await ProgramsAttended.findById(id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    // Delete certificate file from uploads folder
    if (program.certificate) {
      const filePath = path.join(__dirname, "..", program.certificate);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("File deletion skipped:", err.message);
      });
    }

    await ProgramsAttended.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Program deleted successfully!",
    });
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
// 📊 FORMATTED PROGRAMS ATTENDED DATA (for Admin Excel Export)
// ======================================================
exports.getAllProgramsAttendedFormatted = async (req, res) => {
  console.log("\n🟢 /api/programs-attended/get called");

  try {
    const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

    // Fetch all programs without internal fields
    const programs = await ProgramsAttended.find(
      {},
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );

    // Format data for Excel or admin view
    const formatted = programs.map((p, index) => {
      const fileURL = p.certificate ? `${BASE_URL}${p.certificate}` : "";
      const viewLink = fileURL ? `=HYPERLINK("${fileURL}", "View File")` : "";

      return {
        "Sl No": index + 1,
        "Gmail": p.gmail || "",
        "Category": p.category || "",
        "Sub Category": p.subCategory || "",
        "Title": p.title || "",
        "Period": p.period || "",
        "Funding Agency": p.fundingAgency || "",
        "Organised By": p.organisedBy || "",
        "From Date": p.fromDate ? new Date(p.fromDate).toLocaleDateString("en-GB") : "",
        "To Date": p.toDate ? new Date(p.toDate).toLocaleDateString("en-GB") : "",
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
    console.error("❌ Error fetching formatted programs:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching programs",
      error: error.message,
    });
  }
};
