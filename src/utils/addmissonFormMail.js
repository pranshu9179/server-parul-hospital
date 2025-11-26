import nodemailer from "nodemailer";
import config from "../config/env.config.js";

const sendMail = async ({
  parentName,
  email,
  phone,
  childName,
  dob,
  program,
  address,
  subject,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL_FROM,
      pass: config.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Admissions - BunnyTots International School" <${config.EMAIL_USER}>`,
    to: config.EMAIL_TO,
    cc: config.EMAIL_CC_ADMISSION, // ✅ Add this line
    subject: subject,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; max-width: 700px; margin: auto; background-color: #f9f9f9; border: 1px solid #e2e2e2; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2c3e50; margin: 0;">🎓 Admission Form Submission</h2>
          <p style="color: #7f8c8d; font-size: 14px;">You have received a new admission form.</p>
        </div>

        <table style="width: 100%; font-size: 15px; color: #2c3e50; border-collapse: collapse;">
          <thead>
            <tr>
              <th colspan="2" style="text-align: left; border-bottom: 1px solid #ccc; padding-bottom: 8px;">👨‍👩‍👧 Parent Details</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 8px 0; width: 160px;">Full Name:</td><td>${parentName}</td></tr>
            <tr><td style="padding: 8px 0;">Email:</td><td>${email}</td></tr>
            <tr><td style="padding: 8px 0;">Phone Number:</td><td>${phone}</td></tr>
          </tbody>

          <thead>
            <tr>
              <th colspan="2" style="text-align: left; border-bottom: 1px solid #ccc; padding: 16px 0 8px;">👶 Child Details</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 8px 0;">Child's Name:</td><td>${childName}</td></tr>
            <tr><td style="padding: 8px 0;">Date of Birth:</td><td>${dob}</td></tr>
            <tr><td style="padding: 8px 0;">Program Interested:  </td><td>${program}</td></tr>
          </tbody>

          <thead>
            <tr>
              <th colspan="2" style="text-align: left; border-bottom: 1px solid #ccc; padding: 16px 0 8px;">🏠 Address</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="2" style="padding: 8px 0;">${address}</td></tr>
          </tbody>
        </table>

        <p style="margin-top: 30px; font-size: 13px; color: #95a5a6; text-align: center;">
          This is an automated email from the admission portal. Please do not reply to this message.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
