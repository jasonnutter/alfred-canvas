const alfy = require('alfy');
const url = require('url');

const accessToken = alfy.config.get('ACCESS_TOKEN');
const domain = alfy.config.get('DOMAIN');

if (accessToken && domain) {
    alfy.fetch('https://canvas.instructure.com/api/v1/courses', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        json: true
    })
        .then(json => {
            const courses = json.map(course => ({
                title: course.name,
                subtitle: course.course_code,
                arg: url.format({
                    protocol: 'https',
                    hostname: domain,
                    pathname: `/courses/${course.id}`
                })
            }));
            alfy.output(alfy.inputMatches(courses, 'title'));
        });
} else {
    const errors = [];

    if (!accessToken) {
        errors.push({
            title: 'Access Token required',
            subtitle: 'You must run canvas_token to set your API key'
        });
    }

    if (!domain) {
        errors.push({
            title: 'Domain required',
            subtitle: 'You must run canvas_domain to set your Canvas site domain'
        });
    }

    alfy.output(errors);
}

