// controllers/inquiryController.js

import config from "../config/env.config.js";
import Inquiry from "../models/Inquiry.js";
import nodemailer from "nodemailer";

// ✅ Email setup
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your SMTP provider
  auth: {
    user: config.EMAIL_FROM,
    pass: config.EMAIL_PASS,
  },
});

// ✅ Create Inquiry + Send Email
export const createInquiry = async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    const savedInquiry = await newInquiry.save();

    // Send Email
    const mailOptions = {
      from: config.EMAIL_FROM,
      to: config.EMAIL_TO, // send to user
      subject: "Thank you for contacting us",
      text: `Hi ${savedInquiry.name},\n\nThank you for your inquiry!\n\nMessage: ${savedInquiry.message}\n\nWe will get back to you soon.\n\nRegards,\nYour Company`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Inquiries
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Inquiry
export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Inquiry
// export const updateInquiry = async (req, res) => {
//   try {
//     const updatedInquiry = await Inquiry.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedInquiry) return res.status(404).json({ message: "Not found" });
//     res.json(updatedInquiry);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

//old code 




// new controller for updateInquiry with status update
export const updateInquiry = async (req, res) => {
  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // ✅ ensures status must match enum
      }
    );

    if (!updatedInquiry) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(updatedInquiry); // ✅ returns updated status
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ✅ Delete Inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deletedInquiry) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
