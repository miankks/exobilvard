import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);
const sendEmail = async (req, res) => {
  //  console.log("🟡 sendEmail called");
  try {
    const {fullName, email, phone, subject, regnummer, bookDate } = req
    // console.log("🟡 Preparing to send email...");
    
            const {data, error} = await resend.emails.send({
                    from: 'Exobil <onboarding@resend.dev>',
                    to: email,
                    subject: `Thanks for contacting us, ${fullName || 'Kära kund'}`,
                    html: `
                        <h2>Hej ${fullName || ''}!</h2>
                        <p>Tack för att du hörde av dig</p>
                        <p>Vi har tagit emot ditt meddelande:</p>
                        <blockquote>${'Din bilregistreringsnummer är: '+regnummer || 'Inget regnummer tillhandahålls'}</blockquote>
                        <p>Vi återkommer snart till dig på ditt nummer: ${phone}</p>
                        <p> eller på detta mejl ${email}</p>

                        <p>Din första bokning är en: ${bookDate}</p>
                        <p>MVH</p>
                        <p>Exobil</p>
                        `,
                      })
                      // <p>${subject}</p>
                      // console.log("🟢 SEND RESULT:");
                      // console.log("data →", data);
                      // console.log("error →", error);

                     
             if (error) {
                console.error({ error });
                return res.status(400).json({ error: error.message });
  }
    return res.status(200).json({ message: "Email sent successfully", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

export {sendEmail}

 // <p>Thanks for reaching out</p>
                      //  <p>We received your message:</p>
                      //   <blockquote>Your car registration is: ${+regnummer || 'No message provided'}</blockquote>
                      //   <p>We'll get back to you soon on your number: ${phone} or email ${email}</p>
                      //   <p>Your initial booking is one: ${bookDate}</p>
                      //   <p>MVH</p>
                      //   <p>Exobil</p>