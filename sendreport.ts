const sgMail = require('@sendgrid/mail');

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set this in your GitHub secrets

// Report details from your CI/CD pipeline
const reportDate = process.env.REPORT_DATE || '2025-05-07';
const total = process.env.TOTAL || '50';
const passed = process.env.PASSED || '45';
const failed = process.env.FAILED || '3';
const skipped = process.env.SKIPPED || '2';
const repoOwner = process.env.REPO_OWNER || 'your-org';
const repoName = process.env.REPO_NAME || 'your-repo';

const msg = {
  to: 'jay5.citrusbug@gmail.com',
  from: 'no-reply@bluedropacademy.com',
  subject: `🧪 Playwright Test Report - ${reportDate}`,
  html: `
    <p>Hello Client,</p>

    <p>The automated Playwright test suite has completed.</p>

    <p>📅 <strong>Report Date</strong>: <em>${reportDate}</em></p>

    <p><strong>🔍 Test Summary</strong></p>
    <ul>
      <li>Total Tests: <strong>${total}</strong></li>
      <li>✅ Passed: <strong>${passed}</strong></li>
      <li>❌ Failed: <strong>${failed}</strong></li>
      <li>⏭️ Skipped: <strong>${skipped}</strong></li>
    </ul>

    <p>🔗 <strong>View the full HTML report here</strong>:<br>
    <a href="https://${repoOwner}.github.io/${repoName}/">
      ${repoOwner}.github.io/${repoName}
    </a></p>

    <p>Best regards,<br><strong>QA Team</strong></p>
  `,
};

sgMail
  .send(msg)
  .then(() => {
    console.log('✅ Email sent successfully');
  })
  .catch((error) => {
    console.error('❌ Failed to send email:', error.response?.body || error.message);
    process.exit(1);
  });