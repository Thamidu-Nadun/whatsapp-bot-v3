# 🤖 WhatsApp Bot v3

![Banner](https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif)

A feature-rich, modular WhatsApp automation bot using Node.js and Puppeteer!  
Developed with ❤️ by [Thamidu Nadun](https://github.com/Thamidu-Nadun)

---

## 📌 Table of Contents

- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
- [🧠 How It Works](#-how-it-works)
- [📂 Project Structure](#-project-structure)
- [🧪 Running Tests](#-running-tests)
- [🛡️ License](#️-license)
- [🤝 Contributing](#-contributing)
- [📞 Contact](#-contact)

---

## ✨ Features

✅ Web automation with Puppeteer  
✅ Easily customizable command handlers  
✅ Logs every incoming message  
✅ Fully modular codebase  
✅ Testable and extendable structure  
✅ Lightweight and blazing fast

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Thamidu-Nadun/whatsapp-bot-v3.git
cd whatsapp-bot-v3
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the bot

```bash
node main.js
```

> [!TIP]
> 💡 Make sure your terminal is wide enough to view the QR code that logs in to your WhatsApp session!

## 🧠 How It

This bot uses Puppeteer to control WhatsApp Web and allows you to define your own custom command logic in the commands/ folder.

When a message is received: It's logged into the logs/ folder.
The bot checks if it matches a known command.
If matched, the associated handler is triggered.
Responses are sent through the Puppeteer-controlled browser.

🖼 Example (QR Authentication):

## 📂 Project Structure

whatsapp-bot-v3/
├── commands/ # All custom command scripts
│ └── example.js # Sample command handler
├── logs/ # Logs of WhatsApp messages
├── test/ # Test scripts for your bot
├── utils/ # Helper utility functions
├── main.js # Main bot script
├── package.json # Project metadata
└── README.md # You are here!

## 🧪 Running Tests

You can test your bot commands and utilities using Node.js built-in tools or add your preferred testing framework:

```bash
node test/example.test.js
🔍 Future updates may include Jest or Mocha support.
```

## 🛡️ License

This project is licensed under the Boost Software License 1.0
See the LICENSE file for more details.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to fork the repo and submit a PR! 💡

> Let’s make automation easier for everyone. 😎

---
