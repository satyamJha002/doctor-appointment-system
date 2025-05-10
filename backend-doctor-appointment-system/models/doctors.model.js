const mongoose = require("mongoose");

const doctorsSchema = new mongoose.Schema(
  {
    doctorName: { type: String, required: true },
    doctorSpecialization: { type: String, required: true },
    availableSlots: { type: [Date], required: true },
    doctorDescription: { type: String, required: true },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorsSchema);

module.exports = Doctor;
