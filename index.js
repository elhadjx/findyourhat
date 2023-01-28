const prompt = require('prompt-sync')({
    sigint: true
});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(arr2d, hardModeSteps) {
        this.field = arr2d;
        this.positionX = Math.floor(Math.random() * this.field[0].length)
        this.positionY = Math.floor(Math.random() * this.field.length)
        this.field[this.positionY][this.positionX] = pathCharacter;
        this.hardModeSteps = hardModeSteps;
        this.endGame = false;
    }

    runGame() {
        while (!this.endGame) {
            console.clear()
            myField.print()
            let direction = prompt('Which way?  ');
            direction = direction.toLowerCase()
            switch (direction) {
                case 'z':
                    if (this.positionY == 0) break;
                    this.positionY--;
                    this.checkHat(this.positionX, this.positionY)
                    this.checkHole(this.positionX, this.positionY)
                    this.field[this.positionY][this.positionX] = pathCharacter;
                    this.addHoles(this.hardModeSteps)
                    break;
                case 'd':
                    if (this.positionX == (this.field[0].length - 1)) break;
                    this.positionX++;
                    this.checkHat(this.positionX, this.positionY)
                    this.checkHole(this.positionX, this.positionY)
                    this.field[this.positionY][this.positionX] = pathCharacter;
                    this.addHoles(this.hardModeSteps)
                    break;
                case 's':
                    if (this.positionY == (this.field.length - 1)) break;
                    this.positionY++;
                    this.checkHat(this.positionX, this.positionY)
                    this.checkHole(this.positionX, this.positionY)
                    this.field[this.positionY][this.positionX] = pathCharacter;
                    this.addHoles(this.hardModeSteps)
                    break;
                case 'q':
                    if (this.positionX == 0) break;
                    this.positionX--;
                    this.checkHat(this.positionX, this.positionY)
                    this.checkHole(this.positionX, this.positionY)
                    this.field[this.positionY][this.positionX] = pathCharacter;
                    this.addHoles(this.hardModeSteps)
                    break;
                default:
                    break;
            }
        }
    }

    addHoles(quantity) {
        for (let index = 0; index < quantity; index++) {
            const addHoleX = Math.floor(Math.random() * this.field[0].length)
            const addHoleY = Math.floor(Math.random() * this.field.length)
            if (this.field[addHoleY][addHoleX].includes(fieldCharacter)) {
                this.field[addHoleY][addHoleX] = hole;
            } else {
                index--;
            }
        }
    }

    checkHole(x, y) {
        const cField = this.field[y][x]
        if (cField.includes(hole)) {
            this.endGame = true;
            console.log('Too bad! You felt in a hole.')
        }
    }

    checkHat(x, y) {
        const cField = this.field[y][x];
        if (cField.includes(hat)) {
            this.endGame = true;
            console.log('Congrats! You found your hat.')
        }
    }

    print() {
        for (let h = 0; h < this.field.length; h++) {
            let line = this.field[h].join('')
            console.log(line)
        }
    }

    static generateField(height, width, percentage, hardMode) {
        let generatedFieldArray = [];

        for (let hi = 0; hi < height; hi++) {
            let lineArray = [];
            for (let wi = 0; wi < width; wi++) {
                let chanceOfHole = Math.random();
                if (chanceOfHole <= percentage) {
                    lineArray.push(hole)
                } else {
                    lineArray.push(fieldCharacter)
                }
            }
            generatedFieldArray.push(lineArray)
        }

        //throwing the hat randomly 
        const randomHeight = Math.floor(Math.random() * generatedFieldArray.length)
        const randomWidth = Math.floor(Math.random() * generatedFieldArray[0].length)
        generatedFieldArray[randomHeight][randomWidth] = hat;

        return new Field(generatedFieldArray, hardMode)
    }
}


const myField = Field.generateField(10, 50, 0.15, 1)


myField.runGame()