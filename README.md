# rock-paper-scissors-bot

Play *rock-paper-scissors* on discord using this bot.

## Invite the bot

https://discordapp.com/oauth2/authorize?&client_id=690868551535427605&scope=bot&permissions=133184

## Usage of the bot

### Commands

- ``!rps-start @[Other Username]`` starts a new game, also tag the player you want to play with
- ``!rps-stop`` stops the current game
- ``!rps-help`` shows some help for the bot and explains the usage
- ``!rps-rules`` shows the [rules](https://github.com/dorfingerjonas/rock-paper-scissors-bot#rules) for the game

## Rules

If you get challenged by a player, you have to react to the game request within a minute, otherwise the request will time out. Afterwards, there will be a countdown (rock, paper, scissors), after the last word you have 1.5 seconds to submit your item.

##### How are the items called?

I have created a "shortcut" for you, to make the game easier. It is possible to submit the whole item name (rock, paper, scissors) or just the first two letters (ro, pa, sc).

## Developers

If you want to run the bot yourself, [create a new Discord Bot](https://discordapp.com/developers/docs/intro#bots-and-apps) and copy the token into a file called `auth.json`. It should look like this:

```json
{
    "token": "[Your Token]"
}
```

<br>

<hr>
<br>
<center>Copyright © 2020, Jonas Dorfinger.</center>
<center>This bot is <a href="https://github.com/dorfingerjonas/rock-paper-scissors-bot/blob/master/LICENSE">MIT licensed</a>
