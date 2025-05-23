const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Validate and format test counts
const formatCount = (value) => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

const testData = {
  total: formatCount(process.env.TOTAL),
  passed: formatCount(process.env.PASSED),
  failed: formatCount(process.env.FAILED),
  skipped: formatCount(process.env.SKIPPED)
};

console.log('📊 Final Test Counts:', JSON.stringify(testData, null, 2));

const emailContent = {
  to: process.env.TO_EMAIL,
  from: process.env.FROM_EMAIL,
  subject: `[${process.env.GITHUB_REF_NAME}] Test Report - ${process.env.REPORT_TIMESTAMP}`,
  text: `Playwright Test Report
  ======================
  Environment: ${process.env.GITHUB_REF_NAME}
  Timestamp: ${process.env.REPORT_TIMESTAMP}
  
  Total Tests: ${testData.total}
  ✅ Passed: ${testData.passed}
  ❌ Failed: ${testData.failed}
  ⏭️ Skipped: ${testData.skipped}
  
  Full Report: ${process.env.REPORT_URL}`,
  
  html: `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 20px auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 10px;">
    <div style="text-align: center; margin-bottom: 25px;">
      <img src="https://i.imgur.com/dYcYQ7E.png" alt="Bluedrop Academy" style="height: 50px;">
    </div>

    <h2 style="color: #2c3e50; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; margin-bottom: 20px;">
      🚀 Playwright Test Report
    </h2>

    <div style="margin-bottom: 25px;">
      <p><strong>Environment:</strong> ${process.env.GITHUB_REF_NAME}</p>
      <p><strong>Timestamp:</strong> ${process.env.REPORT_TIMESTAMP}</p>
    </div>

    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
      <h3 style="margin-top: 0; color: #2c3e50;">📊 Test Summary</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">Total Tests</td>
          <td style="padding: 10px; border-bottom: 1px solid #dee2e6; text-align: right;">${testData.total}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #dee2e6; color: #28a745;">✅ Passed</td>
          <td style="padding: 10px; border-bottom: 1px solid #dee2e6; text-align: right; color: #28a745;">${testData.passed}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #dee2e6; color: #dc3545;">❌ Failed</td>
          <td style="padding: 10px; border-bottom: 1px solid #dee2e6; text-align: right; color: #dc3545;">${testData.failed}</td>
        </tr>
        <tr>
          <td style="padding: 10px; color: #6c757d;">⏭️ Skipped</td>
          <td style="padding: 10px; text-align: right; color: #6c757d;">${testData.skipped}</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; margin-top: 25px;">
      <a href="${process.env.REPORT_URL}" 
         style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;"
         target="_blank">
        📄 View Full Report
      </a>
    </div>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1; text-align: center; color: #7f8c8d;">
      <p>Best regards,<br>Citrusbug QA Team</p>
    </div>
  </div>`
};

sgMail.send(emailContent)
  .then(() => console.log('📧 Email sent successfully'))
  .catch(error => {
    console.error('❌ Email failed:', error.response?.body || error.message);
    process.exit(1);
  });