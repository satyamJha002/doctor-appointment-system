import Link from "next/link";
import Doctors from "./doctors/page";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <section className="relative flex flex-col justify-center items-center min-h-[calc(100vh-80px)] text-center px-4 bg-fixed bg-center bg-cover bg-no-repeat bg-[url('https://media.istockphoto.com/id/852404126/photo/stethoscope-head-lying-on-medical-forms-closeup.jpg?s=612x612&w=0&k=20&c=Xf3izwlbXPQNzDWW9koBF7fEAklIRmPhLkm3r2KpMOk=')]">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div>

        <div className="z-10">
          <h1 className="text-2xl text-black md:text-4xl font-bold mb-6">
            Welcome to the Doctor Appointment System
          </h1>
          <Link href="/doctors">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg">
              Book Doctor Now
            </button>
          </Link>
        </div>
      </section>

      <Doctors />
    </div>
  );
}
