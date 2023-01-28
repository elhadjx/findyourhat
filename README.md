# Find Your Hat
## _The Hat Hunt Challenge._

A simple command-line text-basedgame  built in JavaScript, where the player must navigate a field of holes in order to find their lost hat.

## How to play
 - Run the JavaScript file in a terminal or command line.
 - Use the keys 'z', 'd', 's', and 'q' to move up, right, down, and left, respectively.
 - The field is represented by characters:
     -  `O`: Hole
     - `░`: Empty field
     - `^`: Hidden hat
     - `*`: Player's path
 - The game ends when the player finds the hat or falls in a hole

## Features

- Random Field Generation
- Random Position
- Hard Mode (As last arg of generateField method)

## Field Generation
The field is generated with a 2D array of characters. The field dimensions and the percentage of holes can be adjusted. The game also has a "hard mode" option that increases the number of holes that are added to the field each time the player moves.

## Getting Started
To run the game, you will need to have Node.js and npm (node package manager) installed on your computer.
```sh
git clone https://github.com/elhadjx/findyourhat.git
cd findyourhat
npm i
node index.js
```

## Customizing the Game
You can customize the game by adjusting the parameters passed to the generateField function in the index.js file.
- The first parameter is the height of the field
- The second parameter is the width of the field
- The third parameter is the percentage of holes in the field
- The fourth parameter is an integer value to add holes after each move (hard mode) (0 for easy mode)

## Contributions
Feel free to contribute and submit pull requests to improve the game.


