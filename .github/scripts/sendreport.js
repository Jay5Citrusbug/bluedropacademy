const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Format timestamp
const reportDate = new Date(process.env.REPORT_TIMESTAMP || new Date()).toLocaleString();

// Get test counts - first from env vars, then fallback to parsing JSON
let totalTests = parseInt(process.env.TOTAL) || 0;
let passedTests = parseInt(process.env.PASSED) || 0;
let failedTests = parseInt(process.env.FAILED) || 0;
let skippedTests = parseInt(process.env.SKIPPED) || 0;

// Fallback to parse JSON if counts are zero
if (totalTests === 0 && passedTests === 0 && failedTests === 0 && skippedTests === 0) {
  try {
    const reportPath = path.join(process.env.GITHUB_WORKSPACE, 'playwright-report', 'report.json');
    console.log(`Falling back to JSON parsing from: ${reportPath}`);
    
    if (fs.existsSync(reportPath)) {
      const rawData = fs.readFileSync(reportPath, 'utf8');
      const report = JSON.parse(rawData);
      
      // Reset counters
      totalTests = 0;
      passedTests = 0;
      failedTests = 0;
      skippedTests = 0;

      // Parse test results
      report.suites?.forEach((suite) => {
        suite.specs?.forEach((spec) => {
          spec.tests?.forEach((test) => {
            test.results?.forEach((result) => {
              totalTests++;
              if (result.status === 'passed') passedTests++;
              else if (result.status === 'failed') failedTests++;
              else if (result.status === 'skipped') skippedTests++;
            });
          });
        });
      });
    }
  } catch (err) {
    console.error('Error parsing JSON report:', err);
  }
}

console.log(`Final Test Counts - Total: ${totalTests}, Passed: ${passedTests}, Failed: ${failedTests}, Skipped: ${skippedTests}`);

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
  html: `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
    <div style="text-align: center;">
      <img src="https://i.imgur.com/dYcYQ7E.png" alt="Bluedrop Academy" width="180" style="margin-bottom: 20px;" />
    </div>

    <p>Hello <strong>Bluedrop Academy</strong>,</p>

    <p>The automated <strong>Playwright test suite</strong> for the <strong>${process.env.GITHUB_REF_NAME || 'Staging'} environment</strong> has completed.</p>

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
  </div>
  `
};

sgMail
  .send(msg)
  .then(() => console.log('Email sent successfully'))
  .catch((error) => {
    console.error('Error sending email:', error);
    process.exit(1);
  });