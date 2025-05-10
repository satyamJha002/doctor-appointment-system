"use client";

import { useApiStore } from "@/stores/useApiStore";
import { useEffect, useState } from "react";

export default function Appointment() {
  const [appointments, setAppointments] = useState();
  const { appointment, fetchAppointments, loading } = useApiStore();

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    setAppointments(appointment);
  }, [appointment]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Appointments</h1>

      {loading && <p>Loading appointments...</p>}

      {!loading && appointments?.allAppointments?.length === 0 && (
        <p>No appointments found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments?.allAppointments?.map((appt, index) => (
          <div
            key={index}
            className="p-4 border rounded-md shadow-sm bg-white text-black"
          >
            <p>
              <strong>Patient:</strong> {appt.patientName}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(appt.appointmentDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(appt.appointmentDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
