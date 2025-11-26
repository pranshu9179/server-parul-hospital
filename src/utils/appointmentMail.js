import nodemailer from "nodemailer";
import config from "../config/env.config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.EMAIL_FROM,
    pass: config.EMAIL_PASS,
  },
});

export const sendAppointmentEmail = async (subject, text) => {
  const mailOptions = {
    from: '"Parul Hospital" <${config.EMAIL_FROM}>', // 👈 Clinic name here
    to: config.EMAIL_TO,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Appointment email sent successfully!");
  } catch (error) {
    console.error("Error sending appointment email:", error);
    throw new Error("Failed to send appointment email.");
  }

  // await transporter.sendMail(mailOptions);
};
