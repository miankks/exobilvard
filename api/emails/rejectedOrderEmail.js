import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const rejectedOrderEmail = async (order) => {
  console.log(order);

  try {
    const { fullName, email, phone, regnummer } = order.address || {};
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
              Uppdatering om din bokning
            </p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td>
            <h2 style="color:#111827;">Hej ${fullName || "Kära kund"} 👋</h2>
            <p style="font-size:15px;line-height:1.6;">
              Tack för att du hörde av dig.
            </p>
            <p style="font-size:15px;line-height:1.6;">
              Tyvärr kan vi inte genomföra bokningen på det önskade datumet och tiden.
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

              ${
                order.acceptedDate
                  ? `<tr>
                      <td style="font-size:14px;padding-bottom:8px;">
                        <strong>Föreslaget nytt datum & tid:</strong><br/>
                        ${order.acceptedDate}
                      </td>
                    </tr>`
                  : ""
              }

              ${
                order.comment
                  ? `<tr>
                      <td style="font-size:14px;">
                        <strong>Kommentar från Exobil:</strong><br/>
                        ${order.comment}
                      </td>
                    </tr>`
                  : ""
              }
            </table>
          </td>
        </tr>

        <!-- Call to action -->
        <tr>
          <td>
            <p style="font-size:14px;line-height:1.6;">
              Vänligen boka en ny tid eller kontakta oss på
              <strong>123 45 67</strong> för mer information.
            </p>

            <p style="margin-top:30px;font-size:14px;">
              Med vänliga hälsningar,<br/>
              <strong>Exobil Vårdscenter</strong>
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
      console.error("Resend error:", error);
      return false; // email failed
    }
    return true; // email sent
  } catch (err) {
    console.error("Email sending error:", err);
    return false;
  }
};

export { rejectedOrderEmail };
