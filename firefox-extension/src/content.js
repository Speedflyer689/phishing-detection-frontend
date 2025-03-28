// This file contains the content script that runs in the context of web pages. 
// It detects when the user is on Gmail or Outlook and sends the email message data 
// to the background script for phishing detection.

const detectPhishing = (emailData) => {
    console.log("Detecting phishing for email data.");
    browser.runtime.sendMessage({ type: 'DETECT_EMAIL', emailData: emailData }, (response) => {
        if (response.result && response.result.is_phishing) {
            alert('Warning: This email is suspected to be phishing!');
        }
    });
};

let lastEmail = "";
let lastUrl = '';
let lastEmailId = '';

// Monitor URL changes
function checkForUrlChange() {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        if (isGmailEmailView(currentUrl)) {
            setTimeout(processEmail, 1000); // Wait for email content to load
        }
    }
}

function isGmailEmailView(url) {
    return url.includes('mail.google.com') && url.includes('#inbox/') && url !== lastEmailId;
}

function processEmail() {
    const emailBody = document.querySelector('.a3s.aiL');
    const sender = document.querySelector('.gD');
    
    if (emailBody && sender) {
        lastEmailId = window.location.href;
        const emailData = {
            sender: sender.innerText || '',
            emailText: emailBody.innerText || ''
        };
        
        console.log('Sending email data for detection:', emailData);
        browser.runtime.sendMessage({
            type: 'DETECT_EMAIL',
            emailData: emailData
        });
    }
}

// Set up observers
const observer = new MutationObserver(() => {
    checkForUrlChange();
});

// Start monitoring
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Check initially
checkForUrlChange();

// Monitor URL changes
setInterval(checkForUrlChange, 1000);

const checkForEmail = (emailBodyTag, emailSenderTag) => {
    console.log("Checking for email.");
    const emailBody = document.querySelector(emailBodyTag);
    if (emailBody) {
        let text = emailBody.innerText || emailBody.textContent;
        if (text && text !== lastEmail) {
            lastEmail = text;
            const emailData = {
                sender: document.querySelector(emailSenderTag)?.innerText || '',
                emailText: emailBody.innerText,
            };
            detectPhishing(emailData);
        }
    }
};

const checkForGmail = () => {
    const gmailPattern = /https:\/\/mail\.google\.com\/mail\/u\/\d+\/#inbox\/[a-zA-Z0-9]+/;
    if (window.location.href.match(gmailPattern)) {
        checkForEmail('.ii.gt', '.gD');
    }
};

const checkForOutlook = () => {
    if (window.location.hostname.includes('outlook.office.com') || window.location.hostname.includes('outlook.live.com')) {
        checkForEmail('.ii.gt', '.gD');
    }
};

const checkForPhishingURL = () => {
    console.log("Checking for URL.");
    const currentURL = window.location.href;
    console.log(currentURL);
    browser.runtime.sendMessage({ type: 'DETECT_URL', url: currentURL }, (response) => {
        if (response.result && response.result.is_phishing) {
            alert('Warning: This site is known for phishing!');
        }
    });
};

const init = () => {
    checkForGmail();
    checkForOutlook();
    checkForPhishingURL();
};

init();