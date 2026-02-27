/**
 * This script sends a failure notification to Discord, tagging specific users.
 * It expects environment variables populated by the GitHub Actions workflow.
 */

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
const reportUrl = process.env.REPORT_URL;
const total = process.env.TOTAL;
const passed = process.env.PASSED;
const failed = process.env.FAILED;
const skipped = process.env.SKIPPED;
const environment = process.env.ENVIRONMENT || "Unknown";
const userIds = ["1351873147040694303", "1351865067792105523"];
const mentions = userIds.map(id => `<@${id}>`).join(" ");

if (!webhookUrl) {
    console.error("❌ DISCORD_WEBHOOK_URL is not set.");
    process.exit(1);
}

const payload = {
    content: `${mentions} 🚨 Playwright Tests Failed in ${environment.charAt(0).toUpperCase() + environment.slice(1)} Environment`,
    embeds: [
        {
            title: `🎭 Bluedrop Academy - ${environment.charAt(0).toUpperCase() + environment.slice(1)} Playwright Test Results`,
            description: `**Total:** ${total}\n✅ Passed: ${passed}\n❌ Failed: ${failed}\n⚪ Skipped: ${skipped}`,
            color: 15158332, // Red color for failure
            fields: [
                {
                    name: "📎 View Report",
                    value: reportUrl,
                },
            ],
            footer: {
                text: `GitHub Action - ${process.env.GITHUB_WORKFLOW || "Playwright Tests"}`,
            },
        },
    ],
};

async function sendNotification() {
    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log(`✅ Discord failure notification sent successfully for ${environment}.`);
        } else {
            console.error(`❌ Failed to send Discord notification for ${environment}. Status: ${response.status}`);
            const text = await response.text();
            console.error(`Response: ${text}`);
            process.exit(1);
        }
    } catch (error) {
        console.error(`❌ Error sending Discord notification for ${environment}:`, error);
        process.exit(1);
    }
}

sendNotification();
