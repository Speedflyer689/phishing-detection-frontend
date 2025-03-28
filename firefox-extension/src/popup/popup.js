// This file contains the JavaScript logic for the popup. It handles user interactions, such as button clicks, and communicates with the background script to initiate phishing detection.

document.addEventListener('DOMContentLoaded', function() {
    const detectUrlButton = document.getElementById('detect-url');
    const detectEmailButton = document.getElementById('detect-email');
    const urlInput = document.getElementById('url-input');
    const emailInput = document.getElementById('email-input');
    const resultDisplay = document.getElementById('result-display');

    async function sendUrlDetectionRequest(url) {
        return browser.runtime.sendMessage({
            type: 'DETECT_URL',
            url: url
        });
    }

    async function sendEmailDetectionRequest(emailData) {
        return browser.runtime.sendMessage({
            type: 'DETECT_EMAIL',
            emailData: emailData
        });
    }

    detectUrlButton.addEventListener('click', async function() {
        const url = urlInput.value;
        if (url) {
            resultDisplay.textContent = 'Checking URL...';
            try {
                const response = await sendUrlDetectionRequest(url);
                if (response.result) {
                    resultDisplay.textContent = response.result.is_phishing ? 
                        'Warning: This URL is suspected to be phishing!' : 
                        'This URL appears to be safe.';
                } else {
                    resultDisplay.textContent = 'Error: ' + (response.error || 'Unknown error');
                }
            } catch (error) {
                resultDisplay.textContent = 'Error detecting URL: ' + error.message;
            }
        } else {
            resultDisplay.textContent = 'Please enter a URL.';
        }
    });

    detectEmailButton.addEventListener('click', async function() {
        const emailData = emailInput.value;
        if (emailData) {
            resultDisplay.textContent = 'Checking email...';
            try {
                const response = await sendEmailDetectionRequest({
                    emailText: emailData,
                    sender: 'Manual Input'
                });
                if (response.result) {
                    resultDisplay.textContent = response.result.is_phishing ? 
                        'Warning: This email is suspected to be phishing!' : 
                        'This email appears to be safe.';
                } else {
                    resultDisplay.textContent = 'Error: ' + (response.error || 'Unknown error');
                }
            } catch (error) {
                resultDisplay.textContent = 'Error detecting email: ' + error.message;
            }
        } else {
            resultDisplay.textContent = 'Please enter email data.';
        }
    });
});