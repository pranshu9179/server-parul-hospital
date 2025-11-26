import Appointment from "../models/Appointment.js";
import { createAppointmentService } from "../services/appointmentService.js";

// Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const newAppointment = await createAppointmentService(req.body);
    res.status(201).json(newAppointment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You already have an appointment on this date.",
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// Get All Appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Appointment
export const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Appointment
export const deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
