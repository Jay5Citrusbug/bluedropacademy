const fs = require('fs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Format timestamp
const reportDate = new Date(process.env.REPORT_TIMESTAMP || new Date()).toLocaleString();

// Initialize counters
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let skippedTests = 0;

try {
  // Verify file exists first
  if (!fs.existsSync('playwright-report/report.json')) {
    throw new Error('Report file not found at playwright-report/report.json');
  }

  const rawData = fs.readFileSync('playwright-report/report.json', 'utf8');
  const report = JSON.parse(rawData);

  // Log report structure for debugging
  console.log('Report structure:', Object.keys(report));

  // Parse test results
  if (report.suites && Array.isArray(report.suites)) {
    report.suites.forEach((suite) => {
      if (suite.specs && Array.isArray(suite.specs)) {
        suite.specs.forEach((spec) => {
          if (spec.tests && Array.isArray(spec.tests)) {
            spec.tests.forEach((test) => {
              if (test.results && Array.isArray(test.results)) {
                test.results.forEach((result) => {
                  totalTests++;
                  if (result.status === 'passed') passedTests++;
                  else if (result.status === 'failed') failedTests++;
                  else if (result.status === 'skipped') skippedTests++;
                });
              }
            });
          }
        });
      }
    });
  }

  console.log(`Test counts - Total: ${totalTests}, Passed: ${passedTests}, Failed: ${failedTests}, Skipped: ${skippedTests}`);
} catch (err) {
  console.error('Error processing test report:', err);
  // You might want to set default values or exit here
}

const msg = {
  to: process.env.TO_EMAIL,
  from: process.env.FROM_EMAIL,
  subject: `Daily Automation Test Report - ${reportDate}`,
  text: `Hello Bluedrop Academy,

The automated Playwright test suite has completed.

Date: ${reportDate}
Total: ${totalTests}
Passed: ${passedTests}
Failed: ${failedTests}
Skipped: ${skippedTests}

View the full report: ${process.env.REPORT_URL}

Best regards,
Citrusbug QA Team`,
  html: `<div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
    <div style="text-align: center;">
      <img src="https://i.imgur.com/dYcYQ7E.png" alt="Bluedrop Academy" width="180" style="margin-bottom: 20px;" />
    </div>

    <p>Hello <strong>Bluedrop Academy</strong>,</p>

    <p>The automated <strong>Playwright test suite</strong> for the <strong>Staging environment</strong> has completed.</p>

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

    <div style="margin: 20px 0;">
      <a href="${process.env.REPORT_URL}" target="_blank" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">📄 View Full Report</a>
    </div>

    <p>Best regards,<br/>Citrusbug QA Team</p>
  </div>`
};

sgMail
  .send(msg)
  .then(() => console.log('Email sent successfully'))
  .catch((error) => {
    console.error('Error sending email:', error);
    process.exit(1);
  });