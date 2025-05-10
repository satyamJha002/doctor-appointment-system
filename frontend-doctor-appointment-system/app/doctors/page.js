"use client";

import Link from "next/link";
import { useApiStore } from "../../stores/useApiStore";
import { useEffect, useState } from "react";

export default function Doctors() {
  const [listOfDoctors, setListOfDoctors] = useState([]);

  const { doctors, fetchDoctors } = useApiStore();

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    setListOfDoctors(doctors);
  }, [doctors]);

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        List of Doctors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listOfDoctors?.allDoctors?.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white text-black rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{doctor.doctorName}</h2>
            <span className="px-4">{doctor.doctorSpecialization}</span>
            <Link href={`/doctors/doctorDetails/${doctor._id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
