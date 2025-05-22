const sgMail = require('@sendgrid/mail');
const { readFileSync } = require('fs');
const { join } = require('path');

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

// Email content with improved HTML
const msg = {
  to: process.env.TO_EMAIL,
  from: {
    email: process.env.FROM_EMAIL,
    name: 'Playwright Test Bot'
  },
  subject: `Playwright Tests ${process.env.TEST_STATUS} (${process.env.GITHUB_REF_NAME})`,
  text: `Test Report: ${process.env.REPORT_URL}\nStatus: ${process.env.TEST_STATUS}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #333;">Playwright Test Report</h2>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        <p><strong>Status:</strong> 
          <span style="color: ${process.env.TEST_STATUS === 'PASSED' ? 'green' : 'red'};">
            ${process.env.TEST_STATUS}
          </span>
        </p>
        <p><strong>Branch:</strong> ${process.env.GITHUB_REF_NAME}</p>
        <p>
          <strong>Report URL:</strong> 
          <a href="${process.env.REPORT_URL}" style="color: #0066cc;">
            Click to View Full Report
          </a>
        </p>
      </div>
      <p style="margin-top: 20px; color: #666;">
        Generated at ${new Date().toUTCString()}
      </p>
    </div>
  `
};

// Send email
sgMail.send(msg)
  .then(() => {
    console.log('✅ Email sent successfully');
    console.log(`📬 To: ${process.env.TO_EMAIL}`);
    console.log(`🌐 Report URL: ${process.env.REPORT_URL}`);
  })
  .catch(error => {
    console.error('❌ Email failed to send');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Details:', JSON.stringify(error.response.body, null, 2));
    }
    process.exit(1);
  });