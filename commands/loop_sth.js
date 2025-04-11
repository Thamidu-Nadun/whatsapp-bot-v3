module.exports = {
    name: 'loop_sth',
    description: 'Loop through something',
    async execute({ msg, args }) {
        var arr = args;
        const loopCount = parseInt(arr[0], 10);
        args.shift();

        const loopMessage = args.join(" ");

        for (let i = 0; i < loopCount; i++) {
            await msg.reply(loopMessage);
        }
    },
};