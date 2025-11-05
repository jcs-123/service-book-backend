const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// ====================================================
// ⚙️  MULTER CONFIGURATION (for file uploads)
// ====================================================


// ====================================================
// 🔐 AUTHENTICATION ROUTES
// ====================================================

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

// ====================================================
// 📋 GENERAL DETAILS ROUTES
// ====================================================
const {
  createGeneralDetails,
  getGeneralDetails,
  getGeneralDetailsById,
  updateGeneralDetails,
  getAllGeneralDetailsFormatted,
} = require("./Controller/generalDetailsController");

router.post("/api/general-details", createGeneralDetails);
router.get("/api/general-details", getGeneralDetails);
router.get("/api/general-details/:id", getGeneralDetailsById);
router.put("/api/general-details/:id", updateGeneralDetails);
router.get("/api/general/get", getAllGeneralDetailsFormatted);


// ====================================================
// 📘 SUBJECTS ENGAGED ROUTES
// ====================================================
// 📘 SUBJECTS ENGAGED ROUTES
const subjectEngagedController = require("./Controller/subjectEngagedController");

router.post("/subjects-engaged", subjectEngagedController.createOrUpdateSubjects);
router.get("/subjects-engaged", subjectEngagedController.getSubjectsByGmail);
router.get("/all-subjects-engaged", subjectEngagedController.getAllSubjects);
router.get("/api/subjects-engaged/get", subjectEngagedController.getAllSubjectsFormatted); // ✅ Added



// ====================================================
// 📰 PUBLICATIONS (PDF / IMAGE UPLOAD)
// ====================================================
const publicationController = require("./Controller/publicationController");


// Publications routes
router.post(
  "/api/publications",
  upload.single("document"),
  publicationController.addPublication
);

router.get(
  "/api/publications/get",
  publicationController.getAllPublicationsFormatted
); // ✅ this must come before :gmail

router.get(
  "/api/publications/:gmail",
  publicationController.getPublicationsByGmail
);

router.put(
  "/api/publications/:id",
  upload.single("document"),
  publicationController.updatePublication
);

router.delete(
  "/api/publications/:id",
  publicationController.deletePublication
);
// ====================================================
// 🎓 PROGRAMS COORDINATED ROUTES
// ====================================================
// ====================================================
// 🎓 PROGRAMS COORDINATED ROUTES
// ====================================================
const programsCoordinatedController = require("./Controller/programsCoordinatedController");

router.post(
  "/api/programs-coordinated",
  upload.single("certificate"),
  programsCoordinatedController.addProgram
);

// ✅ Add this route for Admin Excel Export
router.get(
  "/api/programs-coordinated/get",
  programsCoordinatedController.getAllProgramsCoordinatedFormatted
);

router.get(
  "/api/programs-coordinated/:gmail",
  programsCoordinatedController.getProgramsByGmail
);

router.put(
  "/api/programs-coordinated/:id",
  upload.single("certificate"),
  programsCoordinatedController.updateProgram
);

router.delete(
  "/api/programs-coordinated/:id",
  programsCoordinatedController.deleteProgram
);


// ====================================================
// 🎓 PROGRAMS ATTENDED ROUTES
// ====================================================
const programsAttendedController = require("./Controller/programsAttendedController");

router.post(
  "/api/programs-attended",
  upload.single("certificate"),
  programsAttendedController.addProgram
);
router.get(
  "/api/programs-attended/get",
  programsAttendedController.getAllProgramsAttendedFormatted
); // ✅ Added for Excel export
router.get(
  "/api/programs-attended/:gmail",
  programsAttendedController.getProgramsByGmail
);
router.put(
  "/api/programs-attended/:id",
  upload.single("certificate"),
  programsAttendedController.updateProgram
);
router.delete(
  "/api/programs-attended/:id",
  programsAttendedController.deleteProgram
);

const seminarsGuidedController = require("./Controller/seminarsGuidedController");

router.post(
  "/api/seminars-guided",
  upload.single("certificate"),
  seminarsGuidedController.addSeminar
);

// ✅ Excel export route (before :Gmail)
router.get(
  "/api/seminars-guided/get",
  seminarsGuidedController.getAllSeminarsGuidedFormatted
);

router.get(
  "/api/seminars-guided/:gmail",
  seminarsGuidedController.getSeminarsByGmail
);

router.put(
  "/api/seminars-guided/:id",
  upload.single("certificate"),
  seminarsGuidedController.updateSeminar
);

router.delete(
  "/api/seminars-guided/:id",
  seminarsGuidedController.deleteSeminar
);

// ====================================================
// 🌍 INTERACTIONS WITH OUTSIDE WORLD ROUTES
// ====================================================
const interactionsController = require("./Controller/interactionsController");

router.post(
  "/api/interactions",
  upload.single("certificate"),
  interactionsController.addInteraction
);
router.get("/api/interactions/:gmail", interactionsController.getByGmail);
router.put(
  "/api/interactions/:id",
  upload.single("certificate"),
  interactionsController.updateInteraction
);
router.delete("/api/interactions/:id", interactionsController.deleteInteraction);

// ====================================================
// 🏛️ POSITIONS HELD / OTHER RESPONSIBILITIES ROUTES
// ====================================================
const positionsController = require("./Controller/positionsController");

