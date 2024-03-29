const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./auth').token;
const players = {};
let timeOut;

client.login(token);

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
});

function getRivalId(msg) {
    let rivalId = msg.content.replace('!rps-start', '');

    for (const member of msg.channel.members) {
        if (rivalId.includes(member[1]['user'].id)) {
            return member[1]['user'].id;
        }
    }
}

function sendStartMessageAndContinueGame(channel, rivalId) {
    channel.send(`<@${rivalId}>, please react to this message within one minute to accept the game.`).then(msg => {
        msg.react('✅').then(() => {
            client.on('messageReactionAdd', (msg, user) => {
                const {message, emoji} = msg;

                if (emoji.name === '✅' && message.reactions.cache.toJSON()[0].users.toString().includes(rivalId)) {
                    startGame(channel);
                    clearTimeout(timeOut);
                }
            });
        });

        timeOut = setTimeout(() => {
            stopGame(channel, 'Request timed out -> game stopped');
        }, 60000);
    });
}

function startGame(channel) {
    let answers = [];
    let gameStarted = false;
    channel.send('Are you ready? - Lets go!');

    setTimeout(() => {
        channel.send('rock');

        setTimeout(() => {
            channel.send('paper');

            setTimeout(() => {
                channel.send('scissors');
                gameStarted = true;

                setTimeout(() => {
                    if (answers.length < 2) {
                        channel.send('both of you have to write their items. If you do not remember the rules,'
                            + 'type in ``!rps-rules`` Try again!');

                        setTimeout(() => {
                            answers = [];
                            startGame(channel);
                        }, 3500);
                    } else {
                        evaluateGame(channel, answers);
                    }
                }, 1500);
            }, 1000);
        }, 1000);
    }, 2000);

    client.on('message', (msg) => {
        if (gameStarted && `${players.rival}&${players.author}`.includes(msg.author.id)) {
            answers.push({item: msg.content, id: msg.author.id});
        }
    });
}

function stopGame(channel, message) {
    if (message) {
        channel.send(message);
    }

    clearTimeout(timeOut);
}

function evaluateGame(channel, answers) {
    const possibilities = [
        {item1: 'rock, ro', item2: 'paper, pa', winnerItem: 'paper, pa'},
        {item1: 'paper, pa', item2: 'scissors, sc', winnerItem: 'scissors, sc'},
        {item1: 'rock, ro', item2: 'scissors, sc', winnerItem: 'rock, ro'}
    ];

    if (!answers[0].item.includes(answers[1].item) && !answers[1].item.includes(answers[0].item)) {
        for (let i = 0; i < possibilities.length; i++) {
            if (possibilities[i].item1.includes(answers[0].item) || possibilities[i].item2.includes(answers[0].item)
                && possibilities[i].item1.includes(answers[1].item) || possibilities[i].item2.includes(answers[1].item)) {
                for (let j = 0; j < answers.length; j++) {
                    if (possibilities[i].winnerItem.includes(answers[j].item)) {
                        channel.send(`<@${answers[j].id}> wins`);
                        stopGame(channel, false);
                    }
                }
            }
        }
    } else {
        channel.send(`it's a draw, play again!`);

        setTimeout(() => {
            startGame(channel);
        }, 2000);
    }
}