import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

// Set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Read the report file (you can also attach it if needed)
const reportPath = path.join(__dirname, '../playwright-report/index.html');
const htmlReport = fs.readFileSync(reportPath, 'utf8');

const msg = {
  to: 'recipient@example.com', // ✅ Replace with actual recipient
  from: 'noreply@yourdomain.com', // ✅ Use a verified sender in SendGrid
  subject: '📋 Daily Playwright Test Report',
  html: `
    <h2>✅ Playwright Test Report</h2>
    <p>This is your daily automated test run report.</p>
    <p><strong>Summary:</strong> See attached or below.</p>
    <hr/>
    ${htmlReport}
  `,
};

sgMail
  .send(msg)
  .then(() => {
    console.log('✅ Report email sent successfully');
  })
  .catch((error) => {
    console.error('❌ Failed to send email', error);
  });
