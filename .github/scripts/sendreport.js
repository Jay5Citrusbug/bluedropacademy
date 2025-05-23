const fs = require('fs');
const path = require('path');
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
  // Construct absolute path to report
  const reportPath = path.join(__dirname, '../playwright-report/report.json');
  console.log(`Looking for report at: ${reportPath}`);

  // Verify file exists first
  if (!fs.existsSync(reportPath)) {
    throw new Error(`Report file not found at ${reportPath}`);
  }

  const rawData = fs.readFileSync(reportPath, 'utf8');
  const report = JSON.parse(rawData);

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
  // Set some default values if the report can't be read
  totalTests = "N/A";
  passedTests = "N/A";
  failedTests = "N/A";
  skippedTests = "N/A";
}

// Rest of your email sending code remains the same...