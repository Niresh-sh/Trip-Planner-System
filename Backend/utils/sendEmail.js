import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `Travel Booking <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: message,
    });

    console.log("Email sent to:", to);
    return true;

  } catch (err) {
    console.error("Email Error:", err);
    return false;
  }
};
