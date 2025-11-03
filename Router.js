const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const path = require("path");
const multer = require("multer");

// ====================================================
// ⚙️  MULTER CONFIGURATION (for file uploads)
// ====================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// ====================================================
// 🔐 AUTHENTICATION ROUTES
// ====================================================
const logincontroller = require("./Controller/logincontroller");

=======
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
>>>>>>> f5637e4d2c2dff689d9a23c242d1a1bea2bdac2c
router.post("/register", logincontroller.registerUser);
router.post("/login", logincontroller.loginUser);
router.get("/", logincontroller.getAllUsers);
router.post("/forgot-password", logincontroller.forgotPassword);
router.post("/verify-otp", logincontroller.verifyOtp);
router.post("/reset-password", logincontroller.resetPassword);
router.put("/change-password", logincontroller.changePassword);

<<<<<<< HEAD
// ====================================================
// 📋 GENERAL DETAILS ROUTES
// ====================================================
const {
  createGeneralDetails,
  getGeneralDetails,
  getGeneralDetailsById,
  updateGeneralDetails,
} = require("./Controller/generalDetailsController");

router.post("/api/general-details", createGeneralDetails);
router.get("/api/general-details", getGeneralDetails);
router.get("/api/general-details/:id", getGeneralDetailsById);
router.put("/api/general-details/:id", updateGeneralDetails);

// ====================================================
// 📘 SUBJECTS ENGAGED ROUTES
// ====================================================
const subjectEngagedController = require("./Controller/subjectEngagedController");

router.post(
  "/subjects-engaged",
  subjectEngagedController.createOrUpdateSubjects
);
router.get("/subjects-engaged", subjectEngagedController.getSubjectsByUserId);
router.get("/all-subjects-engaged", subjectEngagedController.getAllSubjects);

// ====================================================
// 📰 PUBLICATIONS (PDF / IMAGE UPLOAD)
// ====================================================
const publicationController = require("./Controller/publicationController");

router.post(
  "/api/publications",
  upload.single("document"),
  publicationController.addPublication
);
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
const programsCoordinatedController = require("./Controller/programsCoordinatedController");

router.post(
  "/api/programs-coordinated",
  upload.single("certificate"),
  programsCoordinatedController.addProgram
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

// ====================================================
// 🧑‍🏫 SEMINARS GUIDED ROUTES
// ====================================================
const seminarsGuidedController = require("./Controller/seminarsGuidedController");

router.post(
  "/api/seminars-guided",
  upload.single("certificate"),
  seminarsGuidedController.addSeminar
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
=======
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



>>>>>>> f5637e4d2c2dff689d9a23c242d1a1bea2bdac2c
module.exports = router;
