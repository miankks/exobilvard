import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const rejectedOrderEmail = async (order) => {
  try {
    const { fullName, email, phone, regnummer, bookDate } = order.address || {};

    const { data, error } = await resend.emails.send({
      from: "Exobil <onboarding@resend.dev>",
      to: email,
      subject: `Thanks for contacting us, ${fullName || "Kära kund"}`,
      html: `
        <h2>Hej ${fullName || ""}!</h2>
        <p>Tack för att du hörde av dig</p>
        <p>Vi kan tyvärr inte göra på den bestämt datum och tid:</p>
        <blockquote>${
          regnummer
            ? "Din bilregistreringsnummer är: " + regnummer
            : "Inget regnummer tillhandahålls"
        }</blockquote>
        <p>Var vänlig boka en ny tid eller ring oss på 1234567 för mer information</p>
        <p>Din bokning tid och datum var: ${bookDate || ""}</p>
        <p>Komment från Exobil: ${order.comment || ""}</p>
        <p>MVH</p>
        <p>Exobilvårscenter</p>
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
