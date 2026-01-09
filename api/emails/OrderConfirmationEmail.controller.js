import { Resend } from "resend";

// Throw clear error if the key is missing
// if (!process.env.RESEND_API_KEY) {
//   throw new Error(
//     "❌ RESEND_API_KEY is not defined. Set it in your .env or Vercel environment variables."
//   );
// }
// const resend = new Resend(process.env.RESEND_API_KEY);
const sendEmail = async (req, res) => {
  // try {
  //   const { fullName, email, phone, regnummer, bookDate } = req;
  //   const { data, error } = await resend.emails.send({
  //     from: "Exobil <onboarding@resend.dev>",
  //     to: email,
  //     subject: `Thanks for contacting us, ${fullName || "Kära kund"}`,
  //     html: `
  //                       <h2>Hej ${fullName || ""}!</h2>
  //                       <p>Tack för att du hörde av dig</p>
  //                       <p>Vi har tagit emot ditt meddelande:</p>
  //                       <blockquote>${
  //                         "Din bilregistreringsnummer är: " + regnummer ||
  //                         "Inget regnummer tillhandahålls"
  //                       }</blockquote>
  //                       <p>Vi återkommer snart till dig på ditt nummer: ${phone}</p>
  //                       <p> eller på detta mejl ${email}</p>
  //                       <p>Din första bokning är en: ${bookDate}</p>
  //                       <p>MVH</p>
  //                       <p>Exobil</p>
  //                       `,
  //   });
  //   if (error) {
  //     console.error({ error });
  //     return res.status(400).json({ error: error.message });
  //   }
  //   return res.status(200).json({ message: "Email sent successfully", data });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ error: "Server error" });
  // }
};

export { sendEmail };
