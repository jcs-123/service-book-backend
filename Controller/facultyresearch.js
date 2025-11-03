const FacultyResearch = require("../model/FacultyResearch");

/* ======================================================
   📥 ADD FACULTY RESEARCH
====================================================== */
exports.addFacultyResearch = async (req, res) => {
  try {
    const {
      email,
      title,
      isCollaborative,
      collaborator,
      academicYear,
      isFunded,
      status,
      fundAmount,
    } = req.body;

    if (!email || !title) {
      return res
        .status(400)
        .json({ success: false, message: "Email and Title are required!" });
    }

    const newResearch = new FacultyResearch({
      email,
      title,
      isCollaborative,
      collaborator,
      academicYear,
      isFunded,
      status,
      fundAmount,
    });

    await newResearch.save();

    res.status(201).json({
      success: true,
      message: "Faculty research added successfully ✅",
      data: newResearch,
    });
  } catch (err) {
    console.error("❌ Error adding faculty research:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

/* ======================================================
   📤 GET ALL FACULTY RESEARCH BY EMAIL
====================================================== */
exports.getFacultyResearchByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const data = await FacultyResearch.find({ email }).sort({ createdAt: -1 });

    if (!data.length) {
      return res.status(404).json({
        success: false,
        message: "No records found for this user ❌",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("❌ Error fetching faculty research:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

/* ======================================================
   ✏️ UPDATE FACULTY RESEARCH
====================================================== */
exports.updateFacultyResearch = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await FacultyResearch.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found ❌" });
    }

    res.status(200).json({
      success: true,
      message: "Faculty research updated successfully ✅",
      data: updated,
    });
  } catch (err) {
    console.error("❌ Error updating faculty research:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

/* ======================================================
   🗑️ DELETE FACULTY RESEARCH
====================================================== */
exports.deleteFacultyResearch = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await FacultyResearch.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found ❌" });
    }

    res
      .status(200)
      .json({ success: true, message: "Faculty research deleted ✅" });
  } catch (err) {
    console.error("❌ Error deleting faculty research:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
