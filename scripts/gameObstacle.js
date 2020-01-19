export class gameObsctacle {
    constructor(gameWidth, gameHeight, shape) {
        this.shape = shape;
        this.stepLength = 9;
        let temp = this.getRandomInt(1, this.stepLength - 1);
        this.x = temp * this.stepLength;
        this.y = this.getRandomInt(-20, 0);
        this.totalTime = 0;
        this.moveTime = 5000;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    start() {

    }

    update() {

    }

}