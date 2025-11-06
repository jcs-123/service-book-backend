const Patent = require("../model/patentModel");

/* ======================================================
   ➕ ADD PATENT
====================================================== */
exports.addPatent = async (req, res) => {
  try {
    const { gmail, patentNo, inventors, year, status, sort } = req.body;

    const newPatent = new Patent({
      gmail,
      patentNo,
      inventors,
      year,
      status,
      sort,
    });

    await newPatent.save();
    res.status(201).json({
      success: true,
      message: "Patent added successfully ✅",
      data: newPatent,
    });
  } catch (err) {
    console.error("❌ Error adding patent:", err);
    res.status(500).json({
      success: false,
      message: "Error adding patent",
      error: err.message,
    });
  }
};

/* ======================================================
   📥 GET PATENTS BY GMAIL
====================================================== */
exports.getPatentsByGmail = async (req, res) => {
  try {
    const data = await Patent.find({ gmail: req.params.gmail }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error("❌ Error fetching patents:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching patents",
      error: err.message,
    });
  }
};

/* ======================================================
   ✏️ UPDATE PATENT
====================================================== */
exports.updatePatent = async (req, res) => {
  try {
    const updated = await Patent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ success: false, message: "Patent not found ❌" });

    res.json({
      success: true,
      message: "Patent updated successfully ✅",
      data: updated,
    });
  } catch (err) {
    console.error("❌ Error updating patent:", err);
    res.status(500).json({
      success: false,
      message: "Error updating patent",
      error: err.message,
    });
  }
};

/* ======================================================
   ❌ DELETE PATENT
====================================================== */
exports.deletePatent = async (req, res) => {
  try {
    await Patent.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Patent deleted successfully ✅",
    });
  } catch (err) {
    console.error("❌ Error deleting patent:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting patent",
      error: err.message,
    });
  }
};

/* ======================================================
   📊 FORMATTED DATA FOR EXCEL EXPORT
====================================================== */
exports.getAllPatentsFormatted = async (req, res) => {
  console.log("\n🟢 /api/patents/get called");

  try {
    const patents = await Patent.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });

    const formatted = patents.map((p, index) => ({
      "Sl No": index + 1,
      "Patent No": p.patentNo || "",
      "Inventor/s Name": p.inventors || "",
      "Year Of Patent Awarded": p.year || "",
      "Patent Status": p.status || "",
      Sort: p.sort || "",
    }));

    console.log(`✅ ${formatted.length} patent record(s) formatted successfully`);
    res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("❌ Error fetching formatted patents:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching patents",
      error: error.message,
    });
  }
};
