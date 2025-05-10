"use client";

import { useApiStore } from "@/stores/useApiStore";
import { set } from "mongoose";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DoctorDetailsPage() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form, setForm] = useState({
    patientName: "",
    date: "",
    time: "",
  });

  const { doctorDetailById, singleDoctor, loading, createAppointment } =
    useApiStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      doctorDetailById(id);
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const appointmentDate = new Date(`${form.date} ${form.time}`);

    try {
      await createAppointment({
        patientName: form.patientName,
        appointmentDate: appointmentDate.toISOString(),
        doctorId: id,
      });

      alert("Appointment booked successfully");
      setForm({
        patientName: "",
        date: "",
        time: "",
      });
      setSelectedSlot(null);
    } catch (error) {
      alert("Failed to book appointmment");
      console.error(error);
    }
  };

  const doctor = singleDoctor?.getDoctorDetailsById;

  if (loading || !doctor) {
    return <p className="text-center mt-10">Loading doctor details...</p>;
  }

  return (
    <section className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">{doctor.doctorName}</h1>
      <p className="text-lg text-gray-700 mb-6">
        Specialization:{" "}
        <span className="font-semibold">{doctor.doctorSpecialization}</span>
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Available Time Slots</h2>
        <div className="flex flex-wrap gap-2">
          {doctor.availableSlots?.map((slot, index) => {
            const slotDate = new Date(slot);
            const displayDate = slotDate.toLocaleDateString();
            const displayTime = slotDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedSlot(slot);
                  setForm((prev) => ({
                    ...prev,
                    date: displayDate,
                    time: displayTime,
                  }));
                }}
                className={`px-4 py-2 rounded-md border ${
                  selectedSlot === slot
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-blue-600"
                } transition-all`}
              >
                {`${displayDate}-${displayTime}`}
              </button>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleBooking}
        className="bg-white p-6 rounded-md shadow-md space-y-4 text-black"
      >
        <h2 className="text-xl font-semibold mb-2">Book an Appointment</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Selected Time Slot
          </label>
          <input
            type="text"
            name="time"
            value={form.time}
            readOnly
            className="w-full border rounded-md p-2 bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Confirm Appointment
        </button>
      </form>
    </section>
  );
}
