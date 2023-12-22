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
const password = ""; // TODO remove password before committing changes
if (password === "") {
  rl.question("Please enter password ", function (input) {
    password = input;
    console.log(`password entered`);
    console.log("Closing the interface");
    rl.close();
  });
}
mongoose
  .connect(
    "mongodb+srv://admin:" +
      password +
      "@appointment-manager-clu.tgir7ix.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

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
    vendor_name: req.body.vendor_name,
    appointment_time: req.body.appointment_time,
    time_string: req.body.time_string,
    client_name: req.body.client_name,
    booked: req.body.booked,
  });
  // appointment.save().then((result) => {
  //   console.log(result);
  // });
  appointment.save().then((result) => {
    if (result) {
      res.status(201).json({
        message: "Appointment added successfully",
      });
    }
    // console.log(result);
  });
});

app.get("/api/appointments", (req, res, next) => {
  appointmentmodel.find().then((documents) => {
    // console.log(documents); // displays document from database
    res.status(200).json({
      message: "Appointments Fetched Successfully",
      appointments: documents,
    });
    for (let index = 0; index < documents.length; index++) {
      const element = documents[index]._id;
      // console.log(element);
    }
  });
});

app.delete("/api/appointments/:_id", (req, res, next) => {
  appointmentmodel.deleteOne({ id: req.params.id }).then((result) => {
    console.log(result);
    if (result["deletedCount"] !== 1 || result["deletedCount"] == 0) {
      // console.log("Post Not deleted");
      res.status(200).json({
        message: "Something went wrong, Please try again later.",
      });
    } else {
      res.status(201).json({
        message: "Appointment has been canceled.",
      });
    }
  });
});

module.exports = app;
