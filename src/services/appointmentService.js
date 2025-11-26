import Appointment from "../models/Appointment.js";
import { sendAppointmentEmail } from "../utils/appointmentMail.js";

export const createAppointmentService = async (appointmentData) => {
  const { phone, date } = appointmentData;

  //   Duplicate check
  //   const existingAppointment = await Appointment.findOne({ phone, date });
  //   if (existingAppointment) {
  //     const error = new Error(
  //       "You already have an appointment booked on this date."
  //     );
  //     error.code = 11000;
  //     throw error;
  //   }

  // Save new appointment
  const newAppointment = new Appointment(appointmentData);
  await newAppointment.save();

  // Email content
  const emailText = `Subject: New Appointment Booked: ${
    newAppointment.name
  } - ${newAppointment.date} at ${newAppointment.time}

Dear Parul Hospital Team,

A new appointment has been successfully booked with the following details:

* Patient Name: ${newAppointment.name}
* Phone: ${newAppointment.phone}
* Date: ${newAppointment.date}
* Time: ${newAppointment.time}
* Doctor: ${newAppointment.doctor}
* Department: ${newAppointment.department}
* Message: ${newAppointment.message || "N/A"}

Please check your appointment management system for full details and any necessary preparations.

Thank you,

Parul Hospital Administration`;

  // Send email to admin
  await sendAppointmentEmail(
    `New Appointment Booked: ${newAppointment.name}`,
    emailText
  );

  return newAppointment;
};
