const Mooc = require("../Model/moocModel");

/* ======================================================
   ➕ ADD MOOC COURSE
====================================================== */
exports.addMooc = async (req, res) => {
  try {
    const { gmail, title, conductedBy, fromDate, toDate, duration, sort } = req.body;

    const newMooc = new Mooc({
      gmail,
      title,
      conductedBy,
      fromDate,
      toDate,
      duration,
      sort,
    });

    await newMooc.save();

    res.status(201).json({
      success: true,
      message: "MOOC course added successfully ✅",
      data: newMooc,
    });
  } catch (err) {
    console.error("❌ Error adding MOOC:", err);
    res.status(500).json({
      success: false,
      message: "Error adding course",
      error: err.message,
    });
  }
};

/* ======================================================
   📥 GET ALL COURSES BY GMAIL
====================================================== */
exports.getMoocsByGmail = async (req, res) => {
  try {
    const data = await Mooc.find({ gmail: req.params.gmail }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error("❌ Error fetching courses:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: err.message,
    });
  }
};

/* ======================================================
   ✏️ UPDATE COURSE
====================================================== */
exports.updateMooc = async (req, res) => {
  try {
    const updated = await Mooc.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ success: false, message: "Course not found ❌" });

    res.json({
      success: true,
      message: "Course updated successfully ✅",
      data: updated,
    });
  } catch (err) {
    console.error("❌ Error updating course:", err);
    res.status(500).json({
      success: false,
      message: "Error updating course",
      error: err.message,
    });
  }
};

/* ======================================================
   ❌ DELETE COURSE
====================================================== */
exports.deleteMooc = async (req, res) => {
  try {
    await Mooc.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "MOOC course deleted successfully ✅",
    });
  } catch (err) {
    console.error("❌ Error deleting course:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: err.message,
    });
  }
};

/* ======================================================
   📊 FORMATTED DATA FOR ADMIN EXCEL EXPORT
====================================================== */
exports.getAllMoocFormatted = async (req, res) => {
  console.log("\n🟢 /api/mooc/get called");

  try {
    const moocs = await Mooc.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });

    const formatted = moocs.map((m, index) => ({
      "Sl No": index + 1,
      Title: m.title || "",
      "Conducted By": m.conductedBy || "",
      "From Date": m.fromDate
        ? new Date(m.fromDate).toLocaleDateString("en-GB")
        : "",
      "To Date": m.toDate
        ? new Date(m.toDate).toLocaleDateString("en-GB")
        : "",
      Duration: m.duration || "",
      Sort: m.sort || "",
    }));

    console.log(`✅ ${formatted.length} MOOC course(s) formatted successfully`);
    res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("❌ Error fetching formatted MOOC data:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching MOOC data",
      error: error.message,
    });
  }
};
