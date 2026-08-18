import dns from "node:dns";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { site } from "@/lib/site";

// Some local/dev networks resolve Gmail's IPv6 address first and then can't
// route to it — force IPv4 resolution process-wide before any SMTP connects.
dns.setDefaultResultOrder("ipv4first");

const GMAIL_USER = process.env.GMAIL_USER ?? null;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD ?? null;

// `family` isn't in nodemailer's TS types but is a real, passed-through Node
// net.connect option, kept alongside dns.setDefaultResultOrder as a second guard.
type SmtpOptions = SMTPTransport.Options & { family?: 4 | 6 };

function createGmailTransport(user: string, pass: string) {
  const options: SmtpOptions = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    family: 4,
    auth: { user, pass },
    // Some dev/CI networks sit behind a TLS-inspecting proxy whose CA isn't in
    // Node's trust store; only relax verification outside production.
    tls: { rejectUnauthorized: process.env.NODE_ENV === "production" },
  };
  return nodemailer.createTransport(options);
}

// Cached on globalThis so Next's dev-mode module reloads don't reopen the connection pool repeatedly.
const globalForMailer = globalThis as unknown as {
  __mailer?: ReturnType<typeof createGmailTransport>;
};

function getTransport() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null;
  if (!globalForMailer.__mailer) {
    globalForMailer.__mailer = createGmailTransport(GMAIL_USER, GMAIL_APP_PASSWORD);
  }
  return globalForMailer.__mailer;
}

/**
 * Sends via Gmail SMTP when GMAIL_USER/GMAIL_APP_PASSWORD are set; otherwise
 * falls back to logging the message so local dev never needs real credentials.
 */
export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  const transport = getTransport();
  if (!transport) {
    console.log(`[Email stub] To: ${to}\nSubject: ${subject}\n${body}\n`);
    return;
  }

  await transport.sendMail({
    from: `${site.name} <${GMAIL_USER}>`,
    to,
    subject,
    text: body,
  });
}
