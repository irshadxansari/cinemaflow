import {Resend} from "resend";
import {resendKey} from "../config.ts"

const resend = new Resend(resendKey);

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const response = await resend.emails.send({
      from: "noreply@cinemaflow.app",
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:");
    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Unable to send email. Please try again later.");
  }
}