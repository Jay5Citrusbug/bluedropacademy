const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');

// Validate API key
if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  console.error('❌ Invalid or missing SENDGRID_API_KEY');
  process.exit(1);
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const TO_EMAIL = process.env.TO_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL;

// Generate email content
const generateEmailContent = () => {
  const reportUrl = process.env.REPORT_URL || 'Report URL not available';
  const environment = process.env.ENVIRONMENT || 'Unknown Environment';
  const reportDate = process.env.REPORT_DATE || new Date().toISOString().split('T')[0];

  return {
    subject: `📋 ${environment} Playwright Test Report - ${reportDate}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center;">
          <img src="https://i.imgur.com/dYcYQ7E.png" alt="Bluedrop Academy" width="180" style="margin-bottom: 20px;" />
        </div>

        <h2 style="color: #2c3e50;">${environment} Test Report - ${reportDate}</h2>

        <h3>🔍 Test Summary</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">🔢 <strong>Total Tests</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${process.env.TOTAL || 'N/A'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">✅ <strong>Passed</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px; color: green;">${process.env.PASSED || 'N/A'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">❌ <strong>Failed</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px; color: red;">${process.env.FAILED || 'N/A'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">⏭️ <strong>Skipped</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${process.env.SKIPPED || 'N/A'}</td>
          </tr>
        </table>

        <div style="margin: 20px 0;">
          <a href="${reportUrl}" target="_blank" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">📄 View Full Report</a>
        </div>

        <p><strong>Tested URLs:</strong></p>
        <ul>
          <li>Admin: ${process.env.URL_ADMIN || 'Not specified'}</li>
          <li>Chatbot: ${process.env.URL_CHATBOT || 'Not specified'}</li>
        </ul>

        <p>Best regards,<br/>Citrusbug QA Team</p>
      </div>
    `,
    text: `
      ${environment} Playwright Test Report - ${reportDate}

      Test Summary:
      - Total: ${process.env.TOTAL || 'N/A'}
      - Passed: ${process.env.PASSED || 'N/A'}
      - Failed: ${process.env.FAILED || 'N/A'}
      - Skipped: ${process.env.SKIPPED || 'N/A'}

      View full report: ${reportUrl}

      Tested URLs:
      - Admin: ${process.env.URL_ADMIN || 'Not specified'}
      - Chatbot: ${process.env.URL_CHATBOT || 'Not specified'}

      Best regards,
      Citrusbug QA Team
    `
  };
};

// Send email
const sendEmail = async () => {
  const content = generateEmailContent();
  const msg = {
    to: TO_EMAIL,
    from: FROM_EMAIL,
    subject: content.subject,
    text: content.text,
    html: content.html
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Email sent successfully');
  } catch (error) {
    console.error('❌ Error sending email:', error);
    if (error.response) {
      console.error('SendGrid response:', error.response.body);
    }
    process.exit(1);
  }
};

sendEmail();