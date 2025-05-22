const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Generate a more readable timestamp for the email
const reportDate = new Date(process.env.REPORT_TIMESTAMP || new Date()).toLocaleString();

const msg = {
  to: process.env.TO_EMAIL,
  from: process.env.FROM_EMAIL,
  subject: `Playwright Test Results - ${process.env.TEST_STATUS} (${reportDate})`,
  text: `Playwright test run completed with status: ${process.env.TEST_STATUS}
  
Branch: ${process.env.GITHUB_REF_NAME}
Execution Time: ${reportDate}

View the full report: ${process.env.REPORT_URL}

This report is unique to this test run and won't be overwritten by future tests.`,
  html: `
    <h1>Playwright Test Results</h1>
    <p><strong>Status:</strong> ${process.env.TEST_STATUS}</p>
    <p><strong>Branch:</strong> ${process.env.GITHUB_REF_NAME}</p>
    <p><strong>Execution Time:</strong> ${reportDate}</p>
    <p><a href="${process.env.REPORT_URL}" target="_blank">View Full HTML Report</a></p>
    <p><em>Note: This report is permanently saved and won't be overwritten by future test runs.</em></p>
  `,
};

sgMail
  .send(msg)
  .then(() => console.log('Email sent successfully'))
  .catch((error) => {
    console.error('Error sending email:', error);
    process.exit(1);
  });