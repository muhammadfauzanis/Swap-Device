import nodemailer from 'nodemailer';
import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplate';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

function sendVerificationEmail(userEmail: string, verificationToken: string) {
  const mailOptions = {
    from: `Swap Device Team <${process.env.EMAIL}>`,
    to: userEmail,
    subject: 'Verify your email',
    text: VERIFICATION_EMAIL_TEMPLATE.replace(
      '{verificationCode}',
      verificationToken
    ),
  };

  try {
    transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}

export { sendVerificationEmail };
