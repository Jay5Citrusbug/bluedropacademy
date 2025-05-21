import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

// Validate API key
if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  console.error('❌ Invalid or missing SENDGRID_API_KEY.');
  process.exit(1);
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ✅ Email recipients
const TO_EMAIL = 'jay5.citrusbug@gmail.com';
const FROM_EMAIL = 'bluedropacademy.aws@gmail.com';

// ✅ Paths to reports
const htmlReportPath = path.resolve(__dirname, '../playwright-report/index.html');
const jsonReportPath = path.resolve(__dirname, '../playwright-report/report.json');

// ✅ Read HTML content
const htmlContent = fs.readFileSync(htmlReportPath, 'utf8');

// ✅ Read JSON and generate summary
interface TestResult {
  status: string;
}

let summaryTable = '';
try {
  const rawJson = fs.readFileSync(jsonReportPath, 'utf8');
  const jsonData = JSON.parse(rawJson);

  const allTests: TestResult[] = jsonData.suites?.flatMap((suite: any) =>
    suite.specs?.flatMap((spec: any) =>
      spec.tests?.flatMap((test: any) =>
        test.results?.map((r: any) => ({ status: r.status }))
      )
    )
  ).filter(Boolean);

  const total = allTests.length;
  const passed = allTests.filter((t) => t.status === 'passed').length;
  const failed = allTests.filter((t) => t.status === 'failed').length;
  const skipped = allTests.filter((t) => t.status === 'skipped').length;

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
  const message = err instanceof Error ? err.message : String(err);
  console.error('⚠️ Could not generate summary from JSON:', message);
  summaryTable = '<p><strong>⚠️ Could not load summary table</strong></p>';
}

// ✅ Send email with summary + full report
const message = {
  to: TO_EMAIL,
  from: FROM_EMAIL,
  subject: '📋 Daily Playwright Test Report with Summary',
  html: `
    <h2>✅ Playwright Test Report</h2>
    ${summaryTable}
    <hr />
    ${htmlContent}
  `
};

sgMail
  .send(message)
  .then(() => {
    console.log('✅ Report email sent successfully');
  })
  .catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Error sending report email:', message);
  });
