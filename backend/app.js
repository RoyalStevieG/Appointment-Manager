"use strict";

const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const appointmentmodel = require("./models/appointment");
const usermodel = require("./models/user");
const app = express();

// add password before running server
// to run servers navigate to project folder, ie .../Appointment-Manager/, then run:
// npm run start:server        for node-backend server
// ng serve    for angular-frontend server
var password = ""; // TODO remove password before committing changes

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

// Setup CORS so can allow access
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

// ----------------------- Appointments ----------------------------- //
// post/create new appointments
app.post("/api/appointments", (req, res, next) => {
  const appointment = new appointmentmodel({
    vendor_name: req.body.vendor_name,
    appointment_time: req.body.appointment_time,
    time_string: req.body.time_string,
    client_id: req.body.client_id,
    client_name: req.body.client_name,
  });
  appointment.save().then((result) => {
    if (result) {
      res.status(201).json({
        message: "Appointment added successfully",
      });
    }
  });
});

// get all appointments
app.get("/api/appointments", (req, res, next) => {
  appointmentmodel.find().then((documents) => {
    res.status(200).json({
      message: "Appointments Fetched Successfully",
      appointments: documents,
    });
  });
});

// get Filtered appointments
app.get("/api/appointments/:client_id", (req, res, next) => {
  appointmentmodel
    .find({ client_id: req.params.client_id })
    .then((documents) => {
      res.status(200).json({
        message: "Appointments Fetched Successfully",
        appointments: documents,
      });
    });
});

// delete appointments
app.delete("/api/appointments/:_id", (req, res, next) => {
  appointmentmodel.deleteOne({ _id: req.params._id }).then((result) => {
    if (result["deletedCount"] !== 1 || result["deletedCount"] == 0) {
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

// ----------------------- Users ----------------------------- //
// get all users
app.get("/api/users", (req, res, next) => {
  usermodel.find().then((documents) => {
    res.status(200).json({
      message: "Users Fetched Successfully",
      users: documents,
    });
  });
});

// create new user
app.post("/api/users", (req, res, next) => {
  const user = new usermodel({
    name: req.body.name,
    surname: req.body.surname,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  });
  user.save().then((result) => {
    if (result) {
      res.status(201).json({
        message: "User added successfully",
      });
    }
    console.log(result);
  });
});

//find one user
app.get("/api/users/:email", (req, res, next) => {
  usermodel.find({ email: req.params.email }).then((documents) => {
    res.status(200).json({
      message: "Users Fetched Successfully",
      users: documents,
    });
  });
});

// export to use by appointment- or user-.service.ts
module.exports = app;
