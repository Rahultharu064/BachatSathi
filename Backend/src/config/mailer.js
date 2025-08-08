import nodemailer from 'nodemailer';

let transporter;

async function createTransporter() {
  // If all required envs are present, use them
  if (
    process.env.MAIL_HOST &&
    process.env.MAIL_PORT &&
    process.env.MAIL_USER &&
    process.env.MAIL_PASSWORD &&
    process.env.MAIL_FROM
  ) {
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  // Dev fallback: Ethereal
  if (process.env.NODE_ENV !== 'production') {
    const testAccount = await nodemailer.createTestAccount();
    console.warn('Mailer env not set. Using Ethereal test account.');
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  throw new Error('Mailer is not configured');
}

// Initialize transporter lazily
async function getTransporter() {
  if (!transporter) {
    transporter = await createTransporter();
  }
  return transporter;
}

export const sendMail = async ({ to, subject, text, html }) => {
  try {
    const tx = await getTransporter();
    const info = await tx.sendMail({
      from: process.env.MAIL_FROM || 'no-reply@example.com',
      to,
      subject,
      text,
      html,
    });
    if (nodemailer.getTestMessageUrl && info) {
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) console.log(`Email preview URL: ${preview}`);
    }
    return info;
  } catch (err) {
    console.error('sendMail error:', err.message);
    throw err;
  }
};