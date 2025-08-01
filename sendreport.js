const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const store_automation_report = require('./storeReport');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const TO_EMAIL = 'jay5.citrusbug@gmail.com';
const FROM_EMAIL = 'bluedropacademy.aws@gmail.com'; // Ensure this is verified in SendGrid

// Paths to reports
const htmlReportPath = path.resolve(__dirname, '../playwright-report/index.html');
const jsonReportPath = path.resolve(__dirname, '../playwright-report/report.json');

// Check report files exist
if (!fs.existsSync(htmlReportPath) || !fs.existsSync(jsonReportPath)) {
  console.error('❌ One or more report files are missing. Email not sent.');
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlReportPath, 'utf8');

let summaryTable = '';

try {
  const rawJson = fs.readFileSync(jsonReportPath, 'utf8');
  const jsonData = JSON.parse(rawJson);

  const allTests = (jsonData.suites || [])
    .flatMap(suite =>
      (suite.specs || []).flatMap(spec =>
        (spec.tests || []).flatMap(test =>
          (test.results || []).map(r => ({ status: r.status }))
        )
      )
    )
    .filter(Boolean);

  const total = allTests.length;
  const passed = allTests.filter(t => t.status === 'passed').length;
  const failed = allTests.filter(t => t.status === 'failed').length;
  const skipped = allTests.filter(t => t.status === 'skipped').length;

  summaryTable = `
    <h3>🧪 Test Summary</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: sans-serif;">
      <tr style="background-color: #f2f2f2;">
        <th>Total</th>
        <th>Passed</th>
        <th>Failed</th>
        <th>Skipped</th>
      </tr>
      <tr>
        <td>${total}</td>
        <td style="color: green;">${passed}</td>
        <td style="color: red;">${failed}</td>
        <td style="color: gray;">${skipped}</td>
      </tr>
    </table>
    <br />
  `;
} catch (err) {
  console.error('⚠️ Could not generate summary from JSON:', err);
  summaryTable = '<p><strong>⚠️ Could not load summary table</strong></p>';
}

const message = {
  to: TO_EMAIL,
  from: FROM_EMAIL,
  subject: '📋 Daily Playwright Test Report with Summary',
  html: `
    <h2>✅ Playwright Test Report</h2>
    ${summaryTable}
    <hr />
    ${htmlContent}
  `,
};

store_automation_report(summaryTable, new Date());

async function sendEmail() {
  try {
    await sgMail.send(message);
    console.log('✅ Report email sent successfully');
  } catch (error) {
    console.error('❌ Error sending report email:', error.toString());
    if (error.response && error.response.body) {
      console.error('SendGrid response error:', error.response.body);
    }
    process.exit(1);
  }
}

sendEmail();
