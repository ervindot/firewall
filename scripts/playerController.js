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
        this.playerLoc = {'xcor': this.stepLength * 4, 'ycor': this.gameHeight - 8};
        this.removeSides = 0;
        this.enemies = [];
        this.score = 0;
        this.shield = 3;


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
        for (let i = 0; i < this.gameWidth; i++) {
            this.gameScreen[this.gameHeight - 2][i] = "=";
        }
    }

    checkCollisions() {
        for (let i = 0; i < this.enemies.length; i++) {
            if ((Math.abs(this.enemies[i].x - this.playerLoc.xcor) < Math.floor((this.enemies[i].shape.length + this.playerShape.length) / 2)) && (Math.abs(this.enemies[i].y - this.playerLoc.ycor) < Math.floor((this.enemies[i].shape[0].length + this.playerShape[0].length) / 2))) {
                this.enemies.splice(i, 1);
                this.score++;
            }
            if (this.enemies[i].y > this.gameHeight - 3) {
                this.enemies.splice(i, 1);
                this.shield--;
                this.audioMan.playSound('shieldHit');
            }

        }
    }

    spawnEnemies() {
        if (this.enemies.length < 6) {
            this.enemies.push(new gameObsctacle(this.gameWidth, this.gameHeight, [["\\", "~", "/"], ["/", "Ö", "\\"], ["|", " ", "|"], ["_", "^", "_"]]));
            //another enemy shape: [[" ", "_", " "], ["/", " ", "\\"], ["\\", " ", "/"], [" ", "^", " "]]
        }
    }

    update(deltaTime) {
        this.drawEmptySpace();
        this.drawTracks();
        this.spawnEnemies();
        this.checkCollisions();
        this.drawEnemies();
        this.drawPlayer();
        this.drawShield();

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].y = Math.floor(this.enemies[i].totalTime * this.gameHeight / this.enemies[i].moveTime);
            this.enemies[i].totalTime += deltaTime;
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