const express = require("express");
const router = express.Router();
const logincontroller = require("./Controller/logincontroller");
const qualification = require("./Controller/qualificationcontroller");
const upload = require("./config/multerConfig"); // ✅ use the multer config file
const experiencecontroller = require("./Controller/experiencecontrolelr");
const facultyresearch = require("./Controller/facultyresearch");
const consultancyController = require("./Controller/consultancy");
const projectguided = require("./Controller/projectguided");
const Achievement = require("./Controller/Achievementcontroller");
const interestsubject = require("./Controller/interestedSubjectController");
const Activitylog = require("./Controller/Activitylogcontroller");
const Adminstrativework = require("./Controller/Adminstrativeworkcontroller");
const profectionalbodymembership = require("./Controller/profectionalbodycontroller");



/* ====================== LOGIN ROUTES ====================== */
router.post("/register", logincontroller.registerUser);
router.post("/login", logincontroller.loginUser);
router.get("/", logincontroller.getAllUsers);
router.post("/forgot-password", logincontroller.forgotPassword);
router.post("/verify-otp", logincontroller.verifyOtp);
router.post("/reset-password", logincontroller.resetPassword);
router.put("/change-password", logincontroller.changePassword);

/* =================== QUALIFICATION ROUTES ================== */
router.post("/qualification", upload.single("certificate"), qualification.addQualification);
router.get("/qualification/:email", qualification.getQualificationsByEmail);
router.put("/qualification/:id", upload.single("certificate"), qualification.updateQualification);
router.delete("/qualification/:id", qualification.deleteQualification);

// exepereienece
router.post("/experience", upload.single("certificate"),experiencecontroller. addExperience);
router.get("/experience/:email",experiencecontroller. getExperiencesByEmail);
router.put("/experience/:id", upload.single("certificate"), experiencecontroller.updateExperience);
router.delete("/experience/:id", experiencecontroller.deleteExperience);

// faculty reserarch
router.post("/faculty-research", facultyresearch.addFacultyResearch);
router.get("/faculty-research/:email", facultyresearch.getFacultyResearchByEmail);
router.put("/faculty-research/:id", facultyresearch.updateFacultyResearch);
router.delete("/faculty-research/:id",facultyresearch. deleteFacultyResearch);

// consultancy
router.post("/consultancy", consultancyController.addConsultancy);
router.get("/consultancy/:email", consultancyController.getConsultancyByEmail);
router.put("/consultancy/:id", consultancyController.updateConsultancy);
router.delete("/consultancy/:id", consultancyController.deleteConsultancy);

// projectguided
router.post("/add", projectguided.addProjectGuided);
router.get("/view", projectguided.getAllProjectGuided);
router.put("/update/:id", projectguided.updateProjectGuided);
router.delete("/delete/:id", projectguided.deleteProjectGuided);


// achievmnet
router.post("/achievements",Achievement. addAchievement);
router.get("/achievements/:gmail",Achievement. getAchievementsByGmail);
router.put("/achievements/:id",Achievement. updateAchievement);
router.delete("/achievements/:id", Achievement.deleteAchievement);

// interest subject

router.post("/addinterestsubject", interestsubject.addSubject);
router.get("/getinterest/:gmail", interestsubject.getSubjectsByGmail);
router.put("/updateinterest/:id", interestsubject.updateSubject);
router.delete("/deleteinterest/:id", interestsubject.deleteSubject);


// activitylog
router.post("/addactivity", Activitylog.addActivity);
router.get("/getactivities/:gmail", Activitylog.getActivitiesByGmail);
router.put("/updateactivity/:id", Activitylog.updateActivity);
router.delete("/deleteactivity/:id", Activitylog.deleteActivity);

// adminstrative work
router.post("/addadminwork", Adminstrativework.addWork);
router.get("/getadminworks/:gmail", Adminstrativework.getWorksByGmail);
router.put("/updateadminwork/:id", Adminstrativework.updateWork);
router.delete("/deleteadminwork/:id", Adminstrativework.deleteWork);

// profectionalbodymembership
router.post("/addmembership", profectionalbodymembership.addMembership);
router.get("/getmemberships/:gmail", profectionalbodymembership.getMemberships);
router.put("/updatemembership/:id", profectionalbodymembership.updateMembership);
router.delete("/deletemembership/:id", profectionalbodymembership.deleteMembership);
module.exports = router;



module.exports = router;