router.post("/api/positions", positionsController.addPosition);
router.get("/api/positions/:gmail", positionsController.getPositionsByGmail);
router.put("/api/positions/:id", positionsController.updatePosition);
router.delete("/api/positions/:id", positionsController.deletePosition);

// ====================================================
// 🧠 RESEARCH INTERESTS ROUTES
// ====================================================
const researchInterestController = require("./Controller/researchInterestController");

router.post("/api/research-interests", researchInterestController.addInterest);
router.get("/api/research-interests/:gmail", researchInterestController.getInterestsByGmail);
router.put("/api/research-interests/:id", researchInterestController.updateInterest);
router.delete("/api/research-interests/:id", researchInterestController.deleteInterest);
router.get("/api/reserach/get", researchInterestController.getAllResearchInterests);
// ====================================================
// 💡 PATENT ROUTES
// ====================================================
const patentController = require("./Controller/patentController");

router.post("/api/patents", patentController.addPatent);
router.get("/api/patents/:gmail", patentController.getPatentsByGmail);
router.put("/api/patents/:id", patentController.updatePatent);
router.delete("/api/patents/:id", patentController.deletePatent);


// ====================================================
// 🎓 MOOC COURSE ROUTES
// ====================================================
const moocController = require("./Controller/moocController");

router.post("/api/mooc", moocController.addMooc);
router.get("/api/mooc/:gmail", moocController.getMoocsByGmail);
router.put("/api/mooc/:id", moocController.updateMooc);
router.delete("/api/mooc/:id", moocController.deleteMooc);


// ====================================================
// ✅ EXPORT ROUTER
// ====================================================
/* =================== QUALIFICATION ROUTES ================== */
router.post("/qualification", upload.single("certificate"), qualification.addQualification);
router.get("/qualification/:email", qualification.getQualificationsByEmail);
router.put("/qualification/:id", upload.single("certificate"), qualification.updateQualification);
router.delete("/qualification/:id", qualification.deleteQualification);
router.get("/api/qualification/get", qualification.getAllQualifications);
// exepereienece
router.post("/experience", upload.single("certificate"),experiencecontroller. addExperience);
router.get("/experience/:email",experiencecontroller. getExperiencesByEmail);
router.put("/experience/:id", upload.single("certificate"), experiencecontroller.updateExperience);
router.delete("/experience/:id", experiencecontroller.deleteExperience);
router.get("/api/experience/get", experiencecontroller.getAllExperiences);
// faculty reserarch
router.post("/faculty-research", facultyresearch.addFacultyResearch);
router.get("/faculty-research/:email", facultyresearch.getFacultyResearchByEmail);
router.put("/faculty-research/:id", facultyresearch.updateFacultyResearch);
router.delete("/faculty-research/:id",facultyresearch. deleteFacultyResearch);
router.get("/api/facultyresearch/get", facultyresearch.getAllFacultyResearch);
// consultancy
router.post("/consultancy", consultancyController.addConsultancy);
router.get("/consultancy/:email", consultancyController.getConsultancyByEmail);
router.put("/consultancy/:id", consultancyController.updateConsultancy);
router.delete("/consultancy/:id", consultancyController.deleteConsultancy);
router.get("/api/consultancy/get", consultancyController.getAllConsultancy);

// projectguided
router.post("/add", projectguided.addProjectGuided);
router.get("/view", projectguided.getAllProjectGuided);
router.put("/update/:id", projectguided.updateProjectGuided);
router.delete("/delete/:id", projectguided.deleteProjectGuided);
router.get("/api/projectsguided/get", projectguided.getAllProjectsGuided);


// achievmnet
router.post("/achievements",Achievement. addAchievement);
router.get("/achievements/:gmail",Achievement. getAchievementsByGmail);
router.put("/achievements/:id",Achievement. updateAchievement);
router.delete("/achievements/:id", Achievement.deleteAchievement);
router.get("/api/achievements/get", Achievement.getAllAchievements);
// interest subject

router.post("/addinterestsubject", interestsubject.addSubject);
router.get("/getinterest/:gmail", interestsubject.getSubjectsByGmail);
router.put("/updateinterest/:id", interestsubject.updateSubject);
router.delete("/deleteinterest/:id", interestsubject.deleteSubject);

router.get("/api/interest/get", interestsubject.getAllInterestedSubjects);
// activitylog
router.post("/addactivity", Activitylog.addActivity);
router.get("/getactivities/:gmail", Activitylog.getActivitiesByGmail);
router.put("/updateactivity/:id", Activitylog.updateActivity);
router.delete("/deleteactivity/:id", Activitylog.deleteActivity);
router.get("/api/activity/get", Activitylog.getAllActivityLogs);
// adminstrative work
router.post("/addadminwork", Adminstrativework.addWork);
router.get("/getadminworks/:gmail", Adminstrativework.getWorksByGmail);
router.put("/updateadminwork/:id", Adminstrativework.updateWork);
router.delete("/deleteadminwork/:id", Adminstrativework.deleteWork);
router.get("/api/administrative/get", Adminstrativework.getAllAdministrativeWork);
// profectionalbodymembership
router.post("/addmembership", profectionalbodymembership.addMembership);
router.get("/getmemberships/:gmail", profectionalbodymembership.getMemberships);
router.put("/updatemembership/:id", profectionalbodymembership.updateMembership);
router.delete("/deletemembership/:id", profectionalbodymembership.deleteMembership);
module.exports = router;



module.exports = router;
