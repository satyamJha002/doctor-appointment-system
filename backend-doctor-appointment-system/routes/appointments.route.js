const express = require("express");
const {
  createAppointment,
  getAllAppointments,
} = require("../controllers/appointments.controller");

const router = express.Router();

router.post("/create", createAppointment);
router.get("/", getAllAppointments);

module.exports = router;
