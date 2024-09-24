import nodemailer from 'nodemailer';

const sendVerificationEmail = async (email, userId) => {
  const verificationLink = `${process.env.BASE_URL}/api/v1/auth/verify-email/${userId}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Naam Neer Email Verification',
    text: `Please click the link to verify your email: ${verificationLink}`,
    html: `<p>Please click the link to verify your email on our platfor Naam Neer: <a href="${verificationLink}">Verify Email</a></p>`,
  };

  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }).sendMail(mailOptions);
};

export default sendVerificationEmail;
