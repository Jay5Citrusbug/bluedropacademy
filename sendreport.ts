const sgMail = require('@sendgrid/mail');

const env = process.env.ENVIRONMENT || 'Staging';
const reportDate = process.env.REPORT_DATE || 'N/A';
const passed = process.env.PASSED || '0';
const failed = process.env.FAILED || '0';
const skipped = process.env.SKIPPED || '0';
const total = Number(passed) + Number(failed) + Number(skipped);

const repoOwner = process.env.REPO_OWNER || 'unknown-owner';
const repoName = process.env.REPO_NAME || 'unknown-repo';
const reportUrl = process.env.REPORT_URL || `https://${repoOwner}.github.io/${repoName}`;

if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  console.error('❌ Invalid or missing SENDGRID_API_KEY.');
  process.exit(1);
}

try {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} catch (e) {
  console.error('❌ Failed to set SendGrid API key:', e.message);
  process.exit(1);
}

const msg = {
 // to: 'noam@bluedropacademy.com',
//  cc: ['jay5.citrusbug@gmail.com', 'jayshree@citrusbug.com'],
  to: 'jay5.citrusbug@gmail.com',
  from: 'bluedropacademy.aws@gmail.com',
  subject: `${env} Daily Automation Test Report - ${reportDate}`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <p>Hello Bluedrop Academy,</p>
      <p>The automated Playwright test suite for the <strong>${env}</strong> environment has completed.</p>

      <table border="1" cellpadding="8" style="border-collapse: collapse;">
        <tr><th>Date</th><td>${reportDate}</td></tr>
        <tr><th>Total</th><td>${total}</td></tr>
        <tr><th style="color: green;">Passed</th><td>${passed}</td></tr>
        <tr><th style="color: red;">Failed</th><td>${failed}</td></tr>
        <tr><th style="color: orange;">Skipped</th><td>${skipped}</td></tr>
      </table>

      <p><strong>🔗 Full Report:</strong> <a href="${reportUrl}">${reportUrl}</a></p>

      <p>Best regards,<br/>Citrusbug QA Team</p>
    </div>
  `,
};

sgMail
  .send(msg)
  .then(() => console.log('✅ Email sent successfully'))
  .catch(error => {
    console.error('❌ Failed to send email:', error.response?.body || error.message);
    process.exit(1);
  });
