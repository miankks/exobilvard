import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);
const acceptedOrderEmail = async (order) => {
  // try {
  //   const { fullName, email, phone, regnummer } = order.address || {};
  //   const { data, error } = await resend.emails.send({
  //     from: "Exobil <onboarding@resend.dev>",
  //     to: email,
  //     subject: `Thanks for contacting us, ${fullName || "Kära kund"}`,
  //     html: `
  //                       <h2>Hej ${fullName || ""}!</h2>
  //                       <p>Tack för att du hörde av dig</p>
  //                       <p>Vi bokning har accepterat på den bestämt datum och tid:</p>
  //                       <blockquote>${
  //                         "Din bilregistreringsnummer är: " + regnummer ||
  //                         "Inget regnummer tillhandahålls"
  //                       }</blockquote>
  //                       <p>Din bokning tid och datum är: ${order.orderDate}</p>
  //                       <p>Komment från Exobil: ${order.comment || ""}</p>
  //                       <p>MVH</p>
  //                       <p>Exobil</p>
  //                       `,
  //   });
  //   if (error) {
  //     console.error("Resend error:", error);
  //     return false; // email failed
  //   }
  //   return true; // email sent
  // } catch (err) {
  //   console.error("Email sending error:", err);
  //   return false;
  // }
};

export { acceptedOrderEmail };
