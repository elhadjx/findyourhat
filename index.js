const prompt = require('prompt-sync')({
    sigint: true
});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(arr2d) {
        this.field = arr2d;
    }

    print() {
        for (let h = 0; h < this.field.length; h++) {
            let line = this.field[h].join('')
            console.log(line)
        }
    }

    static generateField(height, width, percentage) {
        let generatedFieldArray = [];

        for (let hi = 0; hi < height; hi++) {
            let lineArray = [];
            for (let wi = 0; wi < width; wi++) {
                let chanceOfHole = Math.floor(Math.random() * 100);
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

        //init position
        generatedFieldArray[0][0] = pathCharacter;


        return new Field(generatedFieldArray)
    }
}


const myField = Field.generateField(10, 50, 15)
let positionX = 0
let positionY = 0
let endGame = false;

while (!endGame) {
    console.clear()
    myField.print()
    let direction = prompt('Which way?  ');
    direction = direction.toLowerCase()
    switch (direction) {
        case 'z':
            if (positionY == 0) break;
            positionY--;
            checkHat(positionX, positionY)
            checkHole(positionX, positionY)
            myField.field[positionY][positionX] = pathCharacter;
            break;
        case 'd':
            if (positionX == (myField.field[0].length - 1)) break;
            positionX++;
            checkHat(positionX, positionY)
            checkHole(positionX, positionY)
            myField.field[positionY][positionX] = pathCharacter;
            break;
        case 's':
            if (positionY == (myField.field.length - 1)) break;
            positionY++;
            checkHat(positionX, positionY)
            checkHole(positionX, positionY)
            myField.field[positionY][positionX] = pathCharacter;
            break;
        case 'q':
            if (positionX == 0) break;
            positionX--;
            checkHat(positionX, positionY)
            checkHole(positionX, positionY)
            myField.field[positionY][positionX] = pathCharacter;
            break;
        default:
            break;
    }
}
function checkHole(x, y) {
    const cField = myField.field[y][x]
    if (cField.includes(hole)) {
        endGame = true;
        console.log('Sorry you felt down in a hole!')
    }
}
function checkHat(x, y) {
    const cField = myField.field[y][x];
    if (cField.includes(hat)) {
        endGame = true;
        console.log('Congrats')
    }
}