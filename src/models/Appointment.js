import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  doctor: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

// ✅ Compound Unique Index for phone + date
// appointmentSchema.index({ phone: 1, date: 1 }, { unique: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
