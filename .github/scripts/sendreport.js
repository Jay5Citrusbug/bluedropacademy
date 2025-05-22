import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

// Validate environment variables
const requiredEnvVars = ['SENDGRID_API_KEY', 'REPORT_URL', 'TEST_STATUS', 'TO_EMAIL', 'FROM_EMAIL'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Validate API key format
if (!process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  console.error('❌ Invalid SENDGRID_API_KEY format (should start with SG.)');
  process.exit(1);
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Simplified email content
const msg = {
  to: process.env.TO_EMAIL,
  from: process.env.FROM_EMAIL,
  subject: `Playwright Tests ${process.env.TEST_STATUS} (${process.env.GITHUB_REF_NAME})`,
  text: `Playwright Test Report\n\nStatus: ${process.env.TEST_STATUS}\nBranch: ${process.env.GITHUB_REF_NAME}\nReport URL: ${process.env.REPORT_URL}\n\nGenerated at ${new Date().toUTCString()}`,
  html: `
    <h2>Playwright Test Report</h2>
    <p><strong>Status:</strong> ${process.env.TEST_STATUS}</p>
    <p><strong>Branch:</strong> ${process.env.GITHUB_REF_NAME}</p>
    <p><strong>Report URL:</strong> <a href="${process.env.REPORT_URL}">View Online Report</a></p>
    <hr>
    <p>Generated at ${new Date().toUTCString()}</p>
  `
};

// Send email with enhanced error handling
sgMail.send(msg)
  .then(() => {
    console.log('✅ Email sent successfully to:', process.env.TO_EMAIL);
    console.log('📧 Subject:', msg.subject);
  })
  .catch(error => {
    console.error('❌ Failed to send email:');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status Code:', error.response.statusCode);
      console.error('Response Body:', error.response.body);
    }
    process.exit(1);
  });