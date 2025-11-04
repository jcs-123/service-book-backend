const ActivityLog = require("../model/Activitylog");

// Helper for timestamp logging
const timeNow = () => new Date().toLocaleString();

// ======================================================
// 📥 ADD NEW ACTIVITY
// ======================================================
exports.addActivity = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] ➕ Add Activity Request`);
  console.log("📩 Request Body:", req.body);

  try {
    const { gmail, title, academicYear, fromDate, toDate, cost } = req.body;

    if (!gmail || !title) {
      return res.status(400).json({
        success: false,
        message: "Gmail and Title are required!",
      });
    }

    const newActivity = new ActivityLog({
      gmail,
      title,
      academicYear,
      fromDate,
      toDate,
      cost,
    });

    await newActivity.save();

    console.log(`✅ Added activity: ${title} (${gmail})`);
    res.status(201).json({
      success: true,
      message: "✅ Activity added successfully!",
      data: newActivity,
    });
  } catch (err) {
    console.error("❌ Error adding activity:", err);
    res.status(500).json({
      success: false,
      message: "Server error while adding activity",
      error: err.message,
    });
  }
};

// ======================================================
// 📄 GET ACTIVITIES BY GMAIL
// ======================================================
exports.getActivitiesByGmail = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] 📤 Fetch Activities Request`);
  console.log("📧 Gmail:", req.params.gmail);

  try {
    const { gmail } = req.params;
    const activities = await ActivityLog.find({ gmail }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (err) {
    console.error("❌ Error fetching activities:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching activities",
      error: err.message,
    });
  }
};

// ======================================================
// ✏️ UPDATE ACTIVITY
// ======================================================
exports.updateActivity = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] ✏️ Update Activity Request`);
  console.log("🆔 ID:", req.params.id);

  try {
    const { id } = req.params;
    const updated = await ActivityLog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    console.log(`✅ Updated activity ID: ${id}`);
    res.status(200).json({
      success: true,
      message: "✅ Activity updated successfully!",
      data: updated,
    });
  } catch (err) {
    console.error("❌ Error updating activity:", err);
    res.status(500).json({
      success: false,
      message: "Error updating activity",
      error: err.message,
    });
  }
};

// ======================================================
// 🗑️ DELETE ACTIVITY
// ======================================================
exports.deleteActivity = async (req, res) => {
  console.log(`\n🕓 [${timeNow()}] 🗑️ Delete Activity Request`);
  console.log("🆔 ID:", req.params.id);

  try {
    const { id } = req.params;
    const deleted = await ActivityLog.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    console.log(`✅ Deleted activity: ${deleted.title}`);
    res.status(200).json({
      success: true,
      message: "🗑️ Activity deleted successfully!",
    });
  } catch (err) {
    console.error("❌ Error deleting activity:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting activity",
      error: err.message,
    });
  }
};

exports.getAllActivityLogs = async (req, res) => {
  console.log("\n🟢 /api/activitylog/get called");

  try {
    // Fetch all activity logs excluding system fields
    const logs = await ActivityLog.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    // 🧠 Format and rename keys for clarity
    const formattedData = logs.map((log) => ({
      Gmail: log.gmail || "",
      "Activity Title": log.title || "",
      "During Academic Year": log.academicYear || "",
      "From Date": log.fromDate
        ? new Date(log.fromDate).toLocaleDateString("en-GB")
        : "",
      "To Date": log.toDate
        ? new Date(log.toDate).toLocaleDateString("en-GB")
        : "",
      "Cost (₹)": log.cost ? `₹${log.cost}` : "",
    }));

    console.log(`✅ ${formattedData.length} activity log record(s) fetched successfully`);

    res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData,
    });
  } catch (err) {
    console.error("❌ Error fetching activity logs:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching activity logs",
      error: err.message,
    });
  }
};