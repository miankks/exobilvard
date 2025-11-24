import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);
const acceptedOrderEmail = async (order) => {
  try {
    const { fullName, email, phone, regnummer, bookDate, comment } = order.address || {};
            const {data, error} = await resend.emails.send({
                    from: 'Exobil <onboarding@resend.dev>',
                    to: email,
                    subject: `Thanks for contacting us, ${fullName || 'Kära kund'}`,
                    html: `
                        <h2>Hej ${fullName || ''}!</h2>
                        <p>Tack för att du hörde av dig</p>
                        <p>Vi bokning har accepterat på den bestämt datum och tid:</p>
                        <blockquote>${'Din bilregistreringsnummer är: '+regnummer || 'Inget regnummer tillhandahålls'}</blockquote>
                        <p>Var vanlig boka en ny tid eller ring oss på 1234567 för mer information</p>
                        <p>Din bokning tid och datum var: ${bookDate}</p>
                        <p>Komment från Exobil: ${comment || ''}</p>
                        <p>MVH</p>
                        <p>Exobil</p>
                        `,
                      })
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

export {acceptedOrderEmail}
