import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  console.error('❌ Invalid or missing SENDGRID_API_KEY.');
  process.exit(1);
}

try {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} catch (e: any) {
  console.error('❌ Failed to set SendGrid API key:', e.message);
  process.exit(1);
}

const environment = process.env.ENVIRONMENT || 'Staging';
const reportDate = process.env.REPORT_DATE || 'Unknown Date';
const passed = process.env.PASSED || '0';
const failed = process.env.FAILED || '0';
const skipped = process.env.SKIPPED || '0';
const total = Number(passed) + Number(failed) + Number(skipped);

const repoOwner = process.env.REPO_OWNER || 'your-org';
const repoName = process.env.REPO_NAME || 'your-repo';

const reportUrl = process.env.REPORT_URL || 
  `https://${repoOwner}.github.io/${repoName}/report-${reportDate.trim()}-${environment.toLowerCase()}/`;

const subject = `${environment} Daily Automation Test Report - ${reportDate}`;

const msg = {
  to: 'jay5.citrusbug@gmail.com',
  from: 'bluedropacademy.aws@gmail.com',
  subject,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <p>Hello Bluedrop Academy,</p>
      <p>The automated Playwright test suite for the <strong>${environment}</strong> environment has completed.</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr><th>Date</th><td>${reportDate}</td></tr>
        <tr><th>Total</th><td>${total}</td></tr>
        <tr><th style="color:green;">Passed</th><td>${passed}</td></tr>
        <tr><th style="color:red;">Failed</th><td>${failed}</td></tr>
        <tr><th style="color:orange;">Skipped</th><td>${skipped}</td></tr>
      </table>

      <p>🔗 <strong>Full Report:</strong><br><a href="${reportUrl}">${reportUrl}</a></p>

      <p>Best regards,<br><strong>Citrusbug QA Team</strong></p>
    </div>
  `,
};

sgMail.send(msg)
  .then(() => console.log('✅ Email sent successfully'))
  .catch((error: any) => {
    console.error('❌ Failed to send email:', error.response?.body || error.message);
    process.exit(1);
  });
