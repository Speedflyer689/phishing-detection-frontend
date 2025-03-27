export function handleUrlDetectionResponse(response) {
    if (response && response.isPhishing) {
        return { isPhishing: true, message: "The URL is suspected to be phishing." };
    }
    return { isPhishing: false, message: "The URL is safe." };
}

export function handleEmailDetectionResponse(response) {
    if (response && response.isPhishing) {
        return { isPhishing: true, message: "The email is suspected to be phishing." };
    }
    return { isPhishing: false, message: "The email is safe." };
}