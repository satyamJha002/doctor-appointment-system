const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const doctorRoutes = require("./routes/doctors.route");
const appointmentRoutes = require("./routes/appointments.route");
const connectDb = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api/doctor", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the doctor appointment server");
});

app.listen(5000, () => {
  console.log(`Server is running at port  ${5000}`);
});
