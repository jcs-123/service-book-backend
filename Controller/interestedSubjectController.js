const InterestedSubject = require("../model/InterestedSubject");

// Helper: Get timestamp for logs
const timeNow = () => new Date().toLocaleString();

// ======================================================
// 📥 Add New Interested Subject
// ======================================================
exports.addSubject = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] ➕ Add Subject Request Received`);
  console.log("📩 Request Body:", req.body);

  try {
    const { gmail, title } = req.body;

    if (!gmail || !title) {
      console.log("⚠️ Missing Gmail or Title");
      return res.status(400).json({
        success: false,
        message: "Gmail and Title are required!",
      });
    }

    const exists = await InterestedSubject.findOne({ gmail, title });
    if (exists) {
      console.log(`🚫 Duplicate entry found for ${title} (${gmail})`);
      return res.status(400).json({
        success: false,
        message: "Subject already exists!",
      });
    }

    const newSubject = new InterestedSubject({ gmail, title });
    await newSubject.save();

    console.log(`✅ Added new subject: ${title} (${gmail})`);
    res.status(201).json({
      success: true,
      message: "✅ Subject added successfully!",
      data: newSubject,
    });
  } catch (err) {
    console.error(`❌ [${timeNow()}] Error adding subject:`, err);
    res.status(500).json({
      success: false,
      message: "Server error while adding subject",
      error: err.message,
    });
  }
};

// ======================================================
// 📄 Get All Subjects by Gmail
// ======================================================
exports.getSubjectsByGmail = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] 📤 Fetch Subjects Request`);
  console.log("📧 Gmail:", req.params.gmail);

  try {
    const { gmail } = req.params;
    const subjects = await InterestedSubject.find({ gmail }).sort({
      createdAt: -1,
    });

    console.log(`✅ Found ${subjects.length} subjects for ${gmail}`);
    res.status(200).json({
      success: true,
      data: subjects,
    });
  } catch (err) {
    console.error(`❌ [${timeNow()}] Error fetching subjects:`, err);
    res.status(500).json({
      success: false,
      message: "Error fetching subjects",
      error: err.message,
    });
  }
};

// ======================================================
// ✏️ Update a Subject
// ======================================================
exports.updateSubject = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] ✏️ Update Subject Request`);
  console.log("🆔 ID:", req.params.id);
  console.log("📦 Update Data:", req.body);

  try {
    const { id } = req.params;
    const updated = await InterestedSubject.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      console.log(`⚠️ No subject found for ID: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    console.log(`✅ Updated subject ID ${id} → ${updated.title}`);
    res.status(200).json({
      success: true,
      message: "✅ Subject updated successfully!",
      data: updated,
    });
  } catch (err) {
    console.error(`❌ [${timeNow()}] Error updating subject:`, err);
    res.status(500).json({
      success: false,
      message: "Error updating subject",
      error: err.message,
    });
  }
};

// ======================================================
// 🗑️ Delete a Subject
// ======================================================
exports.deleteSubject = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] 🗑️ Delete Subject Request`);
  console.log("🆔 ID:", req.params.id);

  try {
    const { id } = req.params;
    const deleted = await InterestedSubject.findByIdAndDelete(id);

    if (!deleted) {
      console.log(`⚠️ No subject found to delete (ID: ${id})`);
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    console.log(`✅ Deleted subject: ${deleted.title} (${deleted.gmail})`);
    res.status(200).json({
      success: true,
      message: "🗑️ Subject deleted successfully!",
    });
  } catch (err) {
    console.error(`❌ [${timeNow()}] Error deleting subject:`, err);
    res.status(500).json({
      success: false,
      message: "Error deleting subject",
      error: err.message,
    });
  }
};
