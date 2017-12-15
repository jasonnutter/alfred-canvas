const alfy = require('alfy');

const input = alfy.input;
const accessToken = alfy.config.get('ACCESS_TOKEN');

if (accessToken) {
    alfy.fetch(`https://canvas.instructure.com/api/v1/accounts/search?name=${input}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        json: true
    })
        .then(json => {
            const domains = json.map(domain => ({
                title: domain.name,
                subtitle: domain.domain,
                arg: domain.domain
            }));
            alfy.output(domains);
        });
} else {
    alfy.output([
        {
            title: 'Access Token required',
            subtitle: 'You must run canvas_token to set your API key'
        }
    ]);
}
