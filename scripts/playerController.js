//
import {gameObsctacle} from "./gameObstacle.js";
import {AudioManager} from './AudioManager.js';

export class PlayerController {
    //initlialize the dimensions
    constructor(gameWidth, gameHeight, player) {
        console.log(gameWidth, gameHeight);
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameScreen = [];

        //2D array
        this.playerShape = this.stringTo2DCharArr(" / \\\n" +
            " ( )\n" +
            " (   )\n" +
            " /|/ \\|\\\n" +
            " /_|| ||_\\");
        this.stepLength = 9;
        this.playerLoc = {'xcor': this.stepLength * 4, 'ycor': this.gameHeight - 10};
        this.removeSides = 0;
        this.enemies = [];
        this.score = 0;
        this.shield = gameWidth;

        this.isGameOver = false;

        this.audioMan = new AudioManager();
    }

    stringToCharArr(string) {
        return Array.from(string);
    }

    //!!!!!!! check cuz might not work
    stringTo2DCharArr(x) {
        console.log(x);
        return (x.split(/\r?\n/)).map(this.stringToCharArr);
    }


    start() {
        this.gameScreen = new Array(this.gameHeight);
        for (let i = 0; i < this.gameScreen.length; i++) {
            this.gameScreen[i] = new Array(this.gameWidth);
        }
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    drawPlayer() {
        this.drawEntity(this.playerLoc.xcor, this.playerLoc.ycor, this.playerShape);
    }

    drawEnemies() {
        for (let k = 0; k < this.enemies.length; k++) {
            this.drawEntity(this.enemies[k].x, this.enemies[k].y, this.enemies[k].shape);
        }
    }

    drawEntity(x, y, shape) {
        let height = shape.length;
        let heightMid = Math.floor(height / 2);

        for (let i = -heightMid; i < heightMid + height % 2; i++) {
            let width = shape[heightMid + i].length;
            let widthMid = Math.floor(width / 2);
            for (let j = -widthMid; j < widthMid + width % 2; j++) {
                if (shape[heightMid + i][widthMid + j] !== " " &&
                    y + i >= 0 && y + i < this.gameHeight && x + j >= 0 && x + j < this.gameWidth) {
                    this.gameScreen[y + i][x + j] = shape[heightMid + i][widthMid + j];
                }
            }
        }
    }

    drawTracks() {
        for (let i = 0; i < this.gameHeight; i++) {
            for (let j = 0; j < this.gameWidth; j++) {
                if (j % this.stepLength === 0 && (j > this.stepLength * this.removeSides && j < this.gameWidth - this.stepLength * this.removeSides)) {
                    this.gameScreen[i][j] = "|";
                }
            }
        }
    }

    drawEmptySpace() {
        for (let i = 0; i < this.gameHeight - 1; i++) {
            for (let j = 0; j < this.gameWidth; j++) {
                this.gameScreen[i][j] = " ";
            }
        }
    }

    drawShield() {
        for (let i = 0; i < Math.floor(this.shield / 2); i++) {
            this.gameScreen[this.gameHeight - 2][Math.floor(this.gameWidth / 2) + i] = "#";
            this.gameScreen[this.gameHeight - 2][Math.floor(this.gameWidth / 2) - i] = "#";
        }
        for (let i = 0; i < Math.floor(this.shield / 2); i++) {
            this.gameScreen[this.gameHeight - 3][Math.floor(this.gameWidth / 2) + i] = "#";
            this.gameScreen[this.gameHeight - 3][Math.floor(this.gameWidth / 2) - i] = "#";
        }
        for (let i = 0; i < Math.floor(this.shield / 2); i++) {
            this.gameScreen[this.gameHeight - 4][Math.floor(this.gameWidth / 2) + i] = "_";
            this.gameScreen[this.gameHeight - 4][Math.floor(this.gameWidth / 2) - i] = "_";
        }
    }

    checkCollisions() {
        //four obstacle types:
        //generic : moves straight down
        //trojan : moves straight down but looks non-malicious for most of the way
        //non-malicious : user packets (if blocked lose score because inconvenient)
        //spy-ware : follows player movement
        for (let i = 0; i < this.enemies.length; i++) {
            let scoreDelta = 1;
            let shieldDelta = 10;

            if ((Math.abs(this.enemies[i].x - this.playerLoc.xcor) < Math.floor((this.enemies[i].shape[0].length + this.playerShape[0].length) / 2)) && (Math.abs(this.enemies[i].y - this.playerLoc.ycor) < Math.floor((this.enemies[i].shape.length + this.playerShape.length) / 2))) {
                if (this.enemies[i].enemyType !== 2) {
                    this.score += scoreDelta;
                    console.log("Enemy type: "+this.enemies[i].enemyType);
                    console.log("SCORE UP");
                } else {
                    this.score -= scoreDelta;
                    console.log("Enemy type: "+this.enemies[i].enemyType);
                    console.log("SCORE DOWN");
                }
                this.enemies.splice(i, 1);

            } else
            if (this.enemies[i].y > this.gameHeight - 1) {
                this.enemies.splice(i, 1);
                //if enemy normal boost shield
                if (this.enemies[i].enemyType !== 2) {
                    this.shield -= shieldDelta;
                } else {
                    this.shield += Math.floor(shieldDelta / 2);
                }
                this.audioMan.playSound('shieldHit');
                this.enemies.splice(i, 1);
            }

        }
    }

    spawnEnemies() {
        let maxEnemyCount = 5;
        //four obstacle types:
        //generic : moves straight down
        //trojan : moves straight down but looks non-malicious for most of the way
        //non-malicious : user packets (if blocked lose score because inconvenient)
        //spy-ware : follows player movement
        if (this.enemies.length < maxEnemyCount) {
            this.enemies.push(new gameObsctacle(this.gameWidth, this.gameHeight, this.enemies));
            //another enemy shape: [[" ", "_", " "], ["/", " ", "\\"], ["\\", " ", "/"], [" ", "^", " "]]
        }
    }

    update(deltaTime) {
        this.updateEnemies(deltaTime);

        this.drawEmptySpace();
        this.drawTracks();
        this.spawnEnemies();
        this.drawEnemies();
        this.drawPlayer();
        this.drawShield();
        this.checkCollisions();

        if(this.shield <= 0){
            this.isGameOver = true;
        }
    }

    updateEnemies(deltaTime) {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(deltaTime, this.playerLoc.xcor);
        }
    }

    handleKeyPress(event) {
        event.preventDefault();
        if (event.keyCode === 37) {
            console.log('left arrow');
            let x = this.playerLoc['xcor'];
            let y = this.playerLoc['ycor'];
            this.changePlayerLoc(x - this.stepLength, y, this.playerShape);
            this.changePlayerLoc(x - this.stepLength, y, this.player);
            this.audioMan.playSound('playerMove');
        } else if (event.keyCode === 39) {
            console.log('right arrow');
            let x = this.playerLoc['xcor'];
            let y = this.playerLoc['ycor'];
            this.changePlayerLoc(x + this.stepLength, y, this.playerShape);
            this.changePlayerLoc(x + this.stepLength, y, this.player);
            this.audioMan.playSound('playerMove');
        }
    }

    changePlayerLoc(x, y) {
        if (x < this.stepLength * (this.removeSides + 1) || x > this.gameWidth - this.stepLength * this.removeSides) {
            return;
        }
        this.playerLoc = {xcor: x, ycor: y}
    }


    getText() {
        return this.gameScreen;
    }

}