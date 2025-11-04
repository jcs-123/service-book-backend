const Qualification = require("../model/qualification");
const fs = require("fs");
const path = require("path");

/**
 * 📥 ADD Qualification
 * Method: POST /api/qualifications
 */
exports.addQualification = async (req, res) => {
  try {
    const {
      email,
      degree,
      discipline,
      university,
      percentage,
      registrationYear,
      passingYear,
      remarks,
    } = req.body;

    let certificate = "";
    if (req.file) {
      certificate = req.file.filename;
    }

    const newQualification = new Qualification({
      email,
      degree,
      discipline,
      university,
      percentage,
      registrationYear,
      passingYear,
      remarks,
      certificate,
    });

    await newQualification.save();

    res.status(201).json({
      success: true,
      message: "Qualification added successfully ✅",
      data: newQualification,
    });
  } catch (error) {
    console.error("❌ Error adding qualification:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding qualification ❌",
      error: error.message,
    });
  }
};

/**
 * 📤 GET Qualifications by Email
 * Method: GET /api/qualifications/:email
 */
exports.getQualificationsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const qualifications = await Qualification.find({ email }).sort({
      createdAt: -1,
    });

    if (!qualifications || qualifications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No qualifications found for this email ❌",
      });
    }

    res.status(200).json({
      success: true,
      data: qualifications,
    });
  } catch (error) {
    console.error("❌ Error fetching qualifications:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching qualifications ❌",
      error: error.message,
    });
  }
};

/**
 * ✏️ UPDATE Qualification
 * Method: PUT /api/qualifications/:id
 */
exports.updateQualification = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.certificate = req.file.filename;
    }

    const qualification = await Qualification.findById(id);
    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: "Qualification not found ❌",
      });
    }

    // Delete old file if replaced
    if (req.file && qualification.certificate) {
      const oldPath = path.join("uploads", qualification.certificate);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const updated = await Qualification.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Qualification updated successfully ✅",
      data: updated,
    });
  } catch (error) {
    console.error("❌ Error updating qualification:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating qualification ❌",
      error: error.message,
    });
  }
};

/**
 * 🗑️ DELETE Qualification
 * Method: DELETE /api/qualifications/:id
 */
exports.deleteQualification = async (req, res) => {
  try {
    const { id } = req.params;

    const qualification = await Qualification.findById(id);
    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: "Qualification not found ❌",
      });
    }

    // Delete certificate file if exists
    if (qualification.certificate) {
      const filePath = path.join("uploads", qualification.certificate);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Qualification.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Qualification deleted successfully ✅",
    });
  } catch (error) {
    console.error("❌ Error deleting qualification:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting qualification ❌",
      error: error.message,
    });
  }
};

exports.getAllQualifications = async (req, res) => {
  console.log("\n🟢 /api/qualifications/get called");

  try {
    const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

    const qualifications = await Qualification.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    const formattedQualifications = qualifications.map((q) => {
      // 🧠 Full link to file if available
      const fileURL = q.certificate ? `${BASE_URL}/uploads/${q.certificate}` : "";

      // 🧩 Excel formula for clickable link
      const viewLink = fileURL ? `=HYPERLINK("${fileURL}", "View File")` : "";

      return {
        Gmail: q.email || "",
        Degree: q.degree || "",
        Discipline: q.discipline || "",
        University: q.university || "",
        Percentage: q.percentage || "",
        "Registration Year": q.registrationYear || "",
        "Passing Year": q.passingYear || "",
        Remarks: q.remarks || "",
        Certificate: viewLink, // ✅ Clickable “View File” in Excel
      };
    });

    console.log(`✅ ${formattedQualifications.length} Qualification record(s) fetched successfully`);

    res.status(200).json({
      success: true,
      count: formattedQualifications.length,
      data: formattedQualifications,
    });
  } catch (err) {
    console.error("❌ Error fetching qualifications:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching qualifications",
      error: err.message,
    });
  }
};