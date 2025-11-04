const SubjectEngaged = require("../model/SubjectEngaged");

// 📥 Create or update subjects for a Gmail
exports.createOrUpdateSubjects = async (req, res) => {
  try {
    const { subjects, gmail } = req.body;

    if (!gmail) {
      return res.status(400).json({ success: false, message: "Gmail is required" });
    }

    if (!subjects || !Array.isArray(subjects)) {
      return res.status(400).json({
        success: false,
        message: "Subjects array is required",
      });
    }

    for (let subject of subjects) {
      if (!subject.academicYear || !subject.subjectCode || !subject.subjectName) {
        return res.status(400).json({
          success: false,
          message: "Academic Year, Subject Code, and Subject Name are required for all subjects",
        });
      }
    }

    let existing = await SubjectEngaged.findOne({ gmail });

    if (existing) {
      existing.subjects = subjects;
      await existing.save();
      return res.status(200).json({ success: true, message: "Subjects updated successfully", data: existing });
    } else {
      const newData = new SubjectEngaged({ gmail, subjects });
      await newData.save();
      return res.status(201).json({ success: true, message: "Subjects saved successfully", data: newData });
    }
  } catch (error) {
    console.error("Error saving subjects:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// 📤 Get subjects by Gmail
exports.getSubjectsByGmail = async (req, res) => {
  try {
    const { gmail } = req.query;
    if (!gmail) return res.status(400).json({ success: false, message: "Gmail is required" });

    const subjects = await SubjectEngaged.findOne({ gmail });
    if (!subjects) return res.status(404).json({ success: false, message: "No subjects found for this Gmail" });

    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// 📚 Get all subjects (admin view)
exports.getAllSubjects = async (req, res) => {
  try {
    const allSubjects = await SubjectEngaged.find();
    res.status(200).json({ success: true, data: allSubjects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
