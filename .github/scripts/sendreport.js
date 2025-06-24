const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// The reportDir and jsonReportPath variables are no longer used for counts,
// but might be needed for other purposes if the script were expanded.
// For now, they can remain or be removed if not needed elsewhere.
const reportDir = path.join(process.env.GITHUB_WORKSPACE || process.cwd(), 'playwright-report');
const jsonReportPath = path.join(reportDir, 'report.json'); // This path is no longer used for count extraction

// Format timestamp from env or current date
const reportDate = process.env.REPORT_TIMESTAMP || new Date().toLocaleString();
const envName = process.env.GITHUB_REF_NAME || 'Daily';

// Initialize counts (these will be overridden by environment variables from GitHub Actions)
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let skippedTests = 0;

// --- REMOVE THE ENTIRE TRY...CATCH BLOCK FOR JSON PARSING HERE ---
// The following block should be removed:
/*
try {
  if (fs.existsSync(jsonReportPath)) {
    const rawData = fs.readFileSync(jsonReportPath, 'utf8');
    const report = JSON.parse(rawData);

    const allTests = (report.suites ||)
    .flatMap(suite =>
        (suite.specs ||).flatMap(spec =>
          (spec.tests ||).flatMap(test =>
            (test.results ||).map(result => result.status)
          )
        )
      );

    totalTests = allTests.length;
    passedTests = allTests.filter(status => status === 'passed').length;
    failedTests = allTests.filter(status => status === 'failed').length;
    skippedTests = allTests.filter(status => status === 'skipped').length;
  } else {
    console.error('❌ report.json not found at:', jsonReportPath);
  }
} catch (err) {
  console.error('❌ Failed to parse report.json:', err);
}
*/
// --- END REMOVAL ---

// Override counts from env (GitHub Actions output)
// Ensure all environment variables are correctly parsed as numbers.
// Using || '0' provides a safe default in case an env var is undefined,
// though GitHub Actions should always provide '0' for zero counts.
const totalEnv = process.env.TOTAL;
const passedEnv = process.env.PASSED;
const failedEnv = process.env.FAILED;
const skippedEnv = process.env.SKIPPED;

// Explicitly assign values from environment variables
totalTests = Number(totalEnv || '0');
passedTests = Number(passedEnv || '0');
failedTests = Number(failedEnv || '0');
skippedTests = Number(skippedEnv || '0');

// The console.log statement remains valuable for debugging
console.log(`✅ Final Test Counts - Total: ${totalTests}, Passed: ${passedTests}, Failed: ${failedTests}, Skipped: ${skippedTests}`);

// Environment and report URL
const environment = process.env.ENVIRONMENT || envName;
const repoOwner = process.env.REPO_OWNER || 'your-org';
const repoName = process.env.REPO_NAME || 'your-repo';
const reportUrl = process.env.REPORT_URL || `https://${repoOwner}.github.io/${repoName}/report.html`;

// Email subject
const subject = `${environment} Automation Test Report - ${reportDate}`;

const msg = {
  to: process.env.TO_EMAIL.split(',').map(email => email.trim()),
  from: process.env.FROM_EMAIL,
  subject: subject,
  text: `Hello Bluedrop Academy,

The automated Playwright test suite has completed.

Date: ${reportDate}
Total: ${totalTests}
Passed: ${passedTests}
Failed: ${failedTests}
Skipped: ${skippedTests}

View the full report: ${reportUrl}

Best regards,
Citrusbug QA Team`,
  html: `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
    <div style="text-align: center;">
      <img src="https://postimg.cc/hzLH6djb" alt="Bluedrop Academy" width="180" style="margin-bottom: 20px;" />
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
.catch((error) => {
    console.error('❌ Error sending email:', error.toString());
    process.exit(1);
  });