import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

// Validate environment variables
const requiredEnvVars = [
  'SENDGRID_API_KEY',
  'REPORT_URL',
  'TEST_STATUS',
  'TO_EMAIL',
  'FROM_EMAIL',
  'TOTAL',
  'PASSED',
  'FAILED',
  'SKIPPED'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Validate API key format
if (!process.env.SENDGRID_API_KEY?.startsWith('SG.')) {
  console.error('❌ Invalid SENDGRID_API_KEY format (should start with SG.)');
  process.exit(1);
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Generate test summary table
function generateTestSummary() {
  return `
    <table border="1" style="border-collapse: collapse; font-family: sans-serif; margin: 20px 0;">
      <tr style="background-color: #f2f2f2;">
        <th>Total Tests</th>
        <th>Passed</th>
        <th>Failed</th>
        <th>Skipped</th>
      </tr>
      <tr>
        <td>${process.env.TOTAL}</td>
        <td style="color: green; font-weight: bold;">${process.env.PASSED}</td>
        <td style="color: red; font-weight: bold;">${process.env.FAILED}</td>
        <td style="color: #666;">${process.env.SKIPPED}</td>
      </tr>
    </table>
  `;
}

// Compose email
const msg = {
  to: process.env.TO_EMAIL,
  from: {
    email: process.env.FROM_EMAIL,
    name: 'Playwright Test Bot'
  },
  subject: `🚀 Playwright Tests ${process.env.TEST_STATUS} (${process.env.GITHUB_REF_NAME})`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Playwright Test Report</h2>
      <div style="background-color: ${process.env.TEST_STATUS === 'PASSED' ? '#e6ffed' : '#ffebee'}; padding: 15px; border-radius: 5px;">
        <p><strong>Status:</strong> <span style="color: ${process.env.TEST_STATUS === 'PASSED' ? 'green' : 'red'}; font-weight: bold;">${process.env.TEST_STATUS}</span></p>
        <p><strong>Branch:</strong> ${process.env.GITHUB_REF_NAME}</p>
        <p><strong>Report URL:</strong> <a href="${process.env.REPORT_URL}" style="color: #0366d6;">View Online Report</a></p>
      </div>
      
      ${generateTestSummary()}
      
      <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        Generated at ${new Date().toUTCString()}<br>
        <a href="https://github.com/Jay5Citrusbug/bluedropacademy" style="color: #0366d6;">View Repository</a>
      </p>
    </div>
  `,
  text: `
    Playwright Test Report
    ======================
    Status: ${process.env.TEST_STATUS}
    Branch: ${process.env.GITHUB_REF_NAME}
    Report URL: ${process.env.REPORT_URL}
    
    Test Summary:
    - Total: ${process.env.TOTAL}
    - Passed: ${process.env.PASSED}
    - Failed: ${process.env.FAILED}
    - Skipped: ${process.env.SKIPPED}
    
    Generated at ${new Date().toUTCString()}
  `
};

// Send email with enhanced error handling
sgMail.send(msg)
  .then(() => {
    console.log('✅ Email sent successfully to:', process.env.TO_EMAIL);
    console.log('📧 Subject:', msg.subject);
    console.log('🌐 Report URL:', process.env.REPORT_URL);
  })
  .catch(error => {
    console.error('❌ Failed to send email:');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status Code:', error.response.statusCode);
      console.error('Response Body:', JSON.stringify(error.response.body, null, 2));
    }
    process.exit(1);
  });