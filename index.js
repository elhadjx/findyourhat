const readline = require('readline');
const tynt = require("tynt");

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

const HAT = '^';
const HOLE = 'O';
const FIELD_CHARACTER = '░';
const CURRENT_PATH_CHARACTER = '*';
const PATH_CHARACTER = '·';

const CONFIG = {
    "height" : 10,
    "width" : 100,
    "percentage" : 0.15,
    "hardMode" : 1
};

class Field {
    constructor(arr2d, hardModeSteps) {
        this.field = arr2d;
        this.positionX = Math.floor(Math.random() * this.field[0].length);
        this.positionY = Math.floor(Math.random() * this.field.length);
        this.field[this.positionY][this.positionX] = CURRENT_PATH_CHARACTER;
        this.hardModeSteps = hardModeSteps;
        this.endGame = false;
    }

    runGame() {
        console.clear();
        myField.print();
        console.log('Press "q" to quit the game');

        // Removed prompt for user input, replaced with keypress for much smoother experience - Jin Hung
        process.stdin.on('keypress', (chunk, key) => {
            switch (key.name) {
                case 'up':
                case 'w':
                    if (this.positionY == 0) break;
                    this.field[this.positionY][this.positionX] = PATH_CHARACTER;
                    this.positionY--;
                    this.checkHat(this.positionX, this.positionY);
                    this.checkHole(this.positionX, this.positionY);
                    this.field[this.positionY][this.positionX] = CURRENT_PATH_CHARACTER;
                    this.addHoles(this.hardModeSteps);
                    break;
                case 'right':
                case 'd':
                    if (this.positionX == (this.field[0].length - 1)) break;
                    this.field[this.positionY][this.positionX] = PATH_CHARACTER;
                    this.positionX++;
                    this.checkHat(this.positionX, this.positionY);
                    this.checkHole(this.positionX, this.positionY);
                    this.field[this.positionY][this.positionX] = CURRENT_PATH_CHARACTER;
                    this.addHoles(this.hardModeSteps);
                    break;
                case 'down':
                case 's':
                    if (this.positionY == (this.field.length - 1)) break;
                    this.field[this.positionY][this.positionX] = PATH_CHARACTER;
                    this.positionY++;
                    this.checkHat(this.positionX, this.positionY);
                    this.checkHole(this.positionX, this.positionY);
                    this.field[this.positionY][this.positionX] = CURRENT_PATH_CHARACTER;
                    this.addHoles(this.hardModeSteps);
                    break;
                case 'left':
                case 'a':
                    if (this.positionX == 0) break;
                    this.field[this.positionY][this.positionX] = PATH_CHARACTER;
                    this.positionX--;
                    this.checkHat(this.positionX, this.positionY);
                    this.checkHole(this.positionX, this.positionY);
                    this.field[this.positionY][this.positionX] = CURRENT_PATH_CHARACTER;
                    this.addHoles(this.hardModeSteps);
                    break;
                default:
                    break;
            }
            if ((key && key.name == 'q') || this.endGame){
                process.exit();
            }
            console.clear();
            myField.print();
            console.log('Press "q" to quit the game');
        });
    }

    addHoles(quantity) {
        for (let index = 0; index < quantity; index++) {
            const addHoleX = Math.floor(Math.random() * this.field[0].length);
            const addHoleY = Math.floor(Math.random() * this.field.length);
            if (this.field[addHoleY][addHoleX].includes(FIELD_CHARACTER)) {
                this.field[addHoleY][addHoleX] = HOLE;
            } else {
                index--;
            }
        }
    }

    checkHole(x, y) {
        const cField = this.field[y][x];
        if (cField.includes(HOLE)) {
            this.endGame = true;
            console.log('Too bad! You felt in a hole.');
        }
    }

    checkHat(x, y) {
        const cField = this.field[y][x];
        if (cField.includes(HAT)) {
            this.endGame = true;
            console.log('Congrats! You found your hat.');
        }
    }

    print() {
        for (let h = 0; h < this.field.length; h++) {
            let line = this.field[h].join('');

            // Colorize the current location pointer and hat - Jin Hung
            if (line.includes(CURRENT_PATH_CHARACTER)){
                line = line.replace(CURRENT_PATH_CHARACTER, tynt.Red(CURRENT_PATH_CHARACTER));
            }
            if (line.includes(HAT)){
                line = line.replace(HAT, tynt.Blue(HAT));
            }
            console.log(line);
        }
    }

    static generateField({height, width, percentage, hardMode}) {
        let generatedFieldArray = [];

        for (let hi = 0; hi < height; hi++) {
            let lineArray = [];
            for (let wi = 0; wi < width; wi++) {
                let chanceOfHole = Math.random();
                if (chanceOfHole <= percentage) {
                    lineArray.push(HOLE);
                } else {
                    lineArray.push(FIELD_CHARACTER);
                }
            }
            generatedFieldArray.push(lineArray);
        }

        //throwing the hat randomly 
        const randomHeight = Math.floor(Math.random() * generatedFieldArray.length);
        const randomWidth = Math.floor(Math.random() * generatedFieldArray[0].length);
        generatedFieldArray[randomHeight][randomWidth] = HAT;

        return new Field(generatedFieldArray, hardMode);
    }
}

const myField = Field.generateField(CONFIG);

myField.runGame()