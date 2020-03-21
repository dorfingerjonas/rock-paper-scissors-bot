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
    } else if (msg.content === '!rps-rules' && !msg.author.bot) {
        const message = 'Rock-Paper-Scissors Rules-Page\n'
            + '-------------------------------------\n'
            + 'If you get challenged by a player, you have to react to the game request within a minute, otherwise '
            + ' the request will time out.'
            + 'Afterwards, there will be a countdown (rock, paper, scissors), after the last word you have 1.5s time to'
            + ' submit your item \n\nHow are the items called?\n'
            + 'I have created a "shortcut" for you, to make the game easier. It is possible to submit the whole item'
            + ' name (rock, paper, scissors) or just the first two letters (ro, pa, sc).';

        msg.channel.send(message);
    }
