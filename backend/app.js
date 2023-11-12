const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/appointments", (req, res, next) => {
  appointments = [
    {
      id: "sdfghj",
      vendor_name: "First server-side Vendor",
      appointment_time: new Date(),
      client_name: "First server-side Client",
      booked: true,
    },
    {
      id: "xcvbnm",
      vendor_name: "Second server-side Vendor",
      appointment_time: new Date(),
      client_name: "Second server-side Client",
      booked: false,
    },
    {
      id: "cvbnmk",
      vendor_name: "Third server-side Vendor",
      appointment_time: new Date(),
      client_name: "Third server-side Client",
      booked: true,
    },
  ];
  res.status(200).json({
    message: "Appointments Fetched Successfully",
    appointments: appointments,
  });
});

module.exports = app;
