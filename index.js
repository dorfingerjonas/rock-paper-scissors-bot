const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./auth').token;

client.on('ready', () => {
    console.log('Bot started...');
});

client.on('message', (msg) => {
    if (msg.content.includes('!rps-start') && !msg.author.bot) {
        if (msg.content.includes('@')) {
            players.rival = getRivalId(msg);
            players.author = msg.author.id;

            msg.channel.send(`Your rival is <@${players.rival}>`).then(() => {
                setTimeout(() => {
                    sendStartMessageAndContinueGame(msg.channel, players.rival);
                }, 500);
            });
        } else {
            msg.channel.send('Please mention your rival, e.g. ``!rps-start @ghopper``');
        }
    } else if (msg.content === '!rps-stop' && !msg.author.bot) {
        if (`${players.rival}&${players.author}`.includes(msg.author.id)) {
            stopGame(msg.channel, `<@${msg.author.id}> stopped the game`);
        }