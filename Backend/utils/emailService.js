import nodemailer from "nodemailer";

/**
 * Helper to get configured nodemailer transporter or null if unconfigured
 */
const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });
  }

  return null;
};

const getFromAddress = () => {
  return process.env.SMTP_FROM || '"4Pillars Realty" <no-reply@4pillarsrealty.com>';
};

/**
 * Send automated confirmation email for Property Inquiry
 */
export const sendInquiryConfirmationEmail = async ({ name, email, project, phone, message }) => {
  const recipientEmail = email?.trim();
  const recipientName = name?.trim() || "Valued Client";
  const projectName = project?.trim() || "General Property Inquiry";
  const contactPhone = phone?.trim() || "N/A";
  const userMsg = message?.trim() || "N/A";

  if (!recipientEmail) {
    console.warn("[EmailService] No recipient email provided for inquiry confirmation.");
    return { success: false, reason: "Missing recipient email" };
  }

  const subject = `Confirmation: We received your inquiry for ${projectName} - 4Pillars Realty`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; }
          .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 24px; text-align: center; border-bottom: 2px solid #3b82f6; }
          .header h1 { color: #f8fafc; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { color: #fbbf24; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
          .body { padding: 32px 28px; line-height: 1.6; color: #cbd5e1; font-size: 15px; }
          .greeting { font-size: 18px; font-weight: 600; color: #f8fafc; margin-bottom: 16px; }
          .summary-card { background-color: #0f172a; border-radius: 12px; border: 1px solid #334155; padding: 20px; margin: 24px 0; }
          .summary-card h3 { margin-top: 0; color: #60a5fa; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #1e293b; padding-bottom: 8px; }
          .summary-item { margin-bottom: 10px; font-size: 14px; }
          .summary-label { color: #94a3b8; font-weight: 500; display: inline-block; width: 120px; }
          .summary-val { color: #f1f5f9; font-weight: 600; }
          .footer { background-color: #0f172a; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #334155; }
          .highlight { color: #fbbf24; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>4Pillars Realty</h1>
            <p>Elevating Real Estate Experience</p>
          </div>
          <div class="body">
            <div class="greeting">Hello ${recipientName},</div>
            <p>Thank you for reaching out to <strong>4Pillars Realty</strong>! We have successfully received your inquiry regarding <span class="highlight">${projectName}</span>.</p>
            <p>Our dedicated real estate advisor team is reviewing your requirements and will reach out to you shortly with comprehensive project details, floor plans, and pricing options.</p>

            <div class="summary-card">
              <h3>Summary of Your Inquiry</h3>
              <div class="summary-item"><span class="summary-label">Applicant Name:</span> <span class="summary-val">${recipientName}</span></div>
              <div class="summary-item"><span class="summary-label">Email Address:</span> <span class="summary-val">${recipientEmail}</span></div>
              <div class="summary-item"><span class="summary-label">Phone Number:</span> <span class="summary-val">${contactPhone}</span></div>
              <div class="summary-item"><span class="summary-label">Project / Topic:</span> <span class="summary-val">${projectName}</span></div>
              <div class="summary-item"><span class="summary-label">Your Message:</span> <span class="summary-val">${userMsg}</span></div>
            </div>

            <p>If you need urgent assistance, feel free to reply directly to this email or call our hotline at <strong>+1 (800) 4-PILLARS</strong>.</p>
            <p style="margin-top: 24px;">Warm regards,<br><strong>The 4Pillars Realty Client Relations Team</strong></p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} 4Pillars Realty. All rights reserved.<br>
            This is an automated confirmation email sent to ${recipientEmail}.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const transporter = getTransporter();
    if (transporter) {
      const info = await transporter.sendMail({
        from: getFromAddress(),
        to: recipientEmail,
        subject,
        html: htmlContent,
      });
      console.log(`[EmailService] Inquiry confirmation sent via SMTP to ${recipientEmail} (MsgID: ${info.messageId})`);
      return { success: true, method: "SMTP", messageId: info.messageId };
    } else {
      console.log(`[EmailService] Simulated Automated Email Trigger (Inquiry):`);
      console.log(` -> To: ${recipientEmail} (${recipientName})`);
      console.log(` -> Subject: ${subject}`);
      console.log(` -> Status: Sent successfully (Simulated mode - configure SMTP_HOST in .env for live dispatch)`);
      return { success: true, method: "Simulated", recipient: recipientEmail };
    }
  } catch (err) {
    console.error(`[EmailService] Error dispatching inquiry confirmation email to ${recipientEmail}:`, err.message);
    // Don't fail the user request if email sending encounters an error
    return { success: false, error: err.message };
  }
};

/**
 * Send automated confirmation email for Contact Us submissions
 */
export const sendContactConfirmationEmail = async ({ name, email, subject, message, phone }) => {
  const recipientEmail = email?.trim();
  const recipientName = name?.trim() || "Valued Customer";
  const msgSubject = subject?.trim() || "General Inquiry";
  const userMsg = message?.trim() || "N/A";
  const contactPhone = phone?.trim() || "N/A";

  if (!recipientEmail) {
    console.warn("[EmailService] No recipient email provided for contact confirmation.");
    return { success: false, reason: "Missing recipient email" };
  }

  const emailSubject = `We received your message: ${msgSubject} - 4Pillars Realty`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; }
          .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 24px; text-align: center; border-bottom: 2px solid #10b981; }
          .header h1 { color: #f8fafc; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { color: #34d399; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
          .body { padding: 32px 28px; line-height: 1.6; color: #cbd5e1; font-size: 15px; }
          .greeting { font-size: 18px; font-weight: 600; color: #f8fafc; margin-bottom: 16px; }
          .summary-card { background-color: #0f172a; border-radius: 12px; border: 1px solid #334155; padding: 20px; margin: 24px 0; }
          .summary-card h3 { margin-top: 0; color: #34d399; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #1e293b; padding-bottom: 8px; }
          .summary-item { margin-bottom: 10px; font-size: 14px; }
          .summary-label { color: #94a3b8; font-weight: 500; display: inline-block; width: 120px; }
          .summary-val { color: #f1f5f9; font-weight: 600; }
          .footer { background-color: #0f172a; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #334155; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>4Pillars Realty</h1>
            <p>Customer Support & Consultation</p>
          </div>
          <div class="body">
            <div class="greeting">Hello ${recipientName},</div>
            <p>Thank you for contacting <strong>4Pillars Realty</strong>! We have received your message regarding <strong>"${msgSubject}"</strong>.</p>
            <p>Our client support team is reviewing your query and will respond to you within 24 business hours.</p>

            <div class="summary-card">
              <h3>Message Receipt Details</h3>
              <div class="summary-item"><span class="summary-label">Sender Name:</span> <span class="summary-val">${recipientName}</span></div>
              <div class="summary-item"><span class="summary-label">Email Address:</span> <span class="summary-val">${recipientEmail}</span></div>
              ${contactPhone !== "N/A" ? `<div class="summary-item"><span class="summary-label">Phone Number:</span> <span class="summary-val">${contactPhone}</span></div>` : ""}
              <div class="summary-item"><span class="summary-label">Subject:</span> <span class="summary-val">${msgSubject}</span></div>
              <div class="summary-item"><span class="summary-label">Message:</span> <span class="summary-val">${userMsg}</span></div>
            </div>

            <p>We appreciate your interest in 4Pillars Realty and look forward to serving you.</p>
            <p style="margin-top: 24px;">Best regards,<br><strong>4Pillars Realty Customer Care Team</strong></p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} 4Pillars Realty. All rights reserved.<br>
            This automated email confirms receipt of your contact message to ${recipientEmail}.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const transporter = getTransporter();
    if (transporter) {
      const info = await transporter.sendMail({
        from: getFromAddress(),
        to: recipientEmail,
        subject: emailSubject,
        html: htmlContent,
      });
      console.log(`[EmailService] Contact confirmation sent via SMTP to ${recipientEmail} (MsgID: ${info.messageId})`);
      return { success: true, method: "SMTP", messageId: info.messageId };
    } else {
      console.log(`[EmailService] Simulated Automated Email Trigger (Contact Form):`);
      console.log(` -> To: ${recipientEmail} (${recipientName})`);
      console.log(` -> Subject: ${emailSubject}`);
      console.log(` -> Status: Sent successfully (Simulated mode - configure SMTP_HOST in .env for live dispatch)`);
      return { success: true, method: "Simulated", recipient: recipientEmail };
    }
  } catch (err) {
    console.error(`[EmailService] Error dispatching contact confirmation email to ${recipientEmail}:`, err.message);
    return { success: false, error: err.message };
  }
};
