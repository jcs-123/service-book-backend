const ProjectGuided = require("../model/projectguided");

/* ======================================================
   📥 ADD NEW PROJECT GUIDED ENTRY
====================================================== */
exports.addProjectGuided = async (req, res) => {
  try {
    const {
      email,
      name,
      academicYear,
      isFunded,
      fundedAgency,
      coInvestigator,
      level,
    } = req.body;

    if (!email || !name || !academicYear) {
      return res.status(400).json({
        success: false,
        message: "Email, Project Name, and Academic Year are required!",
      });
    }

    const newProject = new ProjectGuided({
      email,
      name,
      academicYear,
      isFunded,
      fundedAgency,
      coInvestigator,
      level,
    });

    await newProject.save();

    return res.status(201).json({
      success: true,
      message: "Project / Research guided entry added successfully ✅",
      data: newProject,
    });
  } catch (err) {
    console.error("❌ Error adding project guided:", err);
    res.status(500).json({
      success: false,
      message: "Server error while adding project guided entry",
      error: err.message,
    });
  }
};

/* ======================================================
   📄 FETCH ALL PROJECTS GUIDED (optionally by email)
====================================================== */
exports.getAllProjectGuided = async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email ? { email } : {};

    const data = await ProjectGuided.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    console.error("❌ Error fetching project guided data:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching project guided data",
      error: err.message,
    });
  }
};

/* ======================================================
   ✏️ UPDATE PROJECT GUIDED ENTRY
====================================================== */
exports.updateProjectGuided = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ProjectGuided.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Project guided entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project guided entry updated successfully ✅",
      data: updated,
    });
  } catch (err) {
    console.error("❌ Error updating project guided:", err);
    res.status(500).json({
      success: false,
      message: "Error updating project guided entry",
      error: err.message,
    });
  }
};

/* ======================================================
   🗑️ DELETE PROJECT GUIDED ENTRY
====================================================== */
exports.deleteProjectGuided = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ProjectGuided.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Project guided entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project guided entry deleted successfully 🗑️",
    });
  } catch (err) {
    console.error("❌ Error deleting project guided:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting project guided entry",
      error: err.message,
    });
  }
};
