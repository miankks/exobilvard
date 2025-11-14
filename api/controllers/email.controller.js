import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);
const sendEmail = async (req, res) => {
   console.log("🟡 sendEmail called");
  console.log("🟡 body:", req.body);
  try {
    const {name, email, subject, regnumber } = req.body
    console.log("🟡 Preparing to send email...");
    
            const {data, error} = await resend.emails.send({
                    from: 'Exobil <onboarding@resend.dev>',
                    to: email,
                    subject: `Thanks for contacting us, ${name || 'friend'}`,
                    html: `
                        <h2>Hello ${name || ''}!</h2>
                        <p>Thanks for reaching out</p>
                        <p>We received your message:</p>
                        <p>${subject}</p>
                        <blockquote>${regnumber || 'No message provided'}</blockquote>
                        <p>We'll get back to you soon.</p>
                        <p>Exobil</p>
                    `,
            })
            console.log("🟢 SEND RESULT:");
            console.log("data →", data);
            console.log("error →", error);

             if (error) {
                console.error({ error });
                return res.status(400).json({ error: error.message });
  }

  console.log(data);
    return res.status(200).json({ message: "Email sent successfully", data });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
  
}

export {sendEmail}
