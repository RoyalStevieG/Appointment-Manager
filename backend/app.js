const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const appointmentmodel = require("./models/appointment");
const app = express();

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const password = "";
if (password === "") {
  rl.question("Please enter password ", function (input) {
    console.log(`password entered`);
    console.log("Closing the interface");
    rl.close();

    mongoose
      .connect(
        "mongodb+srv://admin:" +
          input +
          "@appointment-manager-clu.tgir7ix.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("Connected to database");
      })
      .catch(() => {
        console.log("Connection Failed");
      });
  });
}

app.use(bodyparser.json());

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

app.post("/api/appointments", (req, res, next) => {
  const appointment = new appointmentmodel({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  console.log(appointment);
  res.status(201).json({
    message: "Appointment added successfully",
  });
});

app.get("/api/appointments", (req, res, next) => {
  // appointments = [
  //   {
  //     id: "sdfghj",
  //     vendor_name: "First server-side Vendor",
  //     appointment_time: new Date(),
  //     client_name: "First server-side Client",
  //     booked: true,
  //   },
  //   {
  //     id: "xcvbnm",
  //     vendor_name: "Second server-side Vendor",
  //     appointment_time: new Date(),
  //     client_name: "Second server-side Client",
  //     booked: false,
  //   },
  //   {
  //     id: "cvbnmk",
  //     vendor_name: "Third server-side Vendor",
  //     appointment_time: new Date(),
  //     client_name: "Third server-side Client",
  //     booked: true,
  //   },
  // ];
  // TODO delete

  appointmentmodel.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Appointments Fetched Successfully",
      // appointments: appointments,
      appointments: documents,
    });
  });
});

module.exports = app;
