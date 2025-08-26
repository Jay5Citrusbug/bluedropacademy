const fetch = require('node-fetch'); // needed if Node <18

const get_admin_credentials = async (BASE_URL) => {
  const adminCredentials = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };

  const response = await fetch(BASE_URL + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(adminCredentials),
  });

  const json = await response.json();
  return json.data.token;
};

module.exports.store_automation_report = async (summary_html, report_url, report_date, environment) => {
  try {
    const BASE_URL =
      environment === 'staging'
        ? 'https://stg-api-chat.bluedropacademy.com/api/admin'
        : 'https://api-chat.bluedropacademy.com/api/admin';

    const admin_token = await get_admin_credentials(BASE_URL);

    await fetch(BASE_URL + '/create_report', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${admin_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary_html, // consistent naming
        report_url,
        report_date,
      }),
    });

  } catch (err) {
    console.error('❌ Error in store_automation_report:', err);
    throw err;
  }
};
