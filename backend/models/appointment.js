const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  vendor_name: { type: String, required: false },
  appointment_time: { type: String, required: false },
  time_string: { type: String, required: false },
  client_id: { type: String, required: false },
  client_name: { type: String, required: false },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
