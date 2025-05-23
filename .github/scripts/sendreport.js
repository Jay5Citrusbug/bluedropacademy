const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const reportPath = path.resolve(process.env.GITHUB_WORKSPACE || __dirname, 'test-results.json');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let skippedTests = 0;

// Read and parse the JSON report
try {
  if (fs.existsSync(reportPath)) {
    const rawData = fs.readFileSync(reportPath, 'utf8');
    const report = JSON.parse(rawData);

    // Flatten all test results statuses
    const allTests = (report.suites || [])
      .flatMap(suite =>
        (suite.specs || []).flatMap(spec =>
          (spec.tests || []).flatMap(test =>
            (test.results || []).map(result => result.status)
          )
        )
      );

    totalTests = allTests.length;
    passedTests = allTests.filter(s => s === 'passed').length;
    failedTests = allTests.filter(s => s === 'failed').length;
    skippedTests = allTests.filter(s => s === 'skipped').length;
  } else {
    console.error('❌ test-results.json not found.');
  }
} catch (err) {
  console.error('❌ Failed to parse test-results.json:', err);
}

// Use REPORT_TIMESTAMP from env or current date/time
const reportDate = process.env.REPORT_TIMESTAMP || new Date().toLocaleString();
const envName = process.env.GITHUB_REF_NAME || 'Daily';

// Use REPORT_URL from env
const reportUrl = process.env.REPORT_URL || '';

// Compose subject and email body
const subject = `${envName} Automation Test Report - ${reportDate}`;

const msg = {
  to: process.env.TO_EMAIL,
  from: process.env.FROM_EMAIL,
  subject: subject,
  text: `
Hello Bluedrop Academy,

The automated Playwright test suite has completed.

Date: ${reportDate}
Total: ${totalTests}
Passed: ${passedTests}
Failed: ${failedTests}
Skipped: ${skippedTests}

View the full report: ${reportUrl}

Best regards,
Citrusbug QA Team
  `,
  html: `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
    <div style="text-align: center;">
      <img src="https://i.imgur.com/dYcYQ7E.png" alt="Bluedrop Academy" width="180" style="margin-bottom: 20px;" />
    </div>

    <p>Hello <strong>Bluedrop Academy</strong>,</p>

    <p>The automated <strong>Playwright test suite</strong> for the <strong>${envName}</strong> environment has completed.</p>

    <h3>🔍 Test Summary</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr><td style="border: 1px solid #ddd; padding: 8px;">📅 <strong>Date</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${reportDate}</td></tr>
      <tr><td style="border: 1px solid #ddd; padding: 8px;">🔢 <strong>Total Tests</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${totalTests}</td></tr>
      <tr><td style="border: 1px solid #ddd; padding: 8px;">✅ <strong>Passed</strong></td><td style="border: 1px solid #ddd; padding: 8px; color: green;">${passedTests}</td></tr>
      <tr><td style="border: 1px solid #ddd; padding: 8px;">❌ <strong>Failed</strong></td><td style="border: 1px solid #ddd; padding: 8px; color: red;">${failedTests}</td></tr>
      <tr><td style="border: 1px solid #ddd; padding: 8px;">⏭️ <strong>Skipped</strong></td><td style="border: 1px solid #ddd; padding: 8px;">${skippedTests}</td></tr>
    </table>

    <div style="margin: 20px 0;">
      <a href="${reportUrl}" target="_blank" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">📄 View Full Report</a>
    </div>

    <p>Best regards,<br/>Citrusbug QA Team</p>
  </div>
  `
};

sgMail
  .send(msg)
  .then(() => console.log('📧 Email sent successfully'))
  .catch(error => {
    console.error('❌ Error sending email:', error.toString());
    process.exit(1);
  });
