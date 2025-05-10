const mongoose = require("mongoose");

const appointmentsSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentsSchema);

module.exports = Appointment;
