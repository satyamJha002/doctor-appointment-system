const Doctor = require("../models/doctors.model");

const createDoctor = async (req, res) => {
  try {
    const {
      doctorName,
      doctorSpecialization,
      availableSlots,
      doctorDescription,
    } = req.body;

    if (
      !doctorName ||
      !doctorSpecialization ||
      !availableSlots ||
      !doctorDescription
    ) {
      return res.status(400).json({ error: "All are required fields" });
    }

    const existDoctorName = await Doctor.findOne({ doctorName });

    if (existDoctorName) {
      return res
        .status(400)
        .json({ error: "This name of Doctor is already present." });
    }

    const newDoctor = new Doctor({
      doctorName,
      doctorSpecialization,
      availableSlots,
      doctorDescription,
    });

    await newDoctor.save();

    return res
      .status(201)
      .json({ message: "Doctor created Succesfully", newDoctor });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getDoctors = async (req, res) => {
  try {
    const allDoctors = await Doctor.find({});

    if (!allDoctors) {
      return res.status(400).json({ error: "" });
    }

    return res.status(200).json({
      message: "Successfully fetched all doctors details",
      allDoctors,
    });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const doctorDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ error: "Doctor id is required" });
    }

    const getDoctorDetailsById = await Doctor.findById(id);

    if (!getDoctorDetailsById) {
      return res.status(404).json({ error: "Doctor is not found by this id" });
    }

    return res
      .status(200)
      .json({
        message: "Doctor details retrieved successfully",
        getDoctorDetailsById,
      });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateDoctorDetails = async (req, res) => {
  try {
    const {
      doctorName,
      doctorSpecialization,
      availableSlots,
      doctorDescription,
    } = req.body;

    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ error: "Id is required" });
    }

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const updateDoctorData = {};

    if (doctorName) updateDoctorData.doctorName = doctorName;
    if (doctorSpecialization)
      updateDoctorData.doctorSpecialization = doctorSpecialization;
    if (availableSlots) updateDoctorData.availableSlots = availableSlots;
    if (doctorDescription)
      updateDoctorData.doctorDescription = doctorDescription;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        $set: updateDoctorData,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Updated doctors details successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.log("Internal Server error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({ error: "Doctor id is required" });
    }

    const existDoctor = await Doctor.findByIdAndDelete(id);

    if (!existDoctor) {
      return res.status(404).json({ error: "This id of doctor is not found" });
    }

    return res
      .status(200)
      .json({ message: "Doctor details is deleted successfully" });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = {
  createDoctor,
  deleteDoctor,
  getDoctors,
  updateDoctorDetails,
  doctorDetailsById,
};
