# Firefox Phishing Detection Extension

This Firefox extension is designed to detect phishing URLs and emails by making API calls to specified endpoints. It integrates seamlessly with web pages, particularly Gmail and Outlook, to enhance user security.

## Project Structure

```
firefox-extension
├── src
│   ├── background.js
│   ├── content.js
│   ├── popup
│   │   ├── popup.html
│   │   ├── popup.js
│   │   └── popup.css
│   └── utils
│       ├── api.js
│       └── detection.js
├── manifest.json
└── README.md
```

## Features

- **Phishing URL Detection**: The extension checks URLs against a phishing detection API to identify malicious links.
- **Email Phishing Detection**: It analyzes email content from Gmail and Outlook to detect potential phishing attempts.
- **User-Friendly Popup Interface**: A simple popup allows users to interact with the extension and view results.

## Setup Instructions

1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd firefox-extension
   ```

2. **Load the Extension in Firefox**:
   - Open Firefox and navigate to `about:debugging`.
   - Click on "This Firefox" and then "Load Temporary Add-on".
   - Select the `manifest.json` file from the project directory.

3. **API Configuration**:
   - Ensure you have access to the phishing detection APIs.
   - Update the API endpoints in `src/utils/api.js` with your specific URLs.

## Usage Guidelines

- Once the extension is loaded, navigate to Gmail or Outlook.
- The extension will automatically detect email content and check for phishing attempts.
- You can also manually input URLs in the popup for detection.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.