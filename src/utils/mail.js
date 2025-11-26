import nodemailer from "nodemailer";
import config from "../config/env.config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_FROM,
    pass: config.EMAIL_PASS,
  },
});

const sendMail = async (formData) => {
  const { name, email, phone, subject, message } = formData;

  const mailOptions = {
    from: `"${name}" <${config.EMAIL_FROM}>`,
    to: config.EMAIL_TO,
    cc: config.EMAIL_CC_CONTACT,
    subject: `Contact Form Submission: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f8f8; padding: 20px; text-align: center; }
          .header h1 { margin: 0; color: #2c3e50; font-size: 24px; }
          .content { padding: 20px; background-color: #ffffff; border: 1px solid #e0e0e0; }
          .content h2 { color: #2c3e50; font-size: 20px; }
          .content p { margin: 10px 0; }
          .label { font-weight: bold; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
          .footer a { color: #2c3e50; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
           <p class="intro">The following message was submitted via the contact form on your website:</p>
            <h2>New Message from ${name}</h2>
            <p><span class="label">Name:</span> ${name}</p>
            <p><span class="label">Email:</span> ${email}</p>
            <p><span class="label">Phone:</span> ${phone || "N/A"}</p>
            <p><span class="label">Subject:</span> ${subject}</p>
            <p><span class="label">Message:</span><br>${message}</p>
          </div>
          <div class="footer">
            <p>This is an automated email from your website's contact form. Please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
