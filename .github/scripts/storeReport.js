const get_admin_credentials = async (BASE_URL) => {
    const adminCredentials = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
    };

    const response = await fetch(
        BASE_URL + '/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...adminCredentials
            }),
        }
    );

    const response_data = await response.json().then(res => res.data);

    return response_data.token;
};

module.exports.store_automation_report = async (summery_html, report_date, environment) => {
    try {
        BASE_URL = environment == 'staging' ? 'https://stg-api-chat.bluedropacademy.com/api/admin' : 'https://api-chat.bluedropacademy.com/api/admin';

        admin_token = await get_admin_credentials(BASE_URL);

        await fetch(
            BASE_URL + '/create_report',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${admin_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    summery_html: summery_html,
                    report_date: report_date
                }),
            }
        );
    } catch (err) {
        console.log(err);
    }
}