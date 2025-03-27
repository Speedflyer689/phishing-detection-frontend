// This file contains the JavaScript logic for the popup. It handles user interactions, such as button clicks, and communicates with the background script to initiate phishing detection.

document.addEventListener('DOMContentLoaded', function() {
    const detectUrlButton = document.getElementById('detect-url');
    const detectEmailButton = document.getElementById('detect-email');
    const urlInput = document.getElementById('url-input');
    const emailInput = document.getElementById('email-input');
    const resultDisplay = document.getElementById('result-display');

    detectUrlButton.addEventListener('click', function() {
        const url = urlInput.value;
        if (url) {
            browser.runtime.sendMessage({ action: 'detectUrl', url: url })
                .then(response => {
                    resultDisplay.textContent = response.result;
                })
                .catch(error => {
                    resultDisplay.textContent = 'Error detecting URL: ' + error.message;
                });
        } else {
            resultDisplay.textContent = 'Please enter a URL.';
        }
    });

    detectEmailButton.addEventListener('click', function() {
        const emailData = emailInput.value;
        if (emailData) {
            browser.runtime.sendMessage({ action: 'detectEmail', email: emailData })
                .then(response => {
                    resultDisplay.textContent = response.result;
                })
                .catch(error => {
                    resultDisplay.textContent = 'Error detecting email: ' + error.message;
                });
        } else {
            resultDisplay.textContent = 'Please enter email data.';
        }
    });
});