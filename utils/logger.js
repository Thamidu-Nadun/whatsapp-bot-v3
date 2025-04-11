const fs = require('fs');
const path = require('path');
function logger(message) {
    const logPath = path.join(__dirname, '../logs/app.log');
    const logTime = new Date().toISOString();
    const logMessage = `[${logTime}] ${message}\n`;

    fs.appendFile(logPath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

module.exports = {
    logger,

};