const sgMail = require('@sendgrid/mail');
const { readFileSync } = require('fs');
const { join } = require('path');

// Validate environment variables
const requiredEnvVars = ['SENDGRID_API_KEY', 'REPORT_URL', 'TO_EMAIL', 'FROM_EMAIL'];
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

// Function to read and parse the JSON report
function getTestResults() {
    try {
        const reportPath = join(process.cwd(), 'playwright-report', 'report.json');
        const reportData = JSON.parse(readFileSync(reportPath, 'utf-8'));
        let total = 0;
        let passed = 0;
        let failed = 0;
        let skipped = 0;

        reportData.suites.forEach(suite => {
            suite.specs.forEach(spec => {
                total++;
                const result = spec.results[0]?.status;
                if (result === 'passed') {
                    passed++;
                } else if (result === 'failed') {
                    failed++;
                } else if (result === 'skipped') {
                    skipped++;
                }
            });
        });

        return { total, passed, failed, skipped };
    } catch (error) {
        console.error('❌ Error reading or parsing the JSON report:', error);
        return { total: 'N/A', passed: 'N/A', failed: 'N/A', skipped: 'N/A' };
    }
}

const testResults = getTestResults();
const currentDate = new Date().toLocaleDateString();
const subject = `Daily Automation Report - ${currentDate}`;

// Email content with enhanced HTML
const msg = {
    to: process.env.TO_EMAIL,
    from: {
        email: process.env.FROM_EMAIL,
        name: 'Playwright Test Bot'
    },
    subject: subject,
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #333;">${subject}</h2>
            <p>Hello,</p>
            <p>This is the daily Playwright automation test report.</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                <h3>Test Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <th style="padding: 8px; text-align: left;">Metric</th>
                        <th style="padding: 8px; text-align: center;">Count</th>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Total Tests</td>
                        <td style="padding: 8px; text-align: center;">${testResults.total}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Passed</td>
                        <td style="padding: 8px; text-align: center; color: green;">${testResults.passed}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Failed</td>
                        <td style="padding: 8px; text-align: center; color: red;">${testResults.failed}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">Skipped</td>
                        <td style="padding: 8px; text-align: center; color: orange;">${testResults.skipped}</td>
                    </tr>
                </table>
                <p style="margin-top: 15px;">
                    <strong>View Full Report:</strong> 
                    <a href="${process.env.REPORT_URL}" style="color: #0066cc;">Click here</a>
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