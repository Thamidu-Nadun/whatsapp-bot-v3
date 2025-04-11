const chalk = require('chalk');


module.exports = {
    info: (message) => {
        console.log(chalk.blue(`[INFO] ${message}`));
    },
    success: (message) => {
        return chalk.green(`[SUCCESS] ${message}`);
    },
    error: (message) => {
        console.error(chalk.red(`[ERROR] ${message}`));
    },
    warning: (message) => {
        console.warn(chalk.yellow(`[WARNING] ${message}`));
    },
    sended: (message, to) => {
        return chalk.green(`SENDED: ${message} [TO]--> ${to} `);
    },
    from_to: (from, to) => {
        console.log(chalk.magenta(`[TO] ${from}`) + " " + chalk.magenta(`[TO] ${to}`));
    }
};