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
    } else if (msg.content === '!rps-help' && !msg.author.bot) {
        const message = 'Rock-Paper-Scissors Help-Page\n'
        + '------------------------------------\n'
        + '- challenge a other player with the command ``!rps-start @USERNAME``\n'
        + '- You are interested in the rules of this game? Just type in ``!rps-help``\n'
        + '- Do you want to stop the game? To achieve this, just type in ``!rps-stop``\n'
        + '- If you have technical issues, please write me an email (jonas.dorfinger@gmx.at)\n'
        + '- You want your own Bot or website? - No problem, visit my website: https://dorfingerjonas.at and use'
        + ' the contact form or write me an email directly.\n';

        msg.channel.send(message);