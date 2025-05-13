const sgMail = require('@sendgrid/mail');

// Validate SendGrid API Key
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

// Report details
const reportDate = process.env.REPORT_DATE || '2025-05-07';
const passed = process.env.PASSED || '45';
const failed = process.env.FAILED || '3';
const skipped = process.env.SKIPPED || '2';
const total = Number(passed) + Number(failed) + Number(skipped);

const repoOwner = process.env.REPO_OWNER || 'your-org';
const repoName = process.env.REPO_NAME || 'your-repo';
const reportUrl = `https://${repoOwner}.github.io/${repoName}`;

const msg = {
  to: 'noam@bluedropacademy.com',
  cc: ['jay5.citrusbug@gmail.com', 'jayshree@citrusbug.com'],
  from: 'bluedropacademy.aws@gmail.com',
  subject: `Daily Automation Test Report - ${reportDate}`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; text-align: left; color: #333;">
      <p>Hello Bluedrop Academy,</p>
      <p>The automated Playwright test suite has completed.</p>

      <p style="margin-top: 10px;"><strong>🔍 Test Summary</strong></p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr style="background-color: #f8f8f8;">
          <th style="width: 35%; text-align: left; padding: 8px; border: 1px solid #ddd;">📅 Date</th>
          <td style="width: 65%; text-align: left; padding: 8px; border: 1px solid #ddd;">${reportDate}</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Total Tests</th>
          <td style="text-align: left; padding: 8px; border: 1px solid #ddd;">${total}</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 8px; border: 1px solid #ddd; color: green;">✅ Passed</th>
          <td style="text-align: left; padding: 8px; border: 1px solid #ddd;">${passed}</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 8px; border: 1px solid #ddd; color: red;">❌ Failed</th>
          <td style="text-align: left; padding: 8px; border: 1px solid #ddd;">${failed}</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 8px; border: 1px solid #ddd; color: orange;">⏭️ Skipped</th>
          <td style="text-align: left; padding: 8px; border: 1px solid #ddd;">${skipped}</td>
        </tr>
      </table>

      <p style="margin-top: 20px;">🔗 <strong>Full Report:</strong><br>
        <a href="${reportUrl}" style="color: #3498db;">${reportUrl}</a>
      </p>

      <p>Best regards,<br><strong>Citrusbug QA Team</strong></p>
    </div>
  `,
};

// Send email
sgMail
  .send(msg)
  .then(() => {
    console.log('✅ Email sent successfully');
  })
  .catch((error) => {
    console.error('❌ Failed to send email:', error.response?.body || error.message);
    process.exit(1);
  });
