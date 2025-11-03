const express = require("express");
const router = express.Router();
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
module.exports = router;
