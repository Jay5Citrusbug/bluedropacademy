const sgMail = require('@sendgrid/mail');
const path = require('path');

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Get report date and environment name
const reportDate = process.env.REPORT_TIMESTAMP || new Date().toLocaleString();
const environment = process.env.ENVIRONMENT || process.env.GITHUB_REF_NAME || 'Unknown';
const reportUrl = process.env.REPORT_URL || 'https://your-org.github.io/your-repo/report.html';

// Get test counts from environment variables
const totalTests = Number(process.env.TOTAL || '0');
const passedTests = Number(process.env.PASSED || '0');
const failedTests = Number(process.env.FAILED || '0');
const skippedTests = Number(process.env.SKIPPED || '0');

// Debug log
console.log(`✅ Final Test Counts - Total: ${totalTests}, Passed: ${passedTests}, Failed: ${failedTests}, Skipped: ${skippedTests}`);

// Email content
const subject = `${environment} Automation Test Report - ${reportDate}`;

const msg = {
  to: process.env.TO_EMAIL,
  from: process.env.FROM_EMAIL,
  subject: subject,
  text: `Hello Bluedrop Academy,

The automated Playwright test suite has completed.

Environment: ${environment}
Date: ${reportDate}

Total Tests: ${totalTests}
Passed: ${passedTests}
Failed: ${failedTests}
Skipped: ${skippedTests}

View the full report: ${reportUrl}

Best regards,
Citrusbug QA Team`,
  html: `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
    <div style="text-align: center;">
      <img src="https://i.imgur.com/dYcYQ7E.png" alt="Bluedrop Academy" width="180" style="margin-bottom: 20px;" />
    </div>

    <p>Hello <strong>Bluedrop Academy</strong>,</p>

    <p>The automated <strong>Playwright test suite</strong> for the <strong>${environment}</strong> environment has completed.</p>

    <h3>🔍 Test Summary</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">📅 <strong>Date</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">${reportDate}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">🔢 <strong>Total Tests</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">${totalTests}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">✅ <strong>Passed</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px; color: green;">${passedTests}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">❌ <strong>Failed</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px; color: red;">${failedTests}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">⏭️ <strong>Skipped</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">${skippedTests}</td>
      </tr>
    </table>

    <div style="margin: 20px 0; text-align: center;">
      <a href="${reportUrl}" target="_blank" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">📄 View Full Report</a>
    </div>

    <p>Best regards,<br/>Citrusbug QA Team</p>
  </div>
  `
};

// Send the email
sgMail
  .send(msg)
  .then(() => {
    console.log('📧 Email sent successfully');
  })
  .catch((error) => {
    console.error('❌ Error sending email:', error.toString());
    process.exit(1);
  });
