import { detectUrl, detectEmail } from './utils/api.js';

browser.runtime.onInstalled.addListener(() => {
    console.log('Phishing Detection Extension Installed');
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'DETECT_URL') {
        console.log('Called on url');
        console.log(request.url);
        detectUrl(request.url)
            .then(response => {
                if (response.status === 'SUCCESS') {
                    sendResponse({ result: response.data });
                    if (!response.data.is_phishing) {
                        browser.notifications.create({
                            type: 'basic',
                            // iconUrl: browser.extension.getURL('icons/icon48.png'),
                            title: 'Phishing Alert',
                            message: 'Warning: The URL is suspected to be phishing!'
                        });
                    }
                } else {
                    sendResponse({ error: response.message });
                }
            })
            .catch(error => {
                sendResponse({ error: error.message });
            });
        return true; // Indicates that the response will be sent asynchronously
    }

    if (request.type === 'DETECT_EMAIL') {
        console.log('Called on emailData');
        console.log(request);
        detectEmail(request.emailData)
            .then(response => {
                if (response.status === 'SUCCESS') {
                    sendResponse({ result: response.data });
                    if (response.data.is_phishing) {
                        browser.notifications.create({
                            type: 'basic',
                            // iconUrl: browser.extension.getURL('icons/icon48.png'),
                            title: 'Phishing Alert',
                            message: 'Warning: The email is suspected to be phishing!'
                        });
                    }
                } else {
                    sendResponse({ error: response.message });
                }
            })
            .catch(error => {
                sendResponse({ error: error.message });
            });
        return true; // Indicates that the response will be sent asynchronously
    }
});