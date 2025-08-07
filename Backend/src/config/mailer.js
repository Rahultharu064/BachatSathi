import mailer from "nodemailer"
  const transporter = mailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure:false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  })


  export const sendMail = async ({to , subject, text , html}) =>{
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      html
    })
  }