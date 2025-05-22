import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

// Validate API key
if (!process.env.SENDGRID_API_KEY?.startsWith('SG.')) {
  console.error('❌ Invalid SENDGRID_API_KEY');
  process.exit(1);
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Paths to reports
const htmlReportPath = path.join(process.cwd(), 'playwright-report/report.html');
const jsonReportPath = path.join(process.cwd(), 'playwright-report/results.json');

// Generate summary from JSON
function generateSummary() {
  try {
    const rawData = fs.readFileSync(jsonReportPath, 'utf8');
    const { stats } = JSON.parse(rawData);
    
    return `
      <h3>🧪 Test Summary</h3>
      <table border="1" style="border-collapse: collapse; font-family: sans-serif;">
        <tr style="background-color: #f2f2f2;">
          <th>Total</th>
          <th>Passed</th>
          <th>Failed</th>
          <th>Skipped</th>
        </tr>
        <tr>
          <td>${stats.total}</td>
          <td style="color: green;">${stats.expected}</td>
          <td style="color: red;">${stats.unexpected}</td>
          <td style="color: gray;">${stats.skipped}</td>
        </tr>
      </table>
    `;
  } catch (err) {
    console.error('⚠️ Error generating summary:', err);
    return '<p>⚠️ Could not load test summary</p>';
  }
}

// Compose email
const msg = {
  to: process.env.TO_EMAIL,
  from: process.env.FROM_EMAIL,
  subject: `Playwright Tests ${process.env.TEST_STATUS} - ${process.env.GITHUB_REF_NAME}`,
  html: `
    <h2>📋 Playwright Test Report</h2>
    <p><strong>Status:</strong> ${process.env.TEST_STATUS}</p>
    <p><strong>Branch:</strong> ${process.env.GITHUB_REF_NAME}</p>
    <p><strong>Report URL:</strong> <a href="${process.env.REPORT_URL}">View Online</a></p>
    ${generateSummary()}
    <hr>
    <p>Generated at ${new Date().toUTCString()}</p>
  `
};

// Send email
sgMail.send(msg)
  .then(() => console.log('✅ Email sent successfully'))
  .catch(error => {
    console.error('❌ Email failed:', error.response?.body || error.message);
    process.exit(1);
  });