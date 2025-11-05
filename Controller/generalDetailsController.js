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
/* ======================================================
   📊 DETAILED FORMATTED EXPORT DATA (Full Service Book View)
====================================================== */
exports.getAllGeneralDetailsFormatted = async (req, res) => {
  console.log("\n🟢 /api/general/get called");

  try {
    const details = await GeneralDetails.find(
      {},
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );

    const formattedData = details.map((item) => ({
      // =========================
      // 🧾 General Details
      // =========================
      "Title": item.title || "",
      "Name": item.name || "",
      "Date of Join": item.dateOfJoin
        ? new Date(item.dateOfJoin).toLocaleDateString("en-GB")
        : "",
      "Date of Birth": item.dateOfBirth
        ? new Date(item.dateOfBirth).toLocaleDateString("en-GB")
        : "",
      "Religion": item.religion || "",
      "Staff ID": item.staffId || "",
      "Gender": item.gender || "",
      "Employee ID": item.employeeId || "",
      "Blood Group": item.bloodGroup || "",
      "Caste": item.caste || "",
      "Department": item.department || "",
      "Designation": item.designation || "",
      "Contract Type": item.contractType || "",
      "Category": item.category || "",
      "Institution Last Worked": item.institutionLastWorked || "",
      "KTU ID": item.ktuId || "",
      "PEN No": item.penNo || "",

      // =========================
      // 👨‍👩‍👧 Personal Details
      // =========================
      "Marital Status": item.maritalStatus || "",
      "Mother Name": item.motherName || "",
      "Father Name": item.fatherName || "",
      "Spouse Name": item.spouseName || "",
      "Nationality": item.nationality || "",

      // =========================
      // 🏠 Contact Details
      // =========================
      "House Name (Present)": item.houseName || "",
      "Street (Present)": item.street || "",
      "Post / Street 2 (Present)": item.post2 || "",
      "District (Present)": item.district || "",
      "PIN (Present)": item.pin || "",
      "State (Present)": item.state || "",
      "Phone": item.phone || "",
      "Phone (RES)": item.phoneRes || "",
      "Email": item.email || "",
      "Office Address": item.officeAddress || "",

      // =========================
      // 🏦 Bank Details
      // =========================
      "Bank Name": item.bankName || "",
      "Bank Account No.": item.accountNo || "",
      "Bank Branch": item.bankBranch || "",
      "IFSC Code": item.ifsc || "",

      // =========================
      // 🔐 Login Details
      // =========================
      "Username": item.username || "",
      "Default Password": item.password || "",
    }));

    console.log(
      `✅ ${formattedData.length} general detail record(s) fetched successfully`
    );

    res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData,
    });
  } catch (err) {
    console.error("❌ Error fetching general details:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching general details",
      error: err.message,
    });
  }
};
