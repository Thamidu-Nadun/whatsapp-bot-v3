const { sended } = require("../utils/console-logger");

module.exports = {
    name: 'loop_sth',
    description: 'Loop through something',
    async execute({ msg, args }) {

        if (!args.length) {
            msg.reply("Please provide a number and a message to loop.");
            console.log(sended("Please provide a number and a message to loop.", msg?._data?.to));
            return;
        }
        var arr = args;
        const loopCount = parseInt(arr[0], 10);
        args.shift();

        const loopMessage = args.join(" ");

        for (let i = 0; i < loopCount; i++) {
            await msg.reply(loopMessage);
            console.log(sended(loopMessage, msg?._data?.to));
        }
    },
};