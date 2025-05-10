const express = require("express");
const {
  createDoctor,
  getDoctors,
  doctorDetailsById,
  updateDoctorDetails,
  deleteDoctor,
} = require("../controllers/doctors.controller");

const router = express.Router();

router.post("/create", createDoctor);
router.get("/", getDoctors);
router.get("/:id", doctorDetailsById);
router.post("/:id", updateDoctorDetails);
router.delete("/:id", deleteDoctor);

module.exports = router;
