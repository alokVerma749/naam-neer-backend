import nodemailer from 'nodemailer';

const sendVerificationEmail = async (email, userId) => {
  const verificationLink = `${process.env.BASE_URL}/api/v1/auth/verify-email/${userId}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Naam Neer Email Verification',
    text: `Please click the link to verify your email: ${verificationLink}`,
    html: `
      < div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;" >
      <div style="text-align: center; padding: 20px; background-color: #f7f7f7;">
        <img src="" alt="Naam Neer Logo" style="width: 150px;"/>
      </div>
      <div style="padding: 20px; background-color: #fff;">
        <h1 style="color: #4CAF50; text-align: center;">Verify Your Email</h1>
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">
          Thank you for registering with <strong>Naam Neer</strong>. To complete your registration, we just need to verify your email address. 
          Please click the button below to verify your email and get started on our platform.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" style="background-color: #4CAF50; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 18px;">Verify Email</a>
        </div>
        <p style="font-size: 16px;">
          If the button above doesn't work, copy and paste the following link into your browser:
        </p>
        <p style="word-wrap: break-word;">
          <a href="${verificationLink}" style="color: #4CAF50;">${verificationLink}</a>
        </p>
        <p style="font-size: 16px;">Thank you,<br>The Naam Neer Team</p>
      </div>
      <div style="text-align: center; padding: 20px; background-color: #f7f7f7;">
        <p style="font-size: 12px; color: #777;">
          <em>If you did not request this email, please ignore it.</em>
        </p>
        <img src="https://picsum.photos/seed/picsum/200/300" alt="Naam Neer" style="width: 100%; max-width: 600px;"/>
      </div>
    </div >
  `
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
