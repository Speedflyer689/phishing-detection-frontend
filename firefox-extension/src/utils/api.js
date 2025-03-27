export async function detectUrl(url, title) {
    const response = await fetch('http://127.0.0.1:5000/v1/phishing/url/detect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    });
    console.log(response);

    return response.json();
}

export async function detectEmail(emailData) {
    const response = await fetch('http://127.0.0.1:5000/v1/phishing/email/detect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    });
    console.log(response);
    return response.json();
}