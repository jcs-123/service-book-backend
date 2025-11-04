const AdministrativeWork = require("../model/Administrativework");

// Helper for time logs
const timeNow = () => new Date().toLocaleString();

// ======================================================
// 📥 ADD NEW ADMINISTRATIVE WORK
// ======================================================
exports.addWork = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] ➕ Add Administrative Work Request`);
  console.log("📩 Body:", req.body);

  try {
    const { gmail, nameOfWork, academicYear } = req.body;

    if (!gmail || !nameOfWork) {
      return res.status(400).json({
        success: false,
        message: "Gmail and Name of Work are required!",
      });
    }

    // Optional duplicate check (same gmail + work)
    const existing = await AdministrativeWork.findOne({ gmail, nameOfWork });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This work already exists for the user.",
      });
    }

    const newWork = new AdministrativeWork({ gmail, nameOfWork, academicYear });
    await newWork.save();

    console.log(`✅ Added administrative work: ${nameOfWork} (${gmail})`);
    res.status(201).json({
      success: true,
      message: "✅ Administrative work added successfully!",
      data: newWork,
    });
  } catch (err) {
    console.error(`❌ Error adding work:`, err);
    res.status(500).json({
      success: false,
      message: "Server error while adding administrative work",
      error: err.message,
    });
  }
};

// ======================================================
// 📄 GET ALL WORKS BY GMAIL
// ======================================================
exports.getWorksByGmail = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] 📤 Fetch Works Request for Gmail: ${req.params.gmail}`);

  try {
    const { gmail } = req.params;
    const works = await AdministrativeWork.find({ gmail }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: works.length,
      data: works,
    });
  } catch (err) {
    console.error("❌ Error fetching works:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching administrative works",
      error: err.message,
    });
  }
};

// ======================================================
// ✏️ UPDATE ADMINISTRATIVE WORK
// ======================================================
exports.updateWork = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] ✏️ Update Work Request`);
  console.log("🆔 ID:", req.params.id, "📦 Data:", req.body);

  try {
    const { id } = req.params;
    const updated = await AdministrativeWork.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Administrative work not found",
      });
    }

    console.log(`✅ Updated administrative work ID: ${id}`);
    res.status(200).json({
      success: true,
      message: "✅ Administrative work updated successfully!",
      data: updated,
    });
  } catch (err) {
    console.error("❌ Error updating work:", err);
    res.status(500).json({
      success: false,
      message: "Error updating administrative work",
      error: err.message,
    });
  }
};

// ======================================================
// 🗑️ DELETE ADMINISTRATIVE WORK
// ======================================================
exports.deleteWork = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] 🗑️ Delete Administrative Work`);
  console.log("🆔 ID:", req.params.id);

  try {
    const { id } = req.params;
    const deleted = await AdministrativeWork.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Administrative work not found",
      });
    }

    console.log(`✅ Deleted work: ${deleted.nameOfWork}`);
    res.status(200).json({
      success: true,
      message: "🗑️ Administrative work deleted successfully!",
    });
  } catch (err) {
    console.error("❌ Error deleting work:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting administrative work",
      error: err.message,
    });
  }
};

exports.getAllAdministrativeWork = async (req, res) => {
  console.log("\n🟢 /api/administrativework/get called");

  try {
    // Fetch all records excluding system fields
    const works = await AdministrativeWork.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    // 🧠 Format and rename fields for readability / Excel
    const formattedData = works.map((w) => ({
      Gmail: w.gmail || "",
      "Name of Work / Responsibility": w.nameOfWork || "",
      "During Academic Year": w.academicYear || "",
    }));

    console.log(`✅ ${formattedData.length} administrative work record(s) fetched successfully`);

    res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData,
    });
  } catch (err) {
    console.error("❌ Error fetching administrative work:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching administrative work",
      error: err.message,
    });
  }
};