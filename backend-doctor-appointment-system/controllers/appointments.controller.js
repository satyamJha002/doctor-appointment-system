const { default: mongoose } = require("mongoose");
const Appointment = require("../models/appointments.model");
const Doctor = require("../models/doctors.model");

const createAppointment = async (req, res) => {
  try {
    const { patientName, appointmentDate, doctorId } = req.body;

    if (!patientName || !appointmentDate || !doctorId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ error: "Invalid doctor id format" });
    }

    const newAppointment = new Appointment({
      patientName,
      appointmentDate: new Date(appointmentDate),
      doctorId,
    });

    await newAppointment.save();

    return res.status(201).json({
      message: "Appointment created successfully",
    });
  } catch (error) {
    console.log("Invalid error", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const allAppointments = await Appointment.find({});

    if (!allAppointments) {
      return res.status(404).json({ error: "Appointments not found  " });
    }

    return res
      .status(200)
      .json({ message: "Appointments fetched successfully", allAppointments });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getDoctorWithAppointments = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid doctor ID" });
    }

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const appointments = await Appointment.find;
    ({ doctorId: id }).sort({ appointmentDate: 1 });

    return res.status(200).json({
      doctor: {
        _id: doctor._id,
        doctorName: doctor.doctorName,
        doctorSpecialization: doctor.doctorSpecialization,
        doctorDescription: doctor.doctorDescription,
        availableSlots: doctor.availableSlots,
        appointments: appointments,
      },
    });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getDoctorWithAppointments,
};
