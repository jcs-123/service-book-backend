const GeneralDetails = require("../model/GeneralDetails");

// ✅ Create or Update by staffId
exports.createGeneralDetails = async (req, res) => {
  try {
    const { staffId } = req.body;

    if (!staffId) {
      return res.status(400).json({
        success: false,
        message: "Staff ID is required",
      });
    }

    // 🔍 Check if staffId already exists
    const existing = await GeneralDetails.findOne({ staffId });

    if (existing) {
      // 🔁 Update instead of inserting a duplicate
      const updated = await GeneralDetails.findOneAndUpdate(
        { staffId },
        req.body,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: `Record for Staff ID ${staffId} updated successfully`,
        data: updated,
      });
    }

    // 🆕 If not exists, create new
    const newData = new GeneralDetails(req.body);
    await newData.save();

    res.status(201).json({
      success: true,
      message: "General details saved successfully",
      data: newData,
    });
  } catch (err) {
    console.error("Error saving general details:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save details",
      error: err.message,
    });
  }
};

// ✅ Get All
exports.getGeneralDetails = async (req, res) => {
  try {
    const records = await GeneralDetails.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching data" });
  }
};

// ✅ Get by MongoDB ID
exports.getGeneralDetailsById = async (req, res) => {
  try {
    const record = await GeneralDetails.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching record" });
  }
};

// ✅ Update by ID
exports.updateGeneralDetails = async (req, res) => {
  try {
    const updated = await GeneralDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating record" });
  }
};
