const SeminarsGuided = require("../model/seminarsGuidedModel");

// 🟢 Add new record
exports.addSeminar = async (req, res) => {
  try {
    const {
      gmail,
      category,
      title,
      programme,
      batch,
      studentName,
      rollNo,
      academicYear,
    } = req.body;

    const certificate = req.file ? `/uploads/${req.file.filename}` : null;

    const seminar = new SeminarsGuided({
      gmail,
      category,
      title,
      programme,
      batch,
      studentName,
      rollNo,
      academicYear,
      certificate,
    });

    await seminar.save();
    res.status(201).json({ success: true, message: "Seminar added successfully" });
  } catch (error) {
    console.error("Error adding seminar:", error);
    res.status(500).json({ success: false, message: "Error adding seminar" });
  }
};

// 🟢 Get all seminars by Gmail
exports.getSeminarsByGmail = async (req, res) => {
  try {
    const { gmail } = req.params;
    const seminars = await SeminarsGuided.find({ gmail }).sort({ createdAt: -1 });
    res.json({ success: true, data: seminars });
  } catch (error) {
    console.error("Error fetching seminars:", error);
    res.status(500).json({ success: false, message: "Error fetching seminars" });
  }
};

// 🟢 Update record
exports.updateSeminar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    if (req.file) {
      updateFields.certificate = `/uploads/${req.file.filename}`;
    }

    const updated = await SeminarsGuided.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Seminar not found" });

    res.json({ success: true, message: "Seminar updated successfully", data: updated });
  } catch (error) {
    console.error("Error updating seminar:", error);
    res.status(500).json({ success: false, message: "Error updating seminar" });
  }
};

// 🟢 Delete record
exports.deleteSeminar = async (req, res) => {
  try {
    const { id } = req.params;
    await SeminarsGuided.findByIdAndDelete(id);
    res.json({ success: true, message: "Seminar deleted successfully" });
  } catch (error) {
    console.error("Error deleting seminar:", error);
    res.status(500).json({ success: false, message: "Error deleting seminar" });
  }
};
