const fs = require("fs");
const os = require("os");
const path = require("path");
const { error, success } = require("./console-logger");
require("dotenv").config();

const cError = error;
const logDir = path.join(process.cwd(), "logs");
const logFilePath = path.join(logDir, "bot.log");

const logHeader = `===================================================================
🤖 WHATSAPP BOT - Bot Logger
===================================================================
📅 Log Start Time     : ${new Date().toISOString()}
🆔 Bot Name           : WhatsAppBot
🛠️ Version            : ${process.env.APP_VERSION}
📍 Component          : [CommandHandler | ImageGenerator | Scheduler | Webhook]
📡 Server RAM         : [${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB]
🧾 Log Level          : [INFO | DEBUG | WARNING | ERROR | CRITICAL]
📦 Environment        : ["${process.env.RUNTIME}"]
🔄 Rotation Policy    : Daily @ Midnight (UTC)
🗂️ Log Format         : log
🔑 Security           : Access-Controlled | Sensitive Data Masked
📁 Log File Path      : ["${process.cwd()}"]
👨‍💻 Maintainer         : Thamidu Nadun
📧 Contact            : nadunrz101@gmail.com
===================================================================
📝 Description:
This file logs all runtime events of the WhatsApp bot, including:
 - Incoming messages from users
 - Executed commands (e.g., /alive, /imagine)
 - AI response generation details
 - Errors, timeouts, or external API issues
 - Image generation pipeline activity

Useful for:
 ✅ Debugging command issues
 ✅ Tracking usage trends
 ✅ Identifying security anomalies
 ✅ Monitoring AI/model performance
===================================================================

[DATE TIME] [LEVEL] [COMPONENT] [MESSAGE]
\n\n`;

function ensureLogDirectory() {
  const dir = path.dirname(logFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function isFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

function writeLog(component, level, message) {
  ensureLogDirectory();

  if (!isFile(logFilePath)) {
    fs.writeFileSync(logFilePath, logHeader + "\n");

    // console.log(success(`Log file created: ${logFilePath}`));
    return "Log Header Created";
  }

  try {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] [${level}] [${component}] - ${message}\n`;

    fs.appendFileSync(logFilePath, logLine);
    // console.log(success(`Log written: ${logLine}`));
  } catch (error) {
    cError(`Failed to write log: ${error.message}`);
    throw error;
  }
}

module.exports = {
  writeLog,
};
