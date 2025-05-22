const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Helper function to count tests recursively (handles nested suite structures)
const countTests = (item) => {
  let counts = { total: 0, passed: 0, failed: 0, skipped: 0 };

  if (item.tests) {
    item.tests.forEach(test => {
      test.results?.forEach(result => {
        counts.total++;
        if (result.status === 'passed') counts.passed++;
        else if (result.status === 'failed') counts.failed++;
        else if (result.status === 'skipped') counts.skipped++;
      });
    });
  }

  if (item.suites) {
    item.suites.forEach(suite => {
      const suiteCounts = countTests(suite);
      counts.total += suiteCounts.total;
      counts.passed += suiteCounts.passed;
      counts.failed += suiteCounts.failed;
      counts.skipped += suiteCounts.skipped;
    });
  }

  if (item.specs) {
    item.specs.forEach(spec => {
      const specCounts = countTests(spec);
      counts.total += specCounts.total;
      counts.passed += specCounts.passed;
      counts.failed += specCounts.failed;
      counts.skipped += specCounts.skipped;
    });
  }

  return counts;
};

// Main function to process report
const generateEmailReport = () => {
  // Format timestamp
  const reportDate = new Date(process.env.REPORT_TIMESTAMP || new Date()).toLocaleString();
  const branchName = process.env.GITHUB_REF_NAME || 'main';
  
  // Default values
  let testStats = { total: 0, passed: 0, failed: 0, skipped: 0 };
  let errorMessage = null;

  try {
    // Try multiple possible report locations
    const possiblePaths = [
      'playwright-report/results.json',
      'test-results/results.json',
      'results.json'
    ];

    let reportData;
    for (const reportPath of possiblePaths) {
      try {
        const fullPath = path.join(process.cwd(), reportPath);
        if (fs.existsSync(fullPath)) {
          reportData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          console.log(`Found report at: ${fullPath}`);
          break;
        }
      } catch (err) {
        console.warn(`Error checking ${reportPath}:`, err.message);
      }
    }

    if (!reportData) {
      throw new Error('Could not find test results JSON file in any known location');
    }

    // Count tests using recursive function
    testStats = countTests(reportData);

    // Validation
    if (testStats.total === 0) {
      errorMessage = '⚠️ No tests were executed (total count is zero)';
    }
  } catch (err) {
    errorMessage = `❌ Failed to process test report: ${err.message}`;
    console.error(errorMessage);
  }

  // Prepare email content
  const statusEmoji = testStats.failed > 0 ? '❌' : '✅';
  const subject = `${statusEmoji} Test Report [${branchName}] - ${reportDate}`;

  const msg = {
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    subject,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; text-align: left;">
      <div style="margin-bottom: 20px;">
        <img src="https://i.imgur.com/dYcYQ7E.png" alt="Bluedrop Academy" width="180" />
      </div>

      <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Test Automation Report</h2>
      
      ${errorMessage ? `
        <div style="background-color: #fff4e6; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <strong>${errorMessage}</strong>
        </div>
      ` : ''}

      <div style="margin-bottom: 20px;">
        <p><strong>Environment:</strong> ${branchName.toUpperCase()}</p>
        <p><strong>Execution Time:</strong> ${reportDate}</p>
      </div>

      <h3 style="color: #444; margin-top: 25px;">📊 Test Summary</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Total Tests</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${testStats.total}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>✅ Passed</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right; color: #28a745;">${testStats.passed}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>❌ Failed</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right; color: #dc3545;">${testStats.failed}</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>⏭️ Skipped</strong></td>
          <td style="padding: 8px; text-align: right;">${testStats.skipped}</td>
        </tr>
      </table>

      ${testStats.total > 0 ? `
        <div style="margin-top: 20px;">
          <a href="${process.env.REPORT_URL}" 
             style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            📄 View Detailed Report
          </a>
        </div>
      ` : ''}

      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; color: #666;">
        <p>Best regards,<br>Citrusbug QA Team</p>
        <p style="font-size: 12px; margin-top: 10px;">
          This is an automated message. Please do not reply directly to this email.
        </p>
      </div>
    </div>
    `,
    text: `
    Test Automation Report
    ======================

    Environment: ${branchName.toUpperCase()}
    Execution Time: ${reportDate}

    ${errorMessage ? `ERROR: ${errorMessage}\n\n` : ''}
    Test Summary:
    ------------
    Total Tests: ${testStats.total}
    Passed: ${testStats.passed}
    Failed: ${testStats.failed}
    Skipped: ${testStats.skipped}

    ${testStats.total > 0 ? `View detailed report: ${process.env.REPORT_URL}` : ''}

    Best regards,
    Citrusbug QA Team
    `
  };

  return msg;
};

// Execute and send email
(async () => {
  try {
    const emailContent = generateEmailReport();
    await sgMail.send(emailContent);
    console.log('📧 Email report sent successfully');
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    process.exit(1);
  }
})();