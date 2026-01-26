import { Resend } from "resend";

// Throw clear error if the key is missing
// if (!process.env.RESEND_API_KEY) {
//   throw new Error(
//     "❌ RESEND_API_KEY is not defined. Set it in your .env or Vercel environment variables."
//   );
// }
// const resend = new Resend(process.env.RESEND_API_KEY);
const sendEmail = async (req, res) => {
  try {
    const { fullName, email, phone, regnummer, bookDate } = req;
    const { data, error } = await resend.emails.send({
      from: "Exobil <onboarding@resend.dev>",
      to: email,
      subject: `Thanks for contacting us, ${fullName || "Kära kund"}`,
      html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;padding:30px;font-family:Arial, Helvetica, sans-serif;color:#333333;">
        
        <!-- Header -->
        <tr>
          <td style="text-align:center;padding-bottom:20px;">
            <h1 style="margin:0;color:#111827;">Exobil</h1>
            <p style="margin:5px 0 0;font-size:14px;color:#6b7280;">
              Bekräftelse – meddelande mottaget
            </p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td>
            <h2 style="color:#111827;">Hej ${fullName || "Kära kund"} 👋</h2>
            <p style="font-size:15px;line-height:1.6;">
              Tack för att du hörde av dig. Vi har tagit emot ditt meddelande och återkommer så snart som möjligt.
            </p>
          </td>
        </tr>

        <!-- Info box -->
        <tr>
          <td style="padding:20px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;border-radius:6px;padding:15px;">
              <tr>
                <td style="font-size:14px;padding-bottom:8px;">
                  <strong>Registreringsnummer:</strong><br/>
                  ${regnummer || "Inget regnummer tillhandahålls"}
                </td>
              </tr>

              <tr>
                <td style="font-size:14px;padding-bottom:8px;">
                  <strong>Första bokningsdatum:</strong><br/>
                  ${bookDate}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Contact info -->
        <tr>
          <td>
            <p style="font-size:14px;line-height:1.6;">
              Vi kontaktar dig inom kort via:
            </p>
            <ul style="font-size:14px;padding-left:20px;line-height:1.6;">
              <li>Telefon: <strong>${phone}</strong></li>
              <li>E-post: <strong>${email}</strong></li>
            </ul>

            <p style="margin-top:30px;font-size:14px;">
              Med vänliga hälsningar,<br/>
              <strong>Exobil-teamet</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="text-align:center;padding-top:30px;font-size:12px;color:#9ca3af;">
            © ${new Date().getFullYear()} Exobil. Alla rättigheter förbehållna.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`,
    });
    if (error) {
      console.error({ error });
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json({ message: "Email sent successfully", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export { sendEmail };
